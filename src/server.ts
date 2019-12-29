import { environment } from './enviroment';
import { ApolloServer } from 'apollo-server'
import schema from './graphql';
import { Rpc, Context } from 'ts-rpc-client';
import { UserServiceClientImpl } from './rpc/user';
import { AuthorizationServiceClientImpl } from './rpc/authorization';

const server = new ApolloServer({ 
  schema,
  context: ({ req }) => {
    const ctx = new Context()
    const token = req.headers.authorization as string;
    ctx.token = token;

    const rpc = new Rpc("api.dev.pepeunlimited.com", 80);
    
    const authorization = new AuthorizationServiceClientImpl<Context>(rpc);
    const user = new UserServiceClientImpl<Context>(rpc)
    
    return { models: { user, authorization }, ctx: ctx };
  },
  introspection: environment.apollo.introspection,
  playground:  environment.apollo.playground,
  tracing: true,
});
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});