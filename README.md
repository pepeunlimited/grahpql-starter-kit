# grahpql-starter-kit

Microservices which are listed on below; GraphQL glues them together providing an single-point-access (gateway) for the API consumer.

Services communicates each others via gRPC.

### `/src`
`src` folder contains files for the API and `server.ts` is the actual GraphQL server.

#### `/resolvers`

#### `/rpc`

### Services:

- [x] [`users`](https://github.com/pepeunlimited/users)
- [x] [`authentication-twirp`](https://github.com/pepeunlimited/authentication-twirp)
- [x] [`files`](https://github.com/pepeunlimited/files)
- [ ] [`apple-payments`](https://github.com/pepeunlimited/apple-payments)
    -   validate IAPs (In-App-Purchases) from AppleStore
- [ ] [`purchases`](https://github.com/pepeunlimited/purchases)
    -   products which the user has bought
- [ ] [`checkout`](https://github.com/pepeunlimited/checkout)
    -   orchestrates the purchases flow. validate, mark product as bought and etc.. 
- [ ] [`products`](https://github.com/pepeunlimited/products)
    -   list of different products: IAPs, Lists and etc..
- [ ] [`accounts`](https://github.com/pepeunlimited/accounts)
    -   service which holds the user's account (balance and etc..). 
 - [ ] [`accounts`](https://github.com/pepeunlimited/accounts)
     -   service which holds the user's account (balance and etc..).
#### Misc:

```
$ protoc --plugin=../../node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=. ./user.proto --ts_proto_opt=context=true
```