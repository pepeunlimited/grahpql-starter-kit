import { ITypedef, IResolvers, ApolloError } from "apollo-server";
import { AuthPayload } from "../models/authorization";
import { isTwirpError, Context } from "ts-rpc-client";
import { UserService, User } from "../rpc/user";
import { isUserError } from "../error/user";
import { isAccessRefreshError } from "../error/authorization";
import { isValidationError } from "../error/validation";
import { AuthenticationService } from "../rpc/authentication";

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
      const authenticationService = context.models.authentication as AuthenticationService<Context>;
      try {
        const auth = await authenticationService.SignIn(ctx, { username: username, password: password });
        const verify = await authenticationService.VerifyAccessToken(ctx, { accessToken: auth.accessToken});
        ctx.userId = verify.userId;
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
      const authenticationService = context.models.authentication as AuthenticationService<Context>;
      try {
        const auth = await authenticationService.RefreshAccessToken(ctx, { refreshToken });
        const verify = await authenticationService.VerifyAccessToken(ctx, { accessToken: auth.accessToken});
        ctx.userId = verify.userId;
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
    user: async (_source, {}, context): Promise<User> => {
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