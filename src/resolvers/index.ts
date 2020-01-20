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
  typeDef as Spaces,
  resolvers as spacesResolvers
} from './spaces';

import {
  typeDef as Credentials,
  resolvers as credentialsResolvers
} from './credentials';

import {
  typeDef as Accounts,
  resolvers as accountsResolvers
} from './accounts';

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
  typeDefs: [Query, User, Authentication, Spaces, Credentials, Accounts],
  resolvers: merge(resolvers, userResolvers, authenticationResolvers, spacesResolvers, credentialsResolvers, accountsResolvers)
});