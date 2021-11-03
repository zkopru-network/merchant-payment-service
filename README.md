# merchant-payment-service
merchant service for zkopru

### build
```shell
yarn bootstrap
```

### packages
- cli: Command line interface for this service. For example, you can execute merchant server with your own configuration.
- server: Server implementation.
- sdk: core packages for both server/client service will use.

### how to run
- go to /packages/cli
- run ``` ./bin/run start -p {port} -c {coordinator url} -u {db url} -t {db type}```
