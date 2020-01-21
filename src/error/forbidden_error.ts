import {ForbiddenError} from "apollo-server";

export function isForbiddenError(err: Error):Boolean {
    return err instanceof ForbiddenError
}