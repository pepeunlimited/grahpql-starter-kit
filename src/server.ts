import {environment, getUserID} from './enviroment';
import {ApolloServer} from 'apollo-server'
import schema from './resolvers';
import {Rpc, Context} from 'ts-rpc-client';
import {UserServiceClientImpl} from './rpc/user';
import {CredentialsServiceClientImpl} from "./rpc/credentials";
import {AuthenticationServiceClientImpl} from "./rpc/authentication";
import {AccountServiceClientImpl} from "./rpc/account";
import {CheckoutServiceClientImpl} from "./rpc/checkout";
import {FilesServiceClientImpl} from "./rpc/files";

const server = new ApolloServer({
  schema,
  context: async ({req}) => {
    const ctx           = new Context();
    ctx.isDebug         = true;
    const authorization = req.headers.authorization as string;

    const host: string    = "api.dev.pepeunlimited.com";
    const port: number    = 80;

    const rpc             = new Rpc(host, port);
    const authentication  = new AuthenticationServiceClientImpl<Context>(rpc);
    const user            = new UserServiceClientImpl<Context>(rpc);
    const files           = new FilesServiceClientImpl<Context>(rpc);
    const credentials     = new CredentialsServiceClientImpl<Context>(rpc);
    const accounts        = new AccountServiceClientImpl<Context>(rpc);
    const checkout        = new CheckoutServiceClientImpl<Context>(rpc);

    ctx.userId = await getUserID(authorization, authentication, ctx);

    return {models: {user, authentication, files, credentials, accounts, checkout}, ctx: ctx};
  },
  introspection: environment.apollo.introspection,
  playground:  environment.apollo.playground
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});