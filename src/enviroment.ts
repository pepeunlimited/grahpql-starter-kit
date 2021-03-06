import {Context, isTwirpError} from "ts-rpc-client";
import {throwsAccessRefreshError} from "./error/authorization";
import {throwsValidationError} from "./error/validation";
import {ApolloError} from "apollo-server";
import {AuthenticationServiceClientImpl} from "./rpc/authentication";
import {throwsNotFound} from "./error/not_found";
import {throwsPermissionDenied} from "./error/permission_denied";

const defaultPort = 4000;

interface Environment {
  apollo: {
    introspection: boolean,
    playground: boolean
  },
  port: number|string;
}

export const environment: Environment = {
  apollo: {
    introspection: process.env.APOLLO_INTROSPECTION === 'true',
    playground: process.env.APOLLO_PLAYGROUND === 'true'
  },
  port: process.env.PORT || defaultPort
};

export async function getUserID(authorization: string, authentication: AuthenticationServiceClientImpl<Context>, ctx: Context): Promise<number|undefined> {
  if (authorization == null) {
    return undefined
  }
  const accessToken = authorization.replace('Bearer ', '');
  try {
    const verified = await authentication.VerifyAccessToken(ctx, {accessToken: accessToken});
    return verified.userId;
  } catch (error) {
    if (isTwirpError(error)) {
      throwsAccessRefreshError(error);
      throwsNotFound(error);
      throwsPermissionDenied(error);
      throwsValidationError(error);
    }
    console.log(error); // unknown error
    throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
  }
}