import { IResolvers, ITypedef } from "graphql-tools";
import { isTwirpError } from 'ts-rpc-client';
import {ApolloError, AuthenticationError, UserInputError} from "apollo-server";
import { Context } from "ts-rpc-client";
import { throwsValidationError } from "../error/validation";
import {throwsNotFound} from "../error/not_found";
import {Payment, PaymentInstrument, PaymentService} from "../rpc/payment";
import {User, UserService} from "../rpc/user";
import {Order, OrderService} from "../rpc/order";
import {throwsPermissionDenied} from "../error/permission_denied";

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
        paymentInstrument: async (_, { id, type }, context: { ctx: Context, service: { payment: PaymentService<Context> }}): Promise<PaymentInstrument> => {
            const userId = context.ctx.userId;
            if (userId == null) {
                throw new AuthenticationError("authorization")
            }
            try {
                const paymentInstrument = await context.service.payment.GetPaymentInstrument(context.ctx, { id: id, type: type });
                return paymentInstrument;
            } catch (error) {
                if (isTwirpError(error)) {
                    throwsPermissionDenied(error);
                    throwsNotFound(error);
                    throwsValidationError(error);
                }
                console.log(error);
                throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
            }
        },
    },
    Mutation: {},
    Payment: {
        order: async (parent: Payment, { }, context: { ctx: Context, service: { order: OrderService<Context> } }): Promise<Order> => {
            const userId          = context.ctx.userId as number;
            const orderId         = parent.orderId;
            try {
                const order = await context.service.order.GetOrder(context.ctx, { userId: userId, orderId: orderId });
                return order;
            } catch (error) {
                if (isTwirpError(error)) {
                    throwsNotFound(error);
                    throwsValidationError(error);
                }
                console.log(error);
                throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
            }
        },
        instrument: async (parent: Payment, { }, context: { ctx: Context, service: { payment: PaymentService<Context> } }): Promise<PaymentInstrument> => {
            const paymentInstrumentId = parent.paymentInstrumentId;
            try {
                const instrument = await context.service.payment.GetPaymentInstrument(context.ctx, { id: paymentInstrumentId, type: "" });
                return instrument;
            } catch (error) {
                if (isTwirpError(error)) {
                    throwsNotFound(error);
                    throwsValidationError(error);
                }
                console.log(error);
                throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
            }
        },
        user: async (parent: Payment, _, context: { ctx: Context, service: { user: UserService<Context> } }): Promise<User> => {
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
        },
    }
};