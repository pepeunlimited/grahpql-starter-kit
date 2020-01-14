import { IResolvers, ITypedef } from "graphql-tools";
import { User, UserService } from '../rpc/user';
import { isTwirpError } from 'ts-rpc-client';
import { ApolloError } from "apollo-server";
import { Context } from "ts-rpc-client";
import { isAccessRefreshError } from "../error/authorization";
import { isUserError } from "../error/user";
import { isValidationError } from "../error/validation";
import { File, SpacesService } from '../rpc/spaces';
import { isSpacesError } from "../error/spaces";

// https://blog.apollographql.com/modularizing-your-graphql-schema-code-d7f71d5ed5f2

export const typeDef: ITypedef = `
  extend type Query {
    # Get the user. requires sign-in (Authorization)
    user: User!
  }
  extend type Mutation {
    # create the new user
    createUser(username: String!, password: String!, email: String!): User!
    # use to set and update the profile picture 
    setProfilePicture(fileID: ID!): Boolean!
  }
  type User {
    id: ID!
    username: String!
    email: String!
    roles: [String]!
    profilePicture: File
  }
`;
export const resolvers: IResolvers = {
  Query: {
    user: async (_, { }, context): Promise<User> => {
      const ctx = context.ctx as Context;
      const token = ctx.accessToken as String;
      const userService = context.models.user as UserService<Context>;
      try {
        const user = await userService.GetUser(ctx, {});
        context.user = user;
        return user;
      } catch (error) {
        if (isTwirpError(error)) {
          isAccessRefreshError(error);
          isUserError(error);
          isValidationError(error);
        }
        console.log(error); // unknown error
        throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
      }
    }
  },
  Mutation: {
    createUser: async (_source, { password, email, username }, context): Promise<User> => {
      const ctx = context.ctx as Context;
      const userService = context.models.user as UserService<Context>;
      try {
        const user = await userService.CreateUser(ctx, {
          username: username,
          password: password,
          email: email
        });
        return user;
      } catch (error) {
        if (isTwirpError(error)) {
          isValidationError(error);
        }
        console.log(error); // unknown error
        throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
      }
    },
    setProfilePicture: async (_source, { fileID }, context): Promise<Boolean> => {
      const ctx = context.ctx as Context;
      const userService = context.models.user as UserService<Context>;
      try {
        const resp0 = await userService.SetProfilePicture(ctx, { profilePictureId: fileID });
        return true
      } catch (error) {
        if (isTwirpError(error)) {
          isSpacesError(error);
          isUserError(error);
          isAccessRefreshError(error);
          isValidationError(error);
        }
        console.log(error); // unknown error
        throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
      }
    },
  },
  User: {
    profilePicture: async (_source, {  }, context): Promise<File|null> => {
      const ctx = context.ctx as Context;
      const spacesService = context.models.spaces as SpacesService<Context>;
      try {
        const user = context.user as User; // NOTE: not sure, is this proper way..
        if (user.profilePictureId == 0) {
          return null;
        }
        const file = await spacesService.GetFile(ctx, { fileId: user.profilePictureId, filename: undefined });
        return file
      } catch (error) {
        if (isTwirpError(error)) {
          isSpacesError(error)
          isAccessRefreshError(error);
          isUserError(error);
          isValidationError(error);
        }
        console.log(error); // unknown error
        throw new ApolloError(error.msg, "INTERNAL_SERVER_ERROR");
      }
    }
  }
};