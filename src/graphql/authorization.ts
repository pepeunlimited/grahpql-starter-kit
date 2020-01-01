import { ITypedef, IResolvers, UserInputError, ApolloError } from "apollo-server";
import { AuthPayload } from "../models/authorization";
import { isTwirpError, Context } from "ts-rpc-client";
import { isNullOrUndefined } from "util";
import { AuthorizationService } from "../rpc/authorization";
import { UserService, User } from "../rpc/user";
import { isUserError } from "../error/user";
import { isAccessRefreshError } from "../error/authorization";
import {isValidationError} from "../error/validation";

export const typeDef: ITypedef = `
  extend type Mutation {
    signIn(username: String!, password: String!): AuthPayload!
    refreshAccessToken(refreshToken: String!): AuthPayload!
  }
  type AuthPayload {
    refreshToken: String
    accessToken: String!
    user: User
  }
`;

export const resolvers: IResolvers = {
  Query: {},
  Mutation: {
    signIn: async (_source, { username, password }, context): Promise<AuthPayload> => {
      const ctx = context.ctx as Context;
      const authorizationService = context.models.authorization as AuthorizationService<Context>;
      try {
        const auth = await authorizationService.SignIn(ctx, { username: username, password: password });
        ctx.accessToken = `Bearer ${auth.accessToken}`;
        return { refreshToken: auth.refreshToken, accessToken: auth.accessToken};
      } catch (error) {
        if (isTwirpError(error)) {
          isValidationError(error);
          isUserError(error);
        }
        console.log(error); // unknown error
        throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
      }
    },
    refreshAccessToken: async (_source, { refreshToken }, context): Promise<AuthPayload> => {
      const ctx = context.ctx as Context;
      const authorizationService = context.models.authorization as AuthorizationService<Context>;
      try {
        const auth = await authorizationService.RefreshAccessToken(ctx, { refreshToken });
        ctx.accessToken = `Bearer ${auth.accessToken}`;
        return { refreshToken: auth.refreshToken, accessToken: auth.accessToken};
      } catch (error) {
        if (isTwirpError(error)) {
          isAccessRefreshError((error));
          isValidationError(error);
          isUserError(error);
        }
        console.log(error); // unknown error
        throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
      }
    },
  },
  AuthPayload: {
    user: async (_source, { username, password }, context): Promise<User> => {
      const ctx = context.ctx as Context;
      const userService = context.models.user as UserService<Context>;
      try {
        const user = await userService.GetUser(ctx, {});
        return user
      } catch (error) {
        if (isTwirpError(error)) {
          isAccessRefreshError(error);
          isUserError(error);
          isValidationError(error);
        }
        console.log(error); // unknown error
        throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
      }
    }
  }
};