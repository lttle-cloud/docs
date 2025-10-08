# Glossary

This glossary contains definitions of terms used in the documentation.

## Human Readable String

A human readable string is a way to represent sizes in a format that is easy for humans to read and understand. It typically includes a number followed by a unit, such as `KB`, `MB`, `GB`, `TB` or `PB`. For example, `42MB` represents 42 megabytes.

You can also use `K`, `M`, `G`, `T` or `P` as shorthand for `KB`, `MB`, `GB`, `TB` or `PB` respectively. For example, `42M` is equivalent to `42MB`.

When specifying sizes in a human readable string, the number can be an integer or a decimal. For example, both `1.5GB` and `1500MB` are valid representations of the same size.

## Tenant

A tenant is a logical grouping of resources within the lttle.cloud platform. Each tenant is isolated from other tenants, meaning that resources in one tenant cannot be accessed by resources in another tenant.

## Profile

A profile is a CLI configuration that contains the credentials and settings for accessing the lttle.cloud platform. You can have multiple profiles, each with its own set of credentials and settings.

You can switch between profiles using the `lttle profile set <profile-name>` command. This allows you to easily manage multiple accounts or environments.

## Serverless

Within lttle.cloud's platform serverless refers to a hosting mode where the VM (virtual machine) is not continuously running, but instead it is started on demand when it receives traffic and stopped based on the configured strategy. This allows for cost-efficient hosting, as you only pay for the compute resources when they are actually being used.
