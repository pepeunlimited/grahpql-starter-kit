import { merge } from 'lodash';
import { IResolvers, ITypedef, makeExecutableSchema } from 'graphql-tools';

import {
  typeDef as User,
  resolvers as userResolvers
} from './user';

import {
  typeDef as Authentication,
  resolvers as authenticationResolvers
} from './authentication';

import {
  typeDef as Files,
  resolvers as filesResolvers
} from './files';

import {
  typeDef as Credentials,
  resolvers as credentialsResolvers
} from './credentials';

import {
  typeDef as Accounts,
  resolvers as accountsResolvers
} from './accounts';

import {
  typeDef as Checkout,
  resolvers as checkoutResolvers
} from './checkout';

import {
  typeDef as Payment,
  resolvers as paymentResolvers
} from './payment';

import {
  typeDef as Order,
  resolvers as orderResolvers
} from './order';

import {
  typeDef as Product,
  resolvers as productResolvers
} from './product';

import {
  typeDef as Price,
  resolvers as priceResolvers
} from './price';

import {
  typeDef as Plan,
  resolvers as planResolvers
} from './plan';

const Query: ITypedef = `  
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

const resolvers: IResolvers =  {};

export default makeExecutableSchema({
  typeDefs: [Query, User, Authentication, Files, Credentials, Accounts, Checkout, Payment, Order, Product, Price, Plan],
  resolvers: merge(resolvers, userResolvers, authenticationResolvers, filesResolvers, credentialsResolvers, accountsResolvers, checkoutResolvers, paymentResolvers, orderResolvers, productResolvers, priceResolvers, planResolvers)
});