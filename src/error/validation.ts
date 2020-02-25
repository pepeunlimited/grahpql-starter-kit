import { TwirpError } from "ts-rpc-client";
import { UserInputError } from "apollo-server";

export function throwsValidationError(error: TwirpError) {
    if (error.code == 'invalid_argument') {
        let message = error.argument;
        if (message === undefined) {
            message = error.msg;
        }
        throw new UserInputError(message);
    }
}