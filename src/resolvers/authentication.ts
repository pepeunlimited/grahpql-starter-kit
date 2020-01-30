import { ITypedef, IResolvers, ApolloError } from "apollo-server";
import { AuthPayload } from "../models/authorization";
import { isTwirpError, Context } from "ts-rpc-client";
import { UserService, User } from "../rpc/user";
import { isAccessRefreshError } from "../error/authorization";
import { isValidationError } from "../error/validation";
import { AuthenticationService } from "../rpc/authentication";
import {isPermissionDenied} from "../error/permission_denied";
import {isNotFound} from "../error/not_found";

export const typeDef: ITypedef = `
  extend type Mutation {
    signIn(username: String!, password: String!): AuthPayload!
    refreshAccessToken(refreshToken: String!): AuthPayload!
  }
  type AuthPayload {
    refreshToken: String
    accessToken: String!
    me: User!
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
        return { refreshToken: auth.refreshToken, accessToken: auth.accessToken};
      } catch (error) {
        if (isTwirpError(error)) {
          isPermissionDenied(error);
          isNotFound(error);
          isValidationError(error);
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
        return { refreshToken: auth.refreshToken, accessToken: auth.accessToken};
      } catch (error) {
        if (isTwirpError(error)) {
          isAccessRefreshError((error));
          isPermissionDenied(error);
          isNotFound(error);
          isValidationError(error);
        }
        console.log(error); // unknown error
        throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
      }
    },
  },
  AuthPayload: {
    me: async (parent, _, context): Promise<User> => {
      const ctx = context.ctx as Context;
      const userService = context.models.user as UserService<Context>;
      const authenticationService = context.models.authentication as AuthenticationService<Context>;
      try {
        const authPayload = parent as AuthPayload;
        const verify = await authenticationService.VerifyAccessToken(ctx, { accessToken: authPayload.accessToken});
        const user = await userService.GetUser(ctx, { userId: verify.userId });
        ctx.userId = user.id; // do not remove
        return user
      } catch (error) {
        if (isTwirpError(error)) {
          isAccessRefreshError(error);
          isPermissionDenied(error);
          isNotFound(error);
          isValidationError(error);
        }
        console.log(error); // unknown error
        throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
      }
    }
  }
};