import { IResolvers, ITypedef } from "graphql-tools";
import { isTwirpError } from 'ts-rpc-client';
import { ApolloError } from "apollo-server";
import { Context } from "ts-rpc-client";
import { throwsValidationError } from "../error/validation";
import {throwsNotFound} from "../error/not_found";
import {Order, OrderItem, OrderService, OrderTx} from "../rpc/order";
import {User, UserService} from "../rpc/user";
import {throwsPermissionDenied} from "../error/permission_denied";
import {Price, PriceService} from "../rpc/price";
import {GraphQLResolveInfo} from "graphql";
import {Plan, PlanService} from "../rpc/plan";

// https://blog.apollographql.com/modularizing-your-graphql-schema-code-d7f71d5ed5f2

export const typeDef: ITypedef = `
  interface OrderItem {
    id: ID
    quantity: Int!
  }
  type PriceOrderItem implements OrderItem {
    id: ID
    quantity: Int!
    price: Price!
  }
  type PlanOrderItem implements OrderItem {
    id: ID
    quantity: Int!
    plan: Plan!
  }
  type Order {
    id: ID
    createdAt: String!
    items: [OrderItem]
    txs: [OrderTx]!
    user: User!
  }
  type OrderTx {
    id: ID
    createdAt: String!
    status: String!
  }
`;
export const resolvers: IResolvers = {
    OrderItem: {
        __resolveType(obj: OrderItem, _: any, info: GraphQLResolveInfo ){
            if (obj.priceId != 0) {
                return "PriceOrderItem";
            }
            if (obj.planId != 0) {
                return "PlanOrderItem";
            }
            return null;
        },
    },
    Query: {},
    Mutation: {},
    Order: {
        items: async (parent: Order, { }, context): Promise<OrderItem[]> => {
            const ctx             = context.ctx as Context;
            const orderService    = context.models.order as OrderService<Context>;
            const userId          = ctx.userId as number;
            const orderId         = parent.id;
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
        txs: async (parent: Order, { }, context): Promise<OrderTx[]> => {
            const ctx             = context.ctx as Context;
            const orderService    = context.models.order as OrderService<Context>;
            const userId          = ctx.userId as number;
            const orderId         = parent.id;
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
        user: async (parent: User, _, context): Promise<User> => {
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
    PriceOrderItem: {
        price: async (parent: OrderItem, _, context): Promise<Price> => {
            const ctx           = context.ctx as Context;
            const priceService  = context.models.price as PriceService<Context>;
            const priceId       = parent.priceId;
            try {
                const price = await priceService.GetPrice(ctx, { productId: 0, priceId: priceId, productSku: "" });
                return price;
            } catch (error) {
                if (isTwirpError(error)) {
                    throwsPermissionDenied(error);
                    throwsNotFound(error);
                    throwsValidationError(error);
                }
                console.log(error); // unknown error
                throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
            }
        },
    },
    PlanOrderItem: {
        plan: async (parent: OrderItem, _, context: { ctx: Context, models: { plan: PlanService<Context> } }): Promise<Plan> => {
            const ctx           = context.ctx;
            const planService  = context.models.plan;
            const planId       = parent.planId;
            try {
                const plan = await planService.GetPlan(ctx, { planId: planId });
                return plan;
            } catch (error) {
                if (isTwirpError(error)) {
                    throwsPermissionDenied(error);
                    throwsNotFound(error);
                    throwsValidationError(error);
                }
                console.log(error); // unknown error
                throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
            }
        },
    }
};