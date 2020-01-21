import { IResolvers, ITypedef } from "graphql-tools";
import { User, UserService } from '../rpc/user';
import { isTwirpError } from 'ts-rpc-client';
import { ApolloError, AuthenticationError, ForbiddenError, UserInputError } from "apollo-server";
import { Context } from "ts-rpc-client";
import { isUserError } from "../error/user";
import { isValidationError } from "../error/validation";
import { File, SpacesService } from '../rpc/spaces';
import { isSpacesError } from "../error/spaces";
import { Account, AccountService } from "../rpc/account";
import { isAccountError } from "../error/accounts";
import { isForbiddenError } from "../error/forbidden_error";

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
    accounts(accountType: AccountType): [Account]!
  }  
`;

export const resolvers: IResolvers = {
  Query: {
    user: async (_, { id }, context): Promise<User> => {
      const ctx = context.ctx as Context;
      const userService = context.models.user as UserService<Context>;
      if (id == null) {
        throw new UserInputError("user_id")
      }
      try {
        const user = await userService.GetUser(ctx, { userId: id });
        return user;
      } catch (error) {
        if (isTwirpError(error)) {
          isUserError(error);
          isValidationError(error);
        }
        console.log(error); // unknown error
        throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
      }
    },
    me: async (_, { }, context): Promise<User> => {
      const ctx = context.ctx as Context;
      const userService = context.models.user as UserService<Context>;
      if (ctx.userId == null) {
        throw new AuthenticationError("authorization")
      }
      try {
        const user = await userService.GetUser(ctx, {userId: ctx.userId as number});
        return user;
      } catch (error) {
        if (isTwirpError(error)) {
          isUserError(error);
          isValidationError(error);
        }
        console.log(error); // unknown error
        throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
      }
    }
  },
  Mutation: {
    createUser: async (_source, { password, email, username }, context): Promise<User> => {
      const ctx = context.ctx as Context;
      const userService = context.models.user as UserService<Context>;
      try {
        const user = await userService.CreateUser(ctx, {
          username: username,
          password: password,
          email: email
        });
        return user;
      } catch (error) {
        if (isTwirpError(error)) {
          isValidationError(error);
        }
        console.log(error); // unknown error
        throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
      }
    },
    setProfilePicture: async (_source, { fileID }, context): Promise<Boolean> => {
      const ctx = context.ctx as Context;
      const userService = context.models.user as UserService<Context>;
      const spacesService = context.models.spaces as SpacesService<Context>;
      const userId = ctx.userId;
      if (userId == null) {
        throw new AuthenticationError("authorization")
      }
      try {
        const resp0 = await spacesService.GetFile(ctx, { fileId: fileID, filename: undefined });
        // limit access to only own files..
        if (resp0.userId != userId) {
          throw new ForbiddenError("access_denied")
        }
        const resp1 = await userService.SetProfilePicture(ctx, { profilePictureId: fileID, userId: userId });
        return true
      } catch (error) {
        if (isTwirpError(error)) {
          isSpacesError(error);
          isUserError(error);
          isValidationError(error);
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
      const ctx = context.ctx as Context;
      const spacesService = context.models.spaces as SpacesService<Context>;
      try {
        const user = parent as User;
        if (user.profilePictureId == 0) {
          return null;
        }
        const file = await spacesService.GetFile(ctx, { fileId: user.profilePictureId, filename: undefined});
        return file;
      } catch (error) {
        if (isTwirpError(error)) {
          isSpacesError(error);
          isValidationError(error);
        }
        console.log(error); // unknown error
        throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
      }
    },
    accounts: async (parent, { accountType }, context): Promise<Account[]|null> => {
      const ctx = context.ctx as Context;
      const accountService = context.models.accounts as AccountService<Context>;
      const user = parent as User;
      const userId = ctx.userId;
      if (user.id != userId) {
        throw new ForbiddenError("access_denied")
      }
      try {
        const resp0 = await accountService.GetAccounts(ctx, { accountType: accountType, userId });
        return resp0.accounts;
      } catch (error) {
        if (isTwirpError(error)) {
          isAccountError(error);
          isValidationError(error);
        }
        console.log(error); // unknown error
        throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
      }
    }
  }
};