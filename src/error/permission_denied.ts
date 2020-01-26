import { TwirpError } from "ts-rpc-client";

import {ApolloError, ForbiddenError, UserInputError} from "apollo-server";

export function isPermissionDenied(error: TwirpError) {
    if (error.code == 'permission_denied') {
        throw new ForbiddenError(error.msg)
    }
}