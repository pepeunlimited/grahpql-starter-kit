import { ITypedef, IResolvers, ApolloError } from "apollo-server";
import { AuthPayload } from "../authentication/authpayload";
import { isTwirpError, Context } from "ts-rpc-client";
import { UserService, User } from "../rpc/user";
import { throwsAccessRefreshError } from "../error/authorization";
import { throwsValidationError } from "../error/validation";
import { AuthenticationService } from "../rpc/authentication";
import {throwsPermissionDenied} from "../error/permission_denied";
import {throwsNotFound} from "../error/not_found";

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
    signIn: async (_source, { username, password }, context: { ctx: Context, service: { authentication: AuthenticationService<Context> } }): Promise<AuthPayload> => {
      try {
        const auth = await context.service.authentication.SignIn(context.ctx, { username: username, password: password });
        return { refreshToken: auth.refreshToken, accessToken: auth.accessToken};
      } catch (error) {
        if (isTwirpError(error)) {
          throwsPermissionDenied(error);
          throwsNotFound(error);
          throwsValidationError(error);
        }
        console.log(error);
        throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
      }
    },
    refreshAccessToken: async (_source, { refreshToken }, context: { ctx: Context, service: { authentication: AuthenticationService<Context> } }): Promise<AuthPayload> => {
      try {
        const auth = await context.service.authentication.RefreshAccessToken(context.ctx, { refreshToken });
        return { refreshToken: auth.refreshToken, accessToken: auth.accessToken};
      } catch (error) {
        if (isTwirpError(error)) {
          throwsAccessRefreshError((error));
          throwsPermissionDenied(error);
          throwsNotFound(error);
          throwsValidationError(error);
        }
        console.log(error);
        throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
      }
    },
  },
  AuthPayload: {
    me: async (parent, _, context: { ctx: Context, service: { user: UserService<Context>, authentication: AuthenticationService<Context> }}): Promise<User> => {
      try {
        const authPayload = parent as AuthPayload;
        const verify = await context.service.authentication.VerifyAccessToken(context.ctx, { accessToken: authPayload.accessToken});
        const user = await context.service.user.GetUser(context.ctx, { userId: verify.userId });
        context.ctx.userId = user.id; // DO NOT REMOVE
        return user
      } catch (error) {
        if (isTwirpError(error)) {
          throwsAccessRefreshError(error);
          throwsPermissionDenied(error);
          throwsNotFound(error);
          throwsValidationError(error);
        }
        console.log(error);
        throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
      }
    }
  }
};