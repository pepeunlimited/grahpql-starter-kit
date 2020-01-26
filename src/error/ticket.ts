import { TwirpError } from "ts-rpc-client";

import { AuthenticationError } from "apollo-server";

export function isTicketExpired(error: TwirpError) {
    if (error.msg == 'ticket_expired') {
        throw new AuthenticationError(error.msg)
    }
}
