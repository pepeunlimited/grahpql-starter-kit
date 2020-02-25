import {ITypedef} from "graphql-tools";

export const typeDef: ITypedef = `
  extend type Query {
    # user by id
    user(id: ID!): User!
  }
  extend type Mutation {
    # create the new user
    createUser(username: String!, password: String!, email: String!): User!
  }
  type Plan {
    id: ID!
  }
`;