import {IResolvers, ITypedef} from "graphql-tools";
import {User, UserService} from "../rpc/user";
import {Context, isTwirpError} from "ts-rpc-client";
import {ApolloError} from "apollo-server";
import {throwsPermissionDenied} from "../error/permission_denied";
import {throwsNotFound} from "../error/not_found";
import {throwsValidationError} from "../error/validation";
import {throwsAlreadyExist} from "../error/already_exist";
import {Product, ProductService} from "../rpc/product";
import {Price, PriceService} from "../rpc/price";

export const typeDef: ITypedef = `
  extend type Query {
    # product by id
    product(id: ID!): Product!
  }
  type Product {
    id: ID!
    sku: String!
    price: Price!
  }
`;

export const resolvers: IResolvers = {
    Query: {
        product: async (_, { id }, context): Promise<Product> => {
            const ctx             = context.ctx as Context;
            const productService  = context.models.product as ProductService<Context>;
            try {
                const product = await productService.GetProduct(ctx, { productId: id, sku: "" });
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
        price: async (parent, args, context): Promise<Price> => {
            const ctx             = context.ctx as Context;
            const priceService    = context.models.price as PriceService<Context>;
            const productId       = parent.id as number;
            try {
                const price = await priceService.GetPrice(ctx, { productId: productId, priceId:0, productSku:"" });
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