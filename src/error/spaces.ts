import { TwirpError } from "ts-rpc-client";
import {ApolloError, AuthenticationError, UserInputError} from "apollo-server";

export function isSpacesError(error: TwirpError) {
    if (error.reason == 'file_not_found') {
        throw new ApolloError(error.reason, "NOT_FOUND")
    }
}