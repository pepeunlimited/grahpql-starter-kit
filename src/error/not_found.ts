import {isTwirpError, TwirpError} from "ts-rpc-client";

import {ApolloError, UserInputError} from "apollo-server";

export function throwsNotFound(error: TwirpError) {
    if (error.code == 'not_found') {
        throw new ApolloError(error.msg, "NOT_FOUND")
    }
}

export function isFotFound(error: any): boolean {
    if (!isTwirpError(error)) {
         return false
    }
    const err = error as TwirpError;
    return err.code == 'not_found';
}