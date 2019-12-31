import { IResolvers, ITypedef } from "graphql-tools";
import { User, UserService } from '../rpc/user';
import { isTwirpError, TwirpError } from 'ts-rpc-client';
import { ApolloError, UserInputError, AuthenticationError, ForbiddenError } from "apollo-server";
import { isNullOrUndefined } from "util";
import { Context } from "ts-rpc-client";
import { isJwtError } from "../error/authorization";
import { isUserError, isCryptoError, isTicketError } from "../error/user";

// https://blog.apollographql.com/modularizing-your-graphql-schema-code-d7f71d5ed5f2

export const typeDef: ITypedef = `
  extend type Query {
    # Get the user. requires sign-in (Authorization)
    user: User!
  }
  extend type Mutation {
    # create the new user
    createUser(username: String!, password: String!, email: String!): User!
    # update password. requires sing-in (Authorization)
    updatePassword(currentPassword: String!, newPassword: String!): Boolean!
    # create forgot password ticket for the user via username or email
    forgotPassword(username: String, email: String): Boolean!
    # verify the password reset token
    verifyPasswordReset(token: String!): Boolean!
  }
  type User {
    id: ID!
    username: String!
    email: String!
    roles: [String]!
  }
`;
export const resolvers: IResolvers = {
  Query: {
    user: async (_, { }, context): Promise<User> => {
      const ctx = context.ctx as Context;
      const token = ctx.token as String;
      const userService = context.models.user as UserService<Context>;
      if (isNullOrUndefined(token)) {
        throw new AuthenticationError("Authorizaton is required")
      }
      try {
        const user = await userService.GetUser(ctx, {});
        return user;
      } catch (error) {
        if (isTwirpError(error)) {
          isJwtError(error)
          isUserError(error)
          isCryptoError(error)
        }
        console.log(error) // unknown error
        throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR")
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
          throw new UserInputError(error.reason)
        }
        console.log(error) // unknown error
        throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR")
      }
    },
    updatePassword: async (_source, { currentPassword, newPassword }, context): Promise<Boolean> => {
      const ctx = context.ctx as Context;
      const userService = context.models.user as UserService<Context>;
      try {
        await userService.UpdatePassword(ctx, { currentPassword: currentPassword, newPassword: newPassword })
        return true
      } catch (error) {
        if (isTwirpError(error)) {
          isUserError(error)
          isJwtError(error)
          isCryptoError(error)
        }
        console.log(error) // unknown error
        throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR")
      }
    },
    forgotPassword: async (_source, { username, email }, context): Promise<Boolean> => {
      const ctx = context.ctx as Context;
      const userService = context.models.user as UserService<Context>;
      try {
        const language = "en" as string
        await userService.ForgotPassword(ctx, { username, email, language })
        return true
      } catch (error) {
        if (isTwirpError(error)) {
          isUserError(error)
          isJwtError(error)
          isCryptoError(error)
        }
        console.log(error) // unknown error
        throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR")
      }
    },
    verifyPasswordReset: async (_source, { token }, context): Promise<Boolean> => {
      const ctx = context.ctx as Context;
      const userService = context.models.user as UserService<Context>;
      try {
        await userService.VerifyResetPassword(ctx, { token });
        return true
      } catch (error) {
        if (isTwirpError(error)) {
          isUserError(error)
          isTicketError(error)
        }
        console.log(error) // unknown error
        throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR")
      }
    },
  },
  User: {}
};