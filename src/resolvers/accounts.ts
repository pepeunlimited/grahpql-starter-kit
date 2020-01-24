import { IResolvers, ITypedef } from "graphql-tools";
import { isTwirpError } from 'ts-rpc-client';
import { ApolloError, AuthenticationError } from "apollo-server";
import { Context } from "ts-rpc-client";
import { isUserError } from "../error/user";
import { isValidationError } from "../error/validation";
import { isAccountError } from "../error/accounts";
import {AccountService, Account} from "../rpc/account";
import {User, UserService} from "../rpc/user";

// https://blog.apollographql.com/modularizing-your-graphql-schema-code-d7f71d5ed5f2

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
        withdraw: async (_source, { amount }, context): Promise<Account> => {
            const ctx = context.ctx as Context;
            const accountService = context.models.accounts as AccountService<Context>;
            const userId = ctx.userId;
            if (userId == null) {
                throw new AuthenticationError("authorization");
            }
            try {
                const account = await accountService.CreateWithdraw(ctx, { amount: amount, userId: userId  });
                return account
            } catch (error) {
                if (isTwirpError(error)) {
                    isAccountError(error);
                    isValidationError(error);
                }
                console.log(error); // unknown error
                throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
            }
        },
    },
    Account: {
        user: async (parent, _, context): Promise<User> => {
            const ctx = context.ctx as Context;
            const userService = context.models.user as UserService<Context>;
            try {
                const user = await userService.GetUser(ctx, { userId:ctx.userId as number });
                return user;
            } catch (error) {
                if (isTwirpError(error)) {
                    isUserError(error);
                    isValidationError(error);
                }
                console.log(error); // unknown error
                throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
            }
        }
    }
};