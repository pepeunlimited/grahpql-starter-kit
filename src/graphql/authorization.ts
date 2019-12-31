import { ITypedef, IResolvers, UserInputError, ApolloError } from "apollo-server";
import { AuthPayload } from "../models/authorization";
import { isTwirpError, Context } from "ts-rpc-client";
import { isNullOrUndefined } from "util";
import { AuthorizationService } from "../rpc/authorization";
import { UserService, User } from "../rpc/user";
import { isCryptoError, isUserError } from "../error/user";
import { isJwtError } from "../error/authorization";

export const typeDef: ITypedef = `
  extend type Mutation {
    signIn(username: String!, password: String!): AuthPayload!
  }
  type AuthPayload {
    token: String!
    refershToken: String
    user: User
  }
`;

export const resolvers: IResolvers = {
  Query: {},
  Mutation: {
    signIn: async (_source, { username, password }, context): Promise<AuthPayload> => {
      if (isNullOrUndefined(username)) {
        throw new UserInputError("username is required", username as any)
      }
      if (isNullOrUndefined(password)) {
        throw new UserInputError("password is required", username as any)
      }
      const ctx = context.ctx as Context;
      const authorizationService = context.models.authorization as AuthorizationService<Context>
      try {
        const auth = await authorizationService.SignIn(ctx, { username: username, password: password })
        ctx.token = `Bearer ${auth.token}`
        return { refreshToken: auth.refreshToken, token: auth.token};
      } catch (error) {
        if (isTwirpError(error)) {
          isCryptoError(error)
        }
        console.log(error) // unknown error
        throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR")
      }
    }
  },
  AuthPayload: {
    user: async (_source, { username, password }, context): Promise<User> => {
      const ctx = context.ctx as Context;
      const userService = context.models.user as UserService<Context>
      try {
        const user = await userService.GetUser(ctx, {})
        return user
      } catch (error) {
        if (isTwirpError(error)) {
          isJwtError(error)
          isUserError(error)
        }
        console.log(error) // unknown error
        throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR")
      }
    }
  }
};