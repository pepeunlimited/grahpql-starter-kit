import {environment, getUserID} from './enviroment';
import {ApolloError, ApolloServer} from 'apollo-server'
import schema from './resolvers';
import {Rpc, Context, isTwirpError} from 'ts-rpc-client';
import {UserServiceClientImpl} from './rpc/user';
import {SpacesServiceClientImpl} from "./rpc/spaces";
import {CredentialsServiceClientImpl} from "./rpc/credentials";
import {AuthenticationServiceClientImpl} from "./rpc/authentication";
import {AccountServiceClientImpl} from "./rpc/account";
import {CheckoutServiceClientImpl} from "./rpc/checkout";

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
    const spaces          = new SpacesServiceClientImpl<Context>(rpc);
    const credentials     = new CredentialsServiceClientImpl<Context>(rpc);
    const accounts        = new AccountServiceClientImpl<Context>(rpc);
    const checkout        = new CheckoutServiceClientImpl<Context>(rpc);

    ctx.userId = await getUserID(authorization, authentication, ctx);

    return {models: {user, authentication, spaces, credentials, accounts, checkout}, ctx: ctx};
  },
  introspection: environment.apollo.introspection,
  playground:  environment.apollo.playground
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});