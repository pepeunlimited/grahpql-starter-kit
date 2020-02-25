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
import {throwsNotFound, isNotFound} from "../error/not_found";
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
    account: Account
    payments(first: Int = 20, offset: Int = 0): [Payment]
    orders(first: Int = 20, offset: Int = 0): [Order]
  }
`;

export const resolvers: IResolvers = {
  Query: {
    user: async (_, { id }, context: { ctx: Context, service: { user: UserService<Context> } }): Promise<User> => {
      if (id == null) {
        throw new UserInputError("user_id")
      }
      try {
        const user = await context.service.user.GetUser(context.ctx, { userId: id });
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
    me: async (_, { }, context: { ctx: Context, service: { user: UserService<Context> } }): Promise<User> => {
      const userId = context.ctx.userId;
      if (userId == null) {
        throw new AuthenticationError("authorization")
      }
      try {
        const user = await context.service.user.GetUser(context.ctx, {userId: userId });
        return user;
      } catch (error) {
        if (isTwirpError(error)) {
          throwsPermissionDenied(error);
          throwsNotFound(error);
          throwsValidationError(error);
        }
        console.log(error);
        throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
      }
    }
  },
  Mutation: {
    createUser: async (_source, { password, email, username }, context: { ctx: Context, service: { user: UserService<Context> } }): Promise<User> => {
      try {
        const user = await context.service.user.CreateUser(context.ctx, {
          username: username,
          password: password,
          email: email
        });
        context.ctx.userId = user.id; // DO NOT REMOVE
        return user;
      } catch (error) {
        if (isTwirpError(error)) {
          throwsAlreadyExist(error);
          throwsValidationError(error);
        }
        console.log(error);
        throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
      }
    },
    setProfilePicture: async (_source, { fileID }, context: { ctx: Context, service: { files: FilesService<Context>, user: UserService<Context> } }): Promise<Boolean> => {
      const userId = context.ctx.userId;
      if (userId == null) {
        throw new AuthenticationError("authorization")
      }
      try {
        const resp0 = await context.service.files.GetFile(context.ctx, { fileId: fileID, filename: undefined });
        // limit access to only own files..
        if (resp0.userId != userId) {
          throw new ForbiddenError("access_denied")
        }
        const resp1 = await context.service.user.SetProfilePicture(context.ctx, { profilePictureId: fileID, userId: userId });
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
    profilePicture: async (parent: User, _, context: { ctx: Context, service: { files: FilesService<Context> } }): Promise<File|null> => {
      try {
        const profilePictureId = parent.profilePictureId;
        if (profilePictureId == 0) {
          return null;
        }
        const file = await context.service.files.GetFile(context.ctx, { fileId:profilePictureId, filename: undefined});
        return file;
      } catch (error) {
        if (isTwirpError(error)) {
          throwsNotFound(error);
          throwsValidationError(error);
        }
        console.log(error);
        throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
      }
    },
    account: async (parent: User, { accountType }, context: { ctx: Context, service: { account: AccountService<Context> } }): Promise<Account|null> => {
      const userId          = context.ctx.userId;
      if (parent.id != userId) {
        throw new ForbiddenError("access_denied")
      }
      try {
        const account = await context.service.account.GetAccount(context.ctx, { userId });
        return account;
      } catch (error) {
        if (isNotFound(error)) {
          return null;
        }
        if (isTwirpError(error)) {
          throwsNotFound(error);
          throwsValidationError(error);
        }
        console.log(error);
        throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
      }
    },
    payments: async (parent: User, { first, offset }, context: { ctx: Context, service: { payment: PaymentService<Context> }}): Promise<Payment[]> => {
      const userId          = context.ctx.userId;
      if (parent.id != userId) {
        throw new ForbiddenError("access_denied")
      }
      try {
        const resp0 = await context.service.payment.GetPayments(context.ctx, { userId: userId, pageToken:offset, pageSize: first });
        return resp0.payments;
      } catch (error) {
        if (isTwirpError(error)) {
          throwsNotFound(error);
          throwsValidationError(error);
        }
        console.log(error);
        throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
      }
    },
    orders: async (parent: User, { first, offset }, context: { ctx: Context, service: { order: OrderService<Context> }}): Promise<Order[]> => {
      const userId          = context.ctx.userId;
      if (parent.id != userId) {
        throw new ForbiddenError("access_denied")
      }
      try {
        const resp0 = await context.service.order.GetOrders(context.ctx, { userId: userId, pageToken:offset, pageSize: first });
        return resp0.orders;
      } catch (error) {
        if (isTwirpError(error)) {
          throwsNotFound(error);
          throwsValidationError(error);
        }
        console.log(error);
        throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
      }
    },

  }
};