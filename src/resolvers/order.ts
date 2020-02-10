import { IResolvers, ITypedef } from "graphql-tools";
import { isTwirpError } from 'ts-rpc-client';
import { ApolloError, AuthenticationError } from "apollo-server";
import { Context } from "ts-rpc-client";
import { isValidationError } from "../error/validation";
import {Checkout, CheckoutService} from "../rpc/checkout";
import {isNotFound} from "../error/not_found";
import {isAborted} from "../error/aaborted";
import {Order, OrderItem, OrderService, OrderTx} from "../rpc/order";

// https://blog.apollographql.com/modularizing-your-graphql-schema-code-d7f71d5ed5f2

export const typeDef: ITypedef = `
  type Order {
    id: ID
    items: [OrderItem]!
    txs: [OrderTx]!
  }
  type OrderItem {
    id: ID
  }
  type OrderTx {
    id: ID
  }
`;
export const resolvers: IResolvers = {
    Query: {},
    Mutation: {},
    Order: {
        items: async (parent, { }, context): Promise<OrderItem[]> => {
            const ctx             = context.ctx as Context;
            const orderService    = context.models.order as OrderService<Context>;
            const userId          = ctx.userId as number;
            const orderId         = parent.id as number;
            try {
                const items = await orderService.GetOrderItems(ctx, { userId: userId, orderId: orderId });
                return items.orderItems;
            } catch (error) {
                if (isTwirpError(error)) {
                    isNotFound(error);
                    isValidationError(error);
                }
                console.log(error); // unknown error
                throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
            }
        },
        txs: async (parent, { }, context): Promise<OrderTx[]> => {
            const ctx             = context.ctx as Context;
            const orderService    = context.models.order as OrderService<Context>;
            const userId          = ctx.userId as number;
            const orderId         = parent.id as number;
            try {
                const txs = await orderService.GetOrderTxs(ctx, { userId: userId, orderId: orderId });
                return txs.orderTxs;
            } catch (error) {
                if (isTwirpError(error)) {
                    isNotFound(error);
                    isValidationError(error);
                }
                console.log(error); // unknown error
                throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
            }
        },
    }
};