# grahpql-starter-kit

Services which are listed on below; GraphQL glues them together providing an single-point-access for the API consumers.

## Microservices:

- [`users`](https://github.com/pepeunlimited/users)
- [`authentication-twirp`](https://github.com/pepeunlimited/authentication-twirp)
- [`files`](https://github.com/pepeunlimited/files)
- [`payments`](https://github.com/pepeunlimited/payments)

#### Misc:

```
$ protoc --plugin=../../node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=. ./user.proto --ts_proto_opt=context=true
```