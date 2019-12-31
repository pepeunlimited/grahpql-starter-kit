import { TwirpError } from "ts-rpc-client";

import { UserInputError, ForbiddenError, ApolloError, AuthenticationError } from "apollo-server";

export function isCryptoError(error: TwirpError) {
  if (error.reason == 'invalid_credentials') {
    throw new UserInputError(error.reason)
  }
}

export function isUserError(error: TwirpError) {
  if (error.reason == 'user_is_banned' || error.reason == 'user_is_locked') {
    throw new ForbiddenError(error.reason)
  } else if (error.reason == 'user_not_found') {
    throw new ApolloError(error.reason, "NOT_FOUND")
  }
}

export function isTicketError(error: TwirpError) {
  if (error.reason == 'ticket_expired') {
    throw new AuthenticationError(error.reason)
  } else if (error.reason == 'ticket_not_found') {
    throw new ApolloError(error.reason, "NOT_FOUND")
  } else if (error.reason == 'ticket_exist') {
    throw new UserInputError(error.reason) // retry
  }
}