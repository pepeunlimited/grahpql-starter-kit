import { IResolvers, ITypedef } from "graphql-tools";
import { isTwirpError } from 'ts-rpc-client';
import { ApolloError, AuthenticationError } from "apollo-server";
import { Context } from "ts-rpc-client";
import { throwsValidationError } from "../error/validation";
import {Checkout, CheckoutService} from "../rpc/checkout";
import {throwsNotFound} from "../error/not_found";
import {throwsAborted} from "../error/aaborted";

// https://blog.apollographql.com/modularizing-your-graphql-schema-code-d7f71d5ed5f2

export const typeDef: ITypedef = `
  extend type Mutation {
    # create checkout based on payment instrument
    createCheckout(paymentInstrumentId: Int!, productId: Int!): Checkout!
  }
  type Checkout {
    id: ID
  }
`;
export const resolvers: IResolvers = {
    Query: {},
    Mutation: {
        createCheckout: async (_source, { paymentInstrumentId, productId }, context: { ctx: Context, service: { checkout: CheckoutService<Context> } }): Promise<Checkout> => {
            const userId = context.ctx.userId;
            if (userId == null) {
                throw new AuthenticationError("authorization");
            }
            try {
                const checkout = await context.service.checkout.CreateCheckout(context.ctx, { paymentInstrumentId: paymentInstrumentId, productId: productId, userId: userId });
                return checkout
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
    Checkout: {}
};