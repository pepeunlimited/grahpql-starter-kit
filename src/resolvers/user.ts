import {IResolvers, ITypedef} from "graphql-tools";
import {User, UserService} from '../rpc/user';
import {isTwirpError} from 'ts-rpc-client';
import {ApolloError, AuthenticationError, ForbiddenError, UserInputError} from "apollo-server";
import {Context} from "ts-rpc-client";
import {throwsValidationError} from "../error/validation";
import {Account, AccountService} from "../rpc/account";
import {isForbiddenError} from "../error/forbidden_error";
import {FilesService, File} from "../rpc/files";
import {throwsAlreadyExist} from "../error/already_exist";
import {throwsPermissionDenied} from "../error/permission_denied";
import {throwsNotFound} from "../error/not_found";
import {Payment, PaymentService} from "../rpc/payment";
import {Order, OrderService} from "../rpc/order";

// https://blog.apollographql.com/modularizing-your-graphql-schema-code-d7f71d5ed5f2

export const typeDef: ITypedef = `
  extend type Query {
    # user by id
    user(id: ID!): User!
    # signed-in user
    me: User!
  }
  extend type Mutation {
    # create the new user
    createUser(username: String!, password: String!, email: String!): User!
    # use to set and update the profile picture 
    setProfilePicture(fileID: ID!): Boolean!
  }
  type User {
    id: ID!
    username: String!
    email: String!
    roles: [String]!
    profilePicture: File
    account: Account!
    payments(first: Int = 20, offset: Int = 0): [Payment]
    orders(first: Int = 20, offset: Int = 0): [Order]
  }
`;

export const resolvers: IResolvers = {
  Query: {
    user: async (_, { id }, context): Promise<User> => {
      const ctx             = context.ctx as Context;
      const userService     = context.models.user as UserService<Context>;
      if (id == null) {
        throw new UserInputError("user_id")
      }
      try {
        const user = await userService.GetUser(ctx, { userId: id });
        return user;
      } catch (error) {
        if (isTwirpError(error)) {
          throwsPermissionDenied(error);
          throwsNotFound(error);
          throwsValidationError(error);
        }
        console.log(error); // unknown error
        throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
      }
    },
    me: async (_, { }, context): Promise<User> => {
      const ctx         = context.ctx as Context;
      const userService = context.models.user as UserService<Context>;
      const userId = ctx.userId;
      if (userId == null) {
        throw new AuthenticationError("authorization")
      }
      try {
        const user = await userService.GetUser(ctx, {userId: userId });
        return user;
      } catch (error) {
        if (isTwirpError(error)) {
          throwsPermissionDenied(error);
          throwsNotFound(error);
          throwsValidationError(error);
        }
        console.log(error); // unknown error
        throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
      }
    }
  },
  Mutation: {
    createUser: async (_source, { password, email, username }, context): Promise<User> => {
      const ctx              = context.ctx as Context;
      const userService      = context.models.user as UserService<Context>;
      try {
        const user = await userService.CreateUser(ctx, {
          username: username,
          password: password,
          email: email
        });
        ctx.userId = user.id; // do not remove
        return user;
      } catch (error) {
        if (isTwirpError(error)) {
          throwsAlreadyExist(error);
          throwsValidationError(error);
        }
        console.log(error); // unknown error
        throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
      }
    },
    setProfilePicture: async (_source, { fileID }, context): Promise<Boolean> => {
      const ctx           = context.ctx as Context;
      const userService   = context.models.user as UserService<Context>;
      const filesService  = context.models.files as FilesService<Context>;
      const userId = ctx.userId;
      if (userId == null) {
        throw new AuthenticationError("authorization")
      }
      try {
        const resp0 = await filesService.GetFile(ctx, { fileId: fileID, filename: undefined });
        // limit access to only own files..
        if (resp0.userId != userId) {
          throw new ForbiddenError("access_denied")
        }
        const resp1 = await userService.SetProfilePicture(ctx, { profilePictureId: fileID, userId: userId });
        return true
      } catch (error) {
        if (isTwirpError(error)) {
          throwsNotFound(error);
          throwsPermissionDenied(error);
          throwsValidationError(error);
        }
        if (isForbiddenError(error)) {
          throw new ForbiddenError("access_denied")
        }
        console.log(error); // unknown error
        throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
      }
    },
  },
  User: {
    profilePicture: async (parent, _, context): Promise<File|null> => {
      const ctx             = context.ctx as Context;
      const filesService    = context.models.files as FilesService<Context>;
      try {
        const user = parent as User;
        if (user.profilePictureId == 0) {
          return null;
        }
        const file = await filesService.GetFile(ctx, { fileId: user.profilePictureId, filename: undefined});
        return file;
      } catch (error) {
        if (isTwirpError(error)) {
          throwsNotFound(error);
          throwsValidationError(error);
        }
        console.log(error); // unknown error
        throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
      }
    },
    account: async (parent, { accountType }, context): Promise<Account> => {
      const ctx             = context.ctx as Context;
      const accountService  = context.models.accounts as AccountService<Context>;
      const user            = parent as User;
      const userId          = ctx.userId;
      if (user.id != userId) {
        throw new ForbiddenError("access_denied")
      }
      try {
        const account = await accountService.GetAccount(ctx, { userId });
        return account;
      } catch (error) {
        if (isTwirpError(error)) {
          throwsNotFound(error);
          throwsValidationError(error);
        }
        console.log(error); // unknown error
        throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
      }
    },
    payments: async (parent, { first, offset }, context): Promise<Payment[]> => {
      const ctx             = context.ctx as Context;
      const paymentService  = context.models.payment as PaymentService<Context>;
      const user            = parent as User;
      const userId          = ctx.userId;
      if (user.id != userId) {
        throw new ForbiddenError("access_denied")
      }
      try {
        const resp0 = await paymentService.GetPayments(ctx, { userId: userId, pageToken:offset, pageSize: first });
        return resp0.payments;
      } catch (error) {
        if (isTwirpError(error)) {
          throwsNotFound(error);
          throwsValidationError(error);
        }
        console.log(error); // unknown error
        throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
      }
    },
    orders: async (parent, { first, offset }, context): Promise<Order[]> => {
      const ctx             = context.ctx as Context;
      const orderService    = context.models.order as OrderService<Context>;
      const user            = parent as User;
      const userId          = ctx.userId;
      if (user.id != userId) {
        throw new ForbiddenError("access_denied")
      }
      try {
        const resp0 = await orderService.GetOrders(ctx, { userId: userId, pageToken:offset, pageSize: first });
        return resp0.orders;
      } catch (error) {
        if (isTwirpError(error)) {
          throwsNotFound(error);
          throwsValidationError(error);
        }
        console.log(error); // unknown error
        throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
      }
    },

  }
};