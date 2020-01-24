import { IResolvers, ITypedef } from "graphql-tools";
import { isTwirpError } from 'ts-rpc-client';
import { ApolloError, AuthenticationError } from "apollo-server";
import { Context } from "ts-rpc-client";
import { isValidationError } from "../error/validation";
import {Checkout, CheckoutService} from "../rpc/checkout";
import {isAccountError} from "../error/accounts";

// https://blog.apollographql.com/modularizing-your-graphql-schema-code-d7f71d5ed5f2

export const typeDef: ITypedef = `
  extend type Mutation {
    # create Apple's IAP purchase flow
    createAppleIAP: Checkout!
    
    createGiftVoucherOrder: Checkout!
  }
  type Checkout {
    id: ID
  }
`;
export const resolvers: IResolvers = {
    Query: {},
    Mutation: {
        createAppleIAP: async (_source, {  }, context): Promise<Checkout> => {
            const ctx = context.ctx as Context;
            const checkoutService = context.models.checkout as CheckoutService<Context>;
            const userId = ctx.userId;
            if (userId == null) {
                throw new AuthenticationError("authorization");
            }
            try {
                const checkout = await checkoutService.CreateAppleIAP(ctx, { iapReceipt: "iap_receipt", productId: 1, userId: userId });
                return checkout
            } catch (error) {
                if (isTwirpError(error)) {
                    isAccountError(error);
                    isValidationError(error);
                }
                console.log(error); // unknown error
                throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
            }
        },
        createGiftVoucherOrder: async (_source, {  }, context): Promise<Checkout> => {
            const ctx = context.ctx as Context;
            const checkoutService = context.models.checkout as CheckoutService<Context>;
            const userId = ctx.userId;
            if (userId == null) {
                throw new AuthenticationError("authorization");
            }
            try {
                const checkout = await checkoutService.CreateGiftVoucherOrder(ctx, { productId: 1, userId: userId, giftVoucherId: "gift_voucher_id"});
                return checkout
            } catch (error) {
                if (isTwirpError(error)) {
                    isValidationError(error);
                }
                console.log(error); // unknown error
                throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
            }
        },
    },
    Checkout: {}
};