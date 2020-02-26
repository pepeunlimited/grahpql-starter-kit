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
import {OrderServiceClientImpl} from "./rpc/order";
import {PaymentServiceClientImpl} from "./rpc/payment";
import {PriceServiceClientImpl} from "./rpc/price";
import {ProductServiceClientImpl} from "./rpc/product";
import {PlanServiceClientImpl} from "./rpc/plan";
import {SubscriptionServiceClientImpl} from "./rpc/subscription";
import {ThirdPartyPriceServiceClientImpl} from "./rpc/third_party_price";


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
    const account         = new AccountServiceClientImpl<Context>(rpc);
    const checkout        = new CheckoutServiceClientImpl<Context>(rpc);
    const order           = new OrderServiceClientImpl<Context>(rpc);
    const payment         = new PaymentServiceClientImpl<Context>(rpc);
    const price           = new PriceServiceClientImpl<Context>(rpc);
    const product         = new ProductServiceClientImpl<Context>(rpc);
    const plan            = new PlanServiceClientImpl<Context>(rpc);
    const subscription    = new SubscriptionServiceClientImpl<Context>(rpc);
    const thirdpartyprice = new ThirdPartyPriceServiceClientImpl<Context>(rpc);

    ctx.userId = await getUserID(authorization, authentication, ctx);

    return {service: {user, authentication, files, credentials, account, checkout, order, payment, price, product, plan, subscription, thirdpartyprice}, ctx: ctx};
  },
  tracing: true,
  introspection: environment.apollo.introspection,
  playground:  environment.apollo.playground
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});