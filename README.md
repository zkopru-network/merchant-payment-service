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

### conceptual mindmap

![mindmap](https://lh3.googleusercontent.com/fife/AAWUweVLW8-xK0OfIxqV9XWFt--KurID1E5HBpJGoOf4DqMvlSSL8j8oUDqvNTzq4Z0L7PPwYwf8Sr0fZW_EU0LvbAyiTiJkCXRbOUCI6v43W_HLe9V2XKs189o3n7PTQTW1qo4D-zZ7NYJSvdWM0PISZJdeNFgPiNLnocDUYISQ8eYPkvDAzxHbNFZTbg614QY_Aem7T-8UTqxdR9eWjCb49VhKS-mSkxqtnRO0alZ7scsEOOqT1LJLFPemnF13tvyFZKPieoIjku0nJYoXYjbbE3E9gVEvBKUCf7X_kMgJ0HCo5Psi5il4QJvW6AazHq7mgzrPLpeuzcAB3RMJMrMP8GeeLgwruYvyGyJzYh5UgnKqX8bqw8saMjk9Sv1OkUb_I2-oZsOjo0l8Ykw2P0YA7gCvlA0RusTwzjCaF0UDQklLY5zzyKuD39BJgYV26ajbvIhD2TYG2yVhWUZ09DKrU0QD_sLr0Dj9e2M1aPFAt2Q3hh263W3DPrq4vZJ8n9-YfmOZiPzwyCnD5GmxkoegSzjRNFp8RlIy4HhmgrSgM8jvt7N2JiCLO3nALi-JL79RkoAk0fsQM0o62eEuqlh-42j66zT9FZfs0T3WP5o600LKYFsjY1EpEkdxIKp4yvcDo4uUXmiXlDpIxjkOwExJBmsQofroaXDjlnQkr-ITgDljmlgwCbCCkeCHKv1AEO1Da2pfoWwEd_2jIjwSD-m0fukx9lzUZHzvyvo=w3584-h1666-ft)