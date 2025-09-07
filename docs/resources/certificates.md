---
sidebar_position: 4
---

# Certificates

Certificates are used to establish secure connections and verify identities in various applications. In this section, we will explore how to manage and utilize certificates effectively.

If you want to know how to deploy a certificate you can check [Building & Deploying &gt; Deploying](../building-and-deploying/deploying.md).

## Configuration

| Properties            | Type            | Required |
| --------------------- | --------------- | :------: |
| `namespace`           | `string`        |    ✓     |
| [`name`](#name)       | `string`        |    ✓     |
| [`tags`](#tags)       | `array<string>` |          |
| [`domains`](#domains) | `array<string>` |    ✓     |
| [`issuer`](#issuer)   | `object`        |    ✓     |

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

### Domains

Domains are the specific fully qualified domain names that the certificate will cover. You can specify multiple domains if needed.

```yaml title="robot-service.lttle.yaml"
service:
  domains:
    - example.com
    - www.example.com
```

### Issuer

The issuer defines the authority that issues the certificate. It can be configured with various parameters depending on the type of issuer being used.

There are two main types of issuers you can configure:

- [`auto`](#certificate-auto-issuer): Automatically manages the certificate issuance and renewal process.
- [`manual`](#certificate-manual-issuer): Requires manual intervention for certificate issuance and renewal.

#### Certificate Auto Issuer

The auto issuer automatically handles the issuance and renewal of certificates. It only works now with [Let's Encrypt](https://letsencrypt.org/) (both `staging` and `production` environments).

| Property                | Type                                 | Required |      Default       |
| ----------------------- | ------------------------------------ | :------: | :----------------: |
| [`email`](#email)       | `string`                             |    ✓     | Tenant user email? |
| [`provider`](#provider) | `letsencrypt \| letsencrypt-staging` |    ✓     |                    |
| [`renewal`](#renewal)   | `object`                             |          |                    |

##### Email

The email is used by Let's Encrypt to notify you about important information regarding your certificates, such as expiration notices and security alerts.

```yaml title="robot-service.lttle.yaml"
service:
  issuer:
    email: user@example.com
```

##### Renewal

Renewal settings define how and when the certificate should be renewed before it expires to ensure continuous security.

| Property                                        | Type     | Required |
| ----------------------------------------------- | -------- | :------: |
| [`days-before-expiry`](#days-before-expiry)     | `object` |    ✓     |
| [`retry-interval-hours`](#retry-interval-hours) | `object` |    ✓     |

###### `days-before-expiry`

This setting defines how many days before the expiration date the certificate should be renewed.

```yaml title="robot-service.lttle.yaml"
service:
  issuer:
    renewal:
      days-before-expiry: 7
```

###### `retry-interval-hours`

This setting defines the interval in hours to retry the renewal process if it fails.

```yaml title="robot-service.lttle.yaml"
service:
  issuer:
    renewal:
      retry-interval-hours: 24
```

##### Provider

The provider specifies which certificate authority to use for issuing the certificate. You can choose between `letsencrypt` for production and `letsencrypt-staging` for testing purposes.

```yaml title="robot-service.lttle.yaml"
service:
  issuer:
    provider: letsencrypt
```

:::warning

Let's encrypt has rate limits for certificate issuance. Make sure to use the `letsencrypt-staging` provider for testing to avoid hitting these limits.

Also, take into account that the `letsencrypt-staging` certificates are not trusted by browsers and may need to load the page with in Private Browsing / Incognito mode.

:::

:::note Question

Are there any other limitations or important notes regarding Let's Encrypt that should be mentioned here?

:::

#### Certificate Manual Issuer

The manual issuer requires you to manually handle the issuance and renewal of certificates. This is useful for scenarios where you need to use a specific certificate authority or have custom requirements.

| Property   | Type     | Required | Description                      |
| ---------- | -------- | :------: | -------------------------------- |
| `ca-path`  | `string` |          | Path to the CA certificate file. |
| `crt-path` | `string` |    ✓     | Path to the certificate file.    |
| `key-path` | `string` |    ✓     | Path to the private key file.    |

:::note Question

Should there be either `ca-path` or both `crt-path` and `key-path`?

Right now, `ca-path` is optional, but maybe it should be either that or both `crt-path` and `key-path`.

:::
