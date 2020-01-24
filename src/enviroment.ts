import {isNullOrUndefined} from "util";
import {Context, isTwirpError} from "ts-rpc-client";
import {isAccessRefreshError} from "./error/authorization";
import {isUserError} from "./error/user";
import {isValidationError} from "./error/validation";
import {ApolloError} from "apollo-server";
import {AuthenticationServiceClientImpl, VerifyAccessTokenResponse} from "./rpc/authentication";

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
      isAccessRefreshError(error);
      isUserError(error);
      isValidationError(error);
    }
    console.log(error); // unknown error
    throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
  }
}