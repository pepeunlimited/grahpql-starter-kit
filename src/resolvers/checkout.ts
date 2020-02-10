import { IResolvers, ITypedef } from "graphql-tools";
import { isTwirpError } from 'ts-rpc-client';
import { ApolloError, AuthenticationError } from "apollo-server";
import { Context } from "ts-rpc-client";
import { isValidationError } from "../error/validation";
import {Checkout, CheckoutService} from "../rpc/checkout";
import {isNotFound} from "../error/not_found";
import {isAborted} from "../error/aaborted";

// https://blog.apollographql.com/modularizing-your-graphql-schema-code-d7f71d5ed5f2

export const typeDef: ITypedef = `
  extend type Mutation {
    # create checkout based on payment instrument
    createCheckout(paymentInstrumentId: Int!): Checkout!
  }
  type Checkout {
    id: ID
  }
`;
export const resolvers: IResolvers = {
    Query: {},
    Mutation: {
        createCheckout: async (_source, { paymentInstrumentId }, context): Promise<Checkout> => {
            const ctx = context.ctx as Context;
            const checkoutService = context.models.checkout as CheckoutService<Context>;
            const userId = ctx.userId;
            if (userId == null) {
                throw new AuthenticationError("authorization");
            }
            try {
                const checkout = await checkoutService.CreateCheckout(ctx, { paymentInstrumentId: paymentInstrumentId, productId: 1, userId: userId });
                return checkout
            } catch (error) {
                if (isTwirpError(error)) {
                    isAborted(error);
                    isNotFound(error);
                    isValidationError(error);
                }
                console.log(error); // unknown error
                throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
            }
        },
    },
    Checkout: {}
};