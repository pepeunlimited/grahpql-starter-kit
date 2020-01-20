import { IResolvers, ITypedef } from "graphql-tools";
import { isTwirpError } from 'ts-rpc-client';
import { ApolloError } from "apollo-server";
import { Context } from "ts-rpc-client";
import { isAccessRefreshError } from "../error/authorization";
import { isUserError } from "../error/user";
import { isValidationError } from "../error/validation";
import { isAccountError } from "../error/accounts";
import {Account, AccountService} from "../rpc/account";
import {isSpacesError} from "../error/spaces";
import {User, UserService} from "../rpc/user";

// https://blog.apollographql.com/modularizing-your-graphql-schema-code-d7f71d5ed5f2

export const typeDef: ITypedef = `
  extend type Mutation {
    # creates deposit to the account
    createWithdraw: Boolean!
  }
  type Account {
    id: ID!
    balance: Int!
    user: User!
    type: String!
  }
  enum AccountType {
    COIN
    CASH
  }
`;
export const resolvers: IResolvers = {
    Query: {},
    Mutation: {
        createWithdraw: async (_source, { }, context): Promise<Boolean> => {
            const ctx = context.ctx as Context;
            const accountService = context.models.accounts as AccountService<Context>;
            try {
                accountService.CreateWithdraw(ctx, {});
                return true
            } catch (error) {
                if (isTwirpError(error)) {
                    isAccountError(error);
                    isUserError(error);
                    isAccessRefreshError(error);
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
                    isAccountError(error);
                    isSpacesError(error);
                    isAccessRefreshError(error);
                    isUserError(error);
                    isValidationError(error);
                }
                console.log(error); // unknown error
                throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
            }
        }
    }
};