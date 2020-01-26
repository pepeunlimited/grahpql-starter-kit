import {TwirpError} from "ts-rpc-client";
import {ApolloError} from "apollo-server";

export function isAlreadyExist(error: TwirpError) {
    if(error.code == 'already_exists') {
        throw new ApolloError(error.msg, "ALREADY_EXIST");
    }
}