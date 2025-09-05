---
sidebar_position: 2
---

# Authentication

Right now the only way to authenticate is with your provided JWT token.

Once you have installed the CLI in the previous step, [Installing the CLI](./installing-the-cli.md), you can authenticate by running the following command:

```sh
lttle login --api http://eu.lttle.cloud:5100 jwt
```

The only supported region is `eu`.

:::note Question

The region API endpoint for `eu` is using the http protocol. We should upgrade it to https for better security.

:::
