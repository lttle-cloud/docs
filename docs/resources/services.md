---
sidebar_position: 3
---

# Services

:::note TODO

Mark which properties are required and which are optional.

:::

The service resource allows you to define and manage services that can be used by machines or by the public internet. Services are independent of the machine lifecycle, so they can be created, updated, and deleted without affecting the machines that use them.

If you want to know how to deploy a a service [Building & Deploying &gt; Deploying](../building-and-deploying/deploying.md).

## Configuration

| Property                      | Type            | Required |
| :---------------------------- | :-------------- | :------: |
| `namespace`                   | `string`        |          |
| [`name`](#name)               | `string`        |    ✓     |
| [`tags`](#tags)               | `array<string>` |          |
| [`bind`](#bindings)           | `object`        |    ✓     |
| [`target`](#target)           | `object`        |    ✓     |
| [`certificate`](#certificate) | `string`        |          |

If you want to know more about namespaces, check [Building & Deploying &gt; Namespaces](../building-and-deploying/namespaces.md)

### Name

The name is the unique identifier for your machine within a namespace.

Validation:

- It must start with a letter
- Can contain alphanumeric characters
- Can contain `-` (underscore) and `_` (hyphen)

:::note TODO

Reuse name validation from a dedicated component / imported markdown file.

:::

```yaml title="robot-service.lttle.yaml"
service:
  name: terminator-service
```

### Tags

Tags are used to organize and categorize resources. They can be any valid UTF-8 string and can be used to filter resources in the [Web Console](../monitoring/web-console.md).

```yaml title="robot-service.lttle.yaml"
service:
  tags:
    - terminator
```

### Bindings

It defines how the service is exposed. It can be either [`internal`](#internal) or [`external`](#external).

#### Internal

It exposes the service only internally on the tenant. It is used for inter-machine communication.

:::note Todo

We need to document accounts / tenants.

:::

| Property | Type                          |         Default          |
| :------- | :---------------------------- | :----------------------: |
| `port`   | `int` (min: `0` max: `65535`) | The [target port](#port) |

```yaml title="robot-service.lttle.yaml"
service:
  bind:
    internal: {}
```

In order to access the service within a machine you need to use the following http url:

```text
http://<service>.<namespace>.svc.lttle.local:<port>
```

If you want to define a specific port you can do it like this:

```yaml title="robot-service.lttle.yaml"
service:
  bind:
    internal:
      port: 8080
```

And the URL will be:

```text
http://<service>.<namespace>.svc.lttle.local:8080
```

#### External

It exposes the service to the public internet. It is used to expose services that need to be accessed from outside the tenant.

| Property        | Type                          |         Default          |
| :-------------- | :---------------------------- | :----------------------: |
| `port`          | `int` (min: `0` max: `65535`) | The [target port](#port) |
| [`host`](#host) | `string`                      |                          |
| [`protocol`]    | `http \| https \| tls`        |                          |

:::tip

If you want to use `https` or `tls` you need to provide a valid certificate using the [`certificate property`](#certificate) and you need to also define a [certificate resource](./certificates.md).

:::

##### Host

The host property defines the hostname that will be used to access the service. It must be a valid **fully qualified domain name** (FQDN).

```yaml title="robot-service.lttle.yaml"
service:
  bind:
    external:
      host: somewhere.eu.lttle.host
```

### Target

It defines what [machine](./machines.md) the service is pointing to.

| Property                                      | Type                           | Required |      Default       |
| :-------------------------------------------- | :----------------------------- | :------: | :----------------: |
| `namespace`                                   | `string`                       |          |                    |
| `name`                                        | `string`                       |    ✓     |                    |
| `port`                                        | `int` (min: `0`, max: `65535`) |    ✓     |                    |
| `protocol`                                    | `http \| https \| tls`         |    ✓     |                    |
| [`connection-tracking`](#connection-tracking) | `connection-aware \| object`   |          | `connection-aware` |

#### Port

The port property defines the port on which the target machine is listening.

```yaml title="robot-service.lttle.yaml"
service:
  target:
    port: 8080
```

#### Connection Tracking

There are two types of connection tracking: `connection-aware` and `traffic-aware`.

##### Connection Aware

This is the default connection tracking strategy. It keeps the machine `ready` as long as there is an active connection to the service.

```yaml title="robot-service.lttle.yaml"
service:
  target:
    connection-tracking: connection-aware
```

References:

- [[RFC 793] Transmission Control Protocol | Establishing a connection](https://ietf.org/rfc/rfc793.html#section-3.4)
- [[RFC 793] Transmission Control Protocol | Closing a connection](https://ietf.org/rfc/rfc793.html#section-3.5)
- [[RFC 2616] Hypertext Transfer Protocol -- HTTP/1.1 | Persistent Connections](https://www.ietf.org/rfc/rfc2616.html#section-8)
- [[RFC 7540] Hypertext Transfer Protocol Version 2 (HTTP/2) | Connection Management](https://ietf.org/rfc/rfc7540.html#section-9.1)

##### Traffic Aware

This connection tracking strategy keeps the machine `ready` as long as there is traffic to the service. It is useful for workloads that do not maintain a persistent connection, like HTTP/1.1 but

:::info

Right now there is only one connection tracking strategy, but there are plans to add more in the future.

:::

### Certificate

## Domains & DNS

For development, research and testing feel free to use the `eu.lttle.host` sub-domain. For production workloads, you should use your own domain and [configure the DNS records accordingly](#configure-dns).

We are maintaining the `eu.lttle.host` sub-domain and you can use it for free. We are using a wildcard certificate for it, so you don't need to worry about certificates during the early stages of your project.

### DNS Propagation

:::note Question

What should I say about DNS propagation?

:::

### Configure DNS

To configure your own domain for production workloads, you need to set up the DNS records to point to your services. This typically involves creating `A` records in your DNS provider's management console.

Use this IP address for the `A` records depending on the region you are using:

| Region        | IP Address      |
| :------------ | :-------------- |
| `eu` (Europe) | `46.105.65.138` |

:::note Question

Should I link here to places like: [Cloudflare Manage DNS records](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/) and other providers?

:::

### DNS Validation

:::note TODO

:::

## Service Lifecycle

:::note TODO

:::

```

```

```

```
