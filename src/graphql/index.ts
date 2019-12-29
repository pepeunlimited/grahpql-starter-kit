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

const Query: ITypedef = `
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;
const resolvers: IResolvers =  {}

export default makeExecutableSchema({
  typeDefs: [Query, User, Authorizaton],
  resolvers: merge(resolvers, userResolvers, authorizationResolvers)
});