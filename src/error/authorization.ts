import { TwirpError } from "ts-rpc-client";

import { AuthenticationError } from "apollo-server";

export function isJwtError(error: TwirpError) {
  if (error.reason == 'jwt_malformed' || error.reason == 'jwt_expired') {
    throw new AuthenticationError(error.reason)
  }
}
