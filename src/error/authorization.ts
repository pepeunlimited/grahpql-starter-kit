import { TwirpError } from "ts-rpc-client";

import { AuthenticationError } from "apollo-server";

export function isAccessRefreshError(error: TwirpError) {
  if (error.reason == 'access_token_malformed'  ||
      error.reason == 'refresh_token_malformed' ||
      error.reason == 'refresh_token_expired'   ||
      error.reason == 'access_token_expired') {
    throw new AuthenticationError(error.reason)
  }
}
