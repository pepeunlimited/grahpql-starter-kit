import { IResolvers, ITypedef } from "graphql-tools";
import { User, UserService } from '../rpc/user';
import { isTwirpError } from 'ts-rpc-client';
import { ApolloError, UserInputError, AuthenticationError, ForbiddenError } from "apollo-server";
import { isNullOrUndefined } from "util";
import { Context } from "ts-rpc-client";

// https://blog.apollographql.com/modularizing-your-graphql-schema-code-d7f71d5ed5f2

export const typeDef: ITypedef = `
  extend type Query {
    user: User!
  }
  extend type Mutation {
    createUser(username: String!, password: String!, email: String!): User!
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
          throw new ForbiddenError(error.reason)
        }
        console.log(error) // unknown error
        throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR")
      }
    }
  },
  Mutation: {
    createUser: async (_source, { password, email, username }, context): Promise<User> => {
      if (isNullOrUndefined(username)) {
        throw new UserInputError("username is required", username as any)
      }
      if (isNullOrUndefined(email)) {
        throw new UserInputError("email is required", username as any)
      }
      if (isNullOrUndefined(password)) {
        throw new UserInputError("password is required", username as any)
      }
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
          throw new UserInputError(error.msg, { "reason": error.reason, "code": error.code })
        }
        console.log(error) // unknown error
        throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR")
      }
    }
  },
  User: {}
};