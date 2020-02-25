import {IResolvers, ITypedef} from "graphql-tools";
import {Product, ProductService} from "../rpc/product";
import {Context, isTwirpError} from "ts-rpc-client";
import {throwsPermissionDenied} from "../error/permission_denied";
import {throwsNotFound} from "../error/not_found";
import {throwsValidationError} from "../error/validation";
import {ApolloError} from "apollo-server";
import {Price, PriceService} from "../rpc/price";
import {Plan, PlanService} from "../rpc/plan";
import {PaymentService} from "../rpc/payment";

export const typeDef: ITypedef = `
  extend type Query {
    # plan by id
    plan(id: ID!): Plan!
  }

  type Plan {
    id: ID!
    startAt: String!
    endAt: String!
  }
`;

export const resolvers: IResolvers = {
    Query: {
        plan: async (_, { id }, context: { ctx: Context, service: { plan: PlanService<Context> }}): Promise<Plan> => {
            try {
                const plan = await context.service.plan.GetPlan(context.ctx, {planId: id});
                return plan
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
    Plan: {}
};