---
sidebar_position: 2
---

# Authentication

Right now the only way to authenticate is with your provided [JWT token](https://jwt.io/introduction#what-is-json-web-token).

Once you have installed the CLI in the previous step, [Installing the CLI](./installing-the-cli.md), you can authenticate by running the following command:

```sh
lttle login --api https://eu.lttle.cloud <JWT>
```

The only supported region is `eu`.

:::danger EARLY ACCESS

When your JWT token expires, please contact us to get a new one.

:::
