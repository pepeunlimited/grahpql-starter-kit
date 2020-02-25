import {IResolvers, ITypedef} from "graphql-tools";
import {Context, isTwirpError} from "ts-rpc-client";
import {ApolloError} from "apollo-server";
import {throwsPermissionDenied} from "../error/permission_denied";
import {throwsNotFound} from "../error/not_found";
import {throwsValidationError} from "../error/validation";
import {Product, ProductService} from "../rpc/product";
import {Price, PriceService} from "../rpc/price";

// union & interfaces:
// https://www.apollographql.com/docs/apollo-server/schema/unions-interfaces/

export const typeDef: ITypedef = `
  extend type Query {
    # product by id
    product(productId: ID!): Product!
  }
  type Product {
    id: ID!
    sku: String!
    price: Price!
  }
`;

export const resolvers: IResolvers = {
    Query: {
        product: async (_, { productId }, context: { ctx: Context, service: { product: ProductService<Context> }}): Promise<Product> => {
            try {
                const product = await context.service.product.GetProduct(context.ctx, { productId: productId, sku: "" });
                return product;
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
    Mutation: {},
    Product: {
        price: async (parent: Product, args, context: { ctx: Context, service: { price: PriceService<Context> }}): Promise<Price> => {
            const productId       = parent.id as number;
            try {
                const price = await context.service.price.GetPrice(context.ctx, { productId: productId, priceId:0, productSku:"" });
                return price;
            }catch (error) {
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