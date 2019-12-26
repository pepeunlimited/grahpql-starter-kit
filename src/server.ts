import { environment } from './enviroment';
import { ApolloServer } from 'apollo-server'
import schema from './graphql';
import { Rpc, Context } from 'ts-rpc-client';
import { UserServiceClientImpl, User } from './rpc/user';

const server = new ApolloServer({ 
  schema,
  context: ({ req }) => {
    const ctx = new Context()
    const token = req.headers.authorization as string;
    const rpc = new Rpc("localhost", 8080);
    const user = new UserServiceClientImpl<Context>(rpc)
    ctx.token = token;
    return { models: { user }, ctx: ctx };
  },
  introspection: environment.apollo.introspection,
  playground:  environment.apollo.playground,
});
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});