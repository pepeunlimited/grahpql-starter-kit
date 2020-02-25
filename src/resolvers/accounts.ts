import { IResolvers, ITypedef } from "graphql-tools";
import { isTwirpError } from 'ts-rpc-client';
import { ApolloError, AuthenticationError } from "apollo-server";
import { Context } from "ts-rpc-client";
import { throwsValidationError } from "../error/validation";
import {AccountService, Account} from "../rpc/account";
import {User, UserService} from "../rpc/user";
import {throwsNotFound} from "../error/not_found";
import {throwsPermissionDenied} from "../error/permission_denied";
import {throwsAborted} from "../error/aaborted";

export const typeDef: ITypedef = `
  extend type Mutation {
    # creates deposit to the account
    withdraw(amount: Int!): Account!
  }
  type Account {
    id: ID!
    balance: Int!
    user: User!
  }
`;
export const resolvers: IResolvers = {
    Query: {},
    Mutation: {
        withdraw: async (_source, { amount }, context: { ctx: Context, service: { account: AccountService<Context> } }): Promise<Account> => {
            const userId = context.ctx.userId;
            if (userId == null) {
                throw new AuthenticationError("authorization");
            }
            try {
                const account = await context.service.account.CreateWithdraw(context.ctx, { amount: amount, userId: userId  });
                return account
            } catch (error) {
                if (isTwirpError(error)) {
                    throwsAborted(error);
                    throwsNotFound(error);
                    throwsValidationError(error);
                }
                console.log(error);
                throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
            }
        },
    },
    Account: {
        user: async (parent: Account, _, context: { ctx: Context, service: { user: UserService<Context> } }): Promise<User> => {
            const userId = context.ctx.userId as number;
            try {
                const user = await context.service.user.GetUser(context.ctx, { userId:userId });
                return user;
            } catch (error) {
                if (isTwirpError(error)) {
                    throwsNotFound(error);
                    throwsPermissionDenied(error);
                    throwsValidationError(error);
                }
                console.log(error);
                throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
            }
        }
    }
};