import { environment } from './enviroment';
import { ApolloServer } from 'apollo-server'
import schema from './resolvers';
import { Rpc, Context } from 'ts-rpc-client';
import { UserServiceClientImpl } from './rpc/user';
import {SpacesServiceClientImpl} from "./rpc/spaces";
import {CredentialsServiceClientImpl} from "./rpc/credentials";
import {AuthenticationServiceClientImpl} from "./rpc/authentication";
import {isNullOrUndefined} from "util";

const server = new ApolloServer({ 
  schema,
  context: ({ req }) => {
    const ctx = new Context();
    const token = req.headers.authorization as string;
    if (!isNullOrUndefined(token)) {
      ctx.accessToken = token.replace('Bearer ','');
    }
    ctx.isDebug = true;
    // TODO: move to the .env-file
    const host: string = "api.dev.pepeunlimited.com";
    const port: number = 80;

    const rpc =           new Rpc(host, port);
    
    const authentication = new AuthenticationServiceClientImpl<Context>(rpc);
    const user =          new UserServiceClientImpl<Context>(rpc);
    const spaces =        new SpacesServiceClientImpl<Context>(rpc);
    const credentials  =  new CredentialsServiceClientImpl<Context>(rpc);

    return { models: { user, authentication, spaces, credentials }, ctx: ctx };
  },
  introspection: environment.apollo.introspection,
  playground:  environment.apollo.playground
});
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});