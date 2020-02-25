import {TwirpError} from "ts-rpc-client";
import {ApolloError} from "apollo-server";

export function throwsAborted(error: TwirpError) {
    if(error.code == 'aborted') {
        throw new ApolloError(error.msg, "ABORTED");
    }
}