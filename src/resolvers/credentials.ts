import { IResolvers, ITypedef } from "graphql-tools";
import { isTwirpError } from 'ts-rpc-client';
import { ApolloError } from "apollo-server";
import { Context } from "ts-rpc-client";
import { isAccessRefreshError } from "../error/authorization";
import { isUserError, isTicketError } from "../error/user";
import { isValidationError } from "../error/validation";
import { CredentialsService } from "../rpc/credentials";

// https://blog.apollographql.com/modularizing-your-graphql-schema-code-d7f71d5ed5f2

export const typeDef: ITypedef = `
  extend type Mutation {
    # update password. requires sing-in (Authorization)
    updatePassword(currentPassword: String!, newPassword: String!): Boolean!
    # create forgot password ticket for the user via username or email
    forgotPassword(username: String, email: String): Boolean!
    # verify the password reset token
    verifyPasswordReset(ticketToken: String!): Boolean!
    # reset password with the token
    resetPassword(ticketToken: String!, password: String!): Boolean!
  }
`;
export const resolvers: IResolvers = {
    Query: {},
    Mutation: {
        updatePassword: async (_source, { currentPassword, newPassword }, context): Promise<Boolean> => {
            const ctx = context.ctx as Context;
            const credentials = context.models.credentials as CredentialsService<Context>;
            try {
                await credentials.UpdatePassword(ctx, { currentPassword: currentPassword, newPassword: newPassword });
                return true
            } catch (error) {
                if (isTwirpError(error)) {
                    isUserError(error);
                    isAccessRefreshError(error);
                    isValidationError(error);
                }
                console.log(error); // unknown error
                throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
            }
        },
        forgotPassword: async (_source, { username, email }, context): Promise<Boolean> => {
            const ctx = context.ctx as Context;
            const credentials = context.models.credentials as CredentialsService<Context>;
            try {
                const language = "en" as string
                await credentials.ForgotPassword(ctx, { username, email, language });
                return true
            } catch (error) {
                if (isTwirpError(error)) {
                    isUserError(error);
                    isAccessRefreshError(error);
                    isValidationError(error);
                }
                console.log(error); // unknown error
                throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
            }
        },
        verifyPasswordReset: async (_source, { ticketToken }, context): Promise<Boolean> => {
            const ctx = context.ctx as Context;
            const credentials = context.models.credentials as CredentialsService<Context>;
            try {
                await credentials.VerifyResetPassword(ctx, { ticketToken });
                return true
            } catch (error) {
                if (isTwirpError(error)) {
                    isUserError(error);
                    isTicketError(error);
                    isValidationError(error);
                }
                console.log(error); // unknown error
                throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
            }
        },
        resetPassword: async (_source, { ticketToken, password }, context): Promise<Boolean> => {
            const ctx = context.ctx as Context;
            const credentials = context.models.credentials as CredentialsService<Context>;
            try {
                await credentials.ResetPassword(ctx, { ticketToken, password });
                return true
            } catch (error) {
                if (isTwirpError(error)) {
                    isUserError(error);
                    isTicketError(error);
                    isValidationError(error);
                }
                console.log(error); // unknown error
                throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
            }
        },
    }
};