import { TwirpError } from "ts-rpc-client";

import {ApolloError, UserInputError} from "apollo-server";

export function isAccountError(error: TwirpError) {
    if (error.reason == 'account_not_found') {
        throw new ApolloError(error.reason, "NOT_FOUND")
    } else if(error.code == 'already_exists') { // should not exist
        console.log("accounts: account exist => INTERNAL_SERVER_ERROR");
        throw new ApolloError(error.reason, "INTERNAL_SERVER_ERROR");
    } else if(error.code == 'aborted') {
        throw new ApolloError(error.reason, "ABORTED");
    }
}