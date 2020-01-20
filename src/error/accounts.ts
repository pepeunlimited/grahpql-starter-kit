import { TwirpError } from "ts-rpc-client";

import { ApolloError } from "apollo-server";

export function isAccountError(error: TwirpError) {
    if (error.reason == 'account_not_found') {
        throw new ApolloError(error.reason, "NOT_FOUND")
    }
}

