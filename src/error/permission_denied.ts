import { TwirpError } from "ts-rpc-client";

import {ApolloError, ForbiddenError, UserInputError} from "apollo-server";

export function throwsPermissionDenied(error: TwirpError) {
    if (error.code == 'permission_denied') {
        throw new ForbiddenError(error.msg)
    }
}