import { IResolvers, ITypedef } from "graphql-tools";
import { isTwirpError } from 'ts-rpc-client';
import {ApolloError, AuthenticationError, UserInputError} from "apollo-server";
import { Context } from "ts-rpc-client";
import { isValidationError } from "../error/validation";
import {isNotFound} from "../error/not_found";
import {PaymentInstrument, PaymentService} from "../rpc/payment";
import {User, UserService} from "../rpc/user";
import {Order, OrderService} from "../rpc/order";
import {isPermissionDenied} from "../error/permission_denied";

// https://blog.apollographql.com/modularizing-your-graphql-schema-code-d7f71d5ed5f2

export const typeDef: ITypedef = `
  extend type Query {
    # payment instrument by id or the type
    paymentInstrument(id: Int, type: Type): PaymentInstrument!
  }
  type Payment {
    id: ID
    order: Order!
    instrument: PaymentInstrument!
    user: User!
  }
  type PaymentInstrument {
    id: ID
    type: Type!
  }
  enum Type {
    APPLE
    GOOGLE
    GIFT_VOUCHER
  }
`;
export const resolvers: IResolvers = {
    Query: {
        paymentInstrument: async (_, { id, type }, context): Promise<PaymentInstrument> => {
            const ctx             = context.ctx as Context;
            const paymentService     = context.models.payment as PaymentService<Context>;
            const userId = ctx.userId;
            if (userId == null) {
                throw new AuthenticationError("authorization")
            }
            try {
                const pi = await paymentService.GetPaymentInstrument(ctx, { id: id, type: type });
                return pi;
            } catch (error) {
                if (isTwirpError(error)) {
                    isPermissionDenied(error);
                    isNotFound(error);
                    isValidationError(error);
                }
                console.log(error); // unknown error
                throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
            }
        },
    },
    Mutation: {},
    Payment: {
        order: async (parent, { }, context): Promise<Order> => {
            const ctx             = context.ctx as Context;
            const orderService    = context.models.order as OrderService<Context>;
            const userId          = ctx.userId as number;
            const orderId         = parent.orderId as number;
            try {
                const order = await orderService.GetOrder(ctx, { userId: userId, orderId: orderId });
                return order;
            } catch (error) {
                if (isTwirpError(error)) {
                    isNotFound(error);
                    isValidationError(error);
                }
                console.log(error); // unknown error
                throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
            }
        },
        instrument: async (parent, { }, context): Promise<PaymentInstrument> => {
            const ctx                   = context.ctx as Context;
            const paymentService        = context.models.payment as PaymentService<Context>;
            const paymentInstrumentId   = parent.paymentInstrumentId as number;
            try {
                const instrument = await paymentService.GetPaymentInstrument(ctx, { id: paymentInstrumentId, type: "" });
                return instrument;
            } catch (error) {
                if (isTwirpError(error)) {
                    isNotFound(error);
                    isValidationError(error);
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
                    isNotFound(error);
                    isPermissionDenied(error);
                    isValidationError(error);
                }
                console.log(error); // unknown error
                throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
            }
        },
    }
};