import { IResolvers, ITypedef } from "graphql-tools";
import { isTwirpError } from 'ts-rpc-client';
import { ApolloError } from "apollo-server";
import { Context } from "ts-rpc-client";
import { throwsValidationError } from "../error/validation";
import {throwsNotFound, isFotFound} from "../error/not_found";
import {OrderItem, OrderService, OrderTx} from "../rpc/order";
import {User, UserService} from "../rpc/user";
import {throwsPermissionDenied} from "../error/permission_denied";
import {Price, PriceService} from "../rpc/price";

// https://blog.apollographql.com/modularizing-your-graphql-schema-code-d7f71d5ed5f2

export const typeDef: ITypedef = `
  union OrderItemPrice = Price | Plan
  
  type Order {
    id: ID
    createdAt: String!
    items: [OrderItem]!
    txs: [OrderTx]!
    user: User!
  }
  type OrderItem {
    id: ID
    quantity: Int!
    price: Price
  }
  type OrderTx {
    id: ID
    createdAt: String!
    status: String!
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
                    throwsNotFound(error);
                    throwsValidationError(error);
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
                    throwsNotFound(error);
                    throwsValidationError(error);
                }
                console.log(error); // unknown error
                throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
            }
        },
        user: async (parent, _, context): Promise<User> => {
            const ctx             = context.ctx as Context;
            const userService     = context.models.user as UserService<Context>;
            const userId          = ctx.userId as number;
            try {
                const user = await userService.GetUser(ctx, { userId:userId });
                return user;
            } catch (error) {
                if (isTwirpError(error)) {
                    throwsNotFound(error);
                    throwsPermissionDenied(error);
                    throwsValidationError(error);
                }
                console.log(error); // unknown error
                throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
            }
        },
    },
    OrderItem: {
        price: async (parent, _,context): Promise<Price|null> => {
            const ctx              = context.ctx as Context;
            const priceService     = context.models.price as PriceService<Context>;
            const priceId          = parent.priceId as number;
            try {
                const price = await priceService.GetPrice(ctx, {productSku: "", priceId: priceId, productId:0 });
                return price;
            } catch (error) {
                if (isFotFound(error)) {
                    return null;
                }
                if (isTwirpError(error)) {
                    throwsPermissionDenied(error);
                    throwsValidationError(error);
                }
                console.log(error); // unknown error
                throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
            }
        },
    }
};