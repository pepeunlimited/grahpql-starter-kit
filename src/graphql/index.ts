import { merge } from 'lodash';
import { IResolvers, ITypedef, makeExecutableSchema } from 'graphql-tools';

import {
  typeDef as User,
  resolvers as userResolvers
} from './user';

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
  typeDefs: [Query, User],
  resolvers: merge(resolvers, userResolvers)
});