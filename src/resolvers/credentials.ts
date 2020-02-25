import {IResolvers, ITypedef} from "graphql-tools";
import {isTwirpError} from 'ts-rpc-client';
import {ApolloError, AuthenticationError} from "apollo-server";
import {Context} from "ts-rpc-client";
import {throwsValidationError} from "../error/validation";
import {CredentialsService} from "../rpc/credentials";
import {throwsNotFound} from "../error/not_found";
import {throwsPermissionDenied} from "../error/permission_denied";
import {AuthenticationService} from "../rpc/authentication";
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
        updatePassword: async (_source, { currentPassword, newPassword }, context: { ctx: Context, service: { credentials: CredentialsService<Context> } }): Promise<Boolean> => {
            const userId = context.ctx.userId;
            if (userId == null) {
                throw new AuthenticationError("authorization");
            }
            try {
                await context.service.credentials.UpdatePassword(context.ctx, { currentPassword: currentPassword, newPassword: newPassword, userId: userId as number });
                return true
            } catch (error) {
                if (isTwirpError(error)) {
                    throwsPermissionDenied(error);
                    throwsNotFound(error);
                    throwsValidationError(error);
                }
                console.log(error);
                throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
            }
        },
        forgotPassword: async (_source, { username, email }, context: { ctx: Context, service: { credentials: CredentialsService<Context> } }): Promise<Boolean> => {
            try {
                const language = "en" as string;
                await context.service.credentials.ForgotPassword(context.ctx, { username, email, language });
                return true
            } catch (error) {
                if (isTwirpError(error)) {
                    throwsPermissionDenied(error);
                    throwsNotFound(error);
                    throwsValidationError(error);
                }
                console.log(error);
                throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
            }
        },
        verifyPasswordReset: async (_source, { ticketToken }, context: { ctx: Context, service: { credentials: CredentialsService<Context> } }): Promise<Boolean> => {
            try {
                await context.service.credentials.VerifyResetPassword(context.ctx, { ticketToken });
                return true
            } catch (error) {
                if (isTwirpError(error)) {
                    throwsPermissionDenied(error);
                    throwsNotFound(error);
                    throwsValidationError(error);
                }
                console.log(error);
                throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
            }
        },
        resetPassword: async (_source, { ticketToken, password }, context: { ctx: Context, service: { credentials: CredentialsService<Context> } }): Promise<Boolean> => {
            try {
                await context.service.credentials.ResetPassword(context.ctx, { ticketToken, password });
                return true
            } catch (error) {
                if (isTwirpError(error)) {
                    throwsPermissionDenied(error);
                    throwsNotFound(error);
                    throwsValidationError(error);
                }
                console.log(error);
                throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
            }
        },
    }
};