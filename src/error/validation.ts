import { TwirpError } from "ts-rpc-client";
import { UserInputError } from "apollo-server";

export function isValidationError(error: TwirpError) {
    if (error.code == 'invalid_argument') {
        let message = error.argument;
        if (message === undefined) {
            message = error.reason;
        }
        throw new UserInputError(message);
    } else if(error.code == 'already_exists') {
        throw new UserInputError(error.reason);
    }
}