import { TwirpError } from "ts-rpc-client";

import { AuthenticationError } from "apollo-server";

export function throwsAccessRefreshError(error: TwirpError) {
  if (error.msg == 'access_token_malformed'  ||
      error.msg == 'refresh_token_malformed' ||
      error.msg == 'refresh_token_expired'   ||
      error.msg == 'access_token_expired') {
    throw new AuthenticationError(error.msg)
  }
}
