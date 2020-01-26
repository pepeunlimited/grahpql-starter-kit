import { TwirpError } from "ts-rpc-client";

import {ApolloError, UserInputError} from "apollo-server";

export function isNotFound(error: TwirpError) {
    if (error.code == 'not_found') {
        throw new ApolloError(error.msg, "NOT_FOUND")
    }
}