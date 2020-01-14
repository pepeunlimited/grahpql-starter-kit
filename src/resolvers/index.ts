import { merge } from 'lodash';
import { IResolvers, ITypedef, makeExecutableSchema } from 'graphql-tools';

import {
  typeDef as User,
  resolvers as userResolvers
} from './user';

import {
  typeDef as Authorizaton,
  resolvers as authorizationResolvers
} from './authorization';

import {
  typeDef as Spaces,
  resolvers as spacesResolvers
} from './spaces';

import {
  typeDef as Credentials,
  resolvers as credentialsResolvers
} from './credentials';

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
  typeDefs: [Query, User, Authorizaton, Spaces, Credentials],
  resolvers: merge(resolvers, userResolvers, authorizationResolvers, spacesResolvers, credentialsResolvers)
});