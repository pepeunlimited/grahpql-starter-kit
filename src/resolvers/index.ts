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
  typeDefs: [Query, User, Authentication, Files, Credentials, Accounts, Checkout],
  resolvers: merge(resolvers, userResolvers, authenticationResolvers, filesResolvers, credentialsResolvers, accountsResolvers, checkoutResolvers)
});