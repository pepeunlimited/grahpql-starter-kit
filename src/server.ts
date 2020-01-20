import { environment } from './enviroment';
import {ApolloError, ApolloServer} from 'apollo-server'
import schema from './resolvers';
import {Rpc, Context, isTwirpError} from 'ts-rpc-client';
import {UserServiceClientImpl} from './rpc/user';
import {SpacesServiceClientImpl} from "./rpc/spaces";
import {CredentialsServiceClientImpl} from "./rpc/credentials";
import {AuthenticationServiceClientImpl} from "./rpc/authentication";
import {isNullOrUndefined} from "util";
import {AccountServiceClientImpl} from "./rpc/account";
import {isAccessRefreshError} from "./error/authorization";
import {isUserError} from "./error/user";
import {isValidationError} from "./error/validation";

const server = new ApolloServer({
  schema,
  context: async ({req}) => {
    const ctx = new Context();
    const authorization = req.headers.authorization as string;

    const host: string = "api.dev.pepeunlimited.com";
    const port: number = 80;

    const rpc = new Rpc(host, port);
    const authentication = new AuthenticationServiceClientImpl<Context>(rpc);

    if (!isNullOrUndefined(authorization)) {
      const accessToken = authorization.replace('Bearer ', '');
      try {
        const verified = await authentication.VerifyAccessToken(ctx, { accessToken: accessToken });
        ctx.userId = verified.userId;
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

    ctx.isDebug = true;
    const user = new UserServiceClientImpl<Context>(rpc);
    const spaces = new SpacesServiceClientImpl<Context>(rpc);
    const credentials = new CredentialsServiceClientImpl<Context>(rpc);
    const accounts = new AccountServiceClientImpl<Context>(rpc);

    return {models: {user, authentication, spaces, credentials, accounts}, ctx: ctx};
  },
  introspection: environment.apollo.introspection,
  playground:  environment.apollo.playground
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});