import {IResolvers, ITypedef} from "graphql-tools";
import {Product, ProductService} from "../rpc/product";
import {Context, isTwirpError} from "ts-rpc-client";
import {throwsPermissionDenied} from "../error/permission_denied";
import {throwsNotFound} from "../error/not_found";
import {throwsValidationError} from "../error/validation";
import {ApolloError} from "apollo-server";
import {Price, PriceService} from "../rpc/price";
import {PlanService} from "../rpc/plan";

export const typeDef: ITypedef = `
  extend type Query {
    # user by id
    price(id: ID!): Price!
  }
  type Price {
    id: ID!
    price: Int!
    discount: Int!
    product: Product!
  }
`;

export const resolvers: IResolvers = {
    Query: {
        price: async (_, { id }, context: { ctx: Context, service: { price: PriceService<Context> }}): Promise<Price> => {
            try {
                const price = await context.service.price.GetPrice(context.ctx, { productId: 0, priceId: id, productSku: "" });
                return price;
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
    Price: {
        product: async (parent, args, context): Promise<Product> => {
            const ctx             = context.ctx as Context;
            const productService  = context.service.product as ProductService<Context>;
            const productId         = parent.productId as number;
            try {
                const product = await productService.GetProduct(ctx, { productId: productId, sku: "" });
                return product;
            } catch (error) {
                if (isTwirpError(error)) {
                    throwsPermissionDenied(error);
                    throwsNotFound(error);
                    throwsValidationError(error);
                }
                console.log(error);
                throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
            }
        }
    }
};