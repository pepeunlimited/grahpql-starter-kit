import {ApolloError, IResolvers, ITypedef} from "apollo-server";

export const typeDef: ITypedef = `
  type File {
    id: ID!
    filename: String!
    createdAt: String!
    updatedAt: String!
    fileSize: Int!
    isDraft: Boolean!
    fileUrl: String!
    mimeType: String!
  }
`;

export const resolvers: IResolvers = {
    Query: {},
    Mutation: {}
};