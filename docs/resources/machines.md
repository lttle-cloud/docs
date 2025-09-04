---
sidebar_position: 1
---

# Machines

:::note TODO

Mark which properties are required and which are optional.

:::

These are the bread and butter of the lttle.cloud ecosystem. They run your code and provide the necessary resources for your applications to function.

If you want to know how to deploy a machine you can check [Building & Deploying &gt; Building](../building-and-deploying/building.md) and [Building & Deploying &gt; Deploying](../building-and-deploying/deploying.md).

## Configuration

| Properties                              |                Type                 | Required |  Default  |
| :-------------------------------------- | :---------------------------------: | :------: | :-------: |
| `namespace`                             |              `string`               |          | `default` |
| [`name`](#name)                         |              `string`               |    ✓     |           |
| [`tags`](#tags)                         |           `array<string>`           |          |           |
| [`image`](#image)                       |              `string`               |    ✓     |           |
| [`depends-on`](#depends-on)             |           `array<object>`           |          |           |
| [`resources`](#resources)               |              `object`               |    ✓     |           |
| [`mode`](#mode)                         |        `object` \| `regular`        |    ✓     |           |
| [`restart-policy`](#memory)             | `always` \| `on-failure` \| `never` |          | `always`  |
| [`environment`](#environment-variables) |              `object`               |          |           |
| [`volume`](#volumes)                    |              `object`               |          |           |
| [`command`](#command)                   |               `array`               |          |           |

If you want to know more about namespaces, check [Building & Deploying &gt; Namespaces](../building-and-deploying/namespaces.md)

### Name

The name is the unique identifier for your machine within a namespace. It is used to reference the machine in [services](./services.md).

Validation:

- It must start with a letter
- Can contain alphanumeric characters
- Can contain `-` (underscore) and `_` (hyphen)

:::note TODO

Reuse name validation from a dedicated component / imported markdown file.

[importing markdown](https://docusaurus.io/docs/markdown-features/react#importing-markdown)

:::

```yaml title="robot.lttle.yaml"
machine:
  name: terminator
```

### Tags

Tags are used to organize and categorize resources. They can be any valid UTF-8 string and can be used to filter resources in the [Web Console](../monitoring/web-console.md).

```yaml title="robot.lttle.yaml"
machine:
  tags:
    - terminator
    - future
    - mission
```

### Image

The image is an OCI-compliant image identifier that specifies the container image that will be used to create the machine. It can be any valid image from a container registry, such as Docker Hub, GitHub Container Registry, Google Container Registry, Quay.io or your own private registry.

```yaml title="robot.lttle.yaml"
machine:
  image: future/terminator:800
```

#### Container Registry Authentication

:::note TBD

Needs: [LTT-35](https://linear.app/lttlecloud/issue/LTT-35)

:::

### Depends on

The `depends-on` property defines the dependencies of the machine. It is specified as an array of objects, each representing how to identify a machine.

| Property    | Description                                | Required |
| ----------- | ------------------------------------------ | :------: |
| `name`      | The name of the machine to depend on.      |          |
| `namespace` | The namespace of the machine to depend on. |    ✓     |

```yaml title="robot.lttle.yaml"
machine:
  depends-on:
    - name: research
      namespace: overlord
    - name: ai
```

### Resources

The resources section defines the compute resources allocated to the machine. It consists of two properties: `cpu` and `memory`.

| Properties          | Type                                    | Default | Required |
| :------------------ | :-------------------------------------- | :-----: | :------: |
| [`cpu`](#cpu)       | `int` (min: `1` max: `24`)              |   `1`   |    -     |
| [`memory`](#memory) | `int` mebibytes (min: `64` max: `1024`) |  `64`   |    -     |

:::note Question

Are these min/max values correct?

:::

#### CPU

The `cpu` property defines the number of CPU cores allocated to the machine. It is specified as an integer value.

```yaml title="robot.lttle.yaml"
machine:
  resources:
    cpu: 1
```

#### Memory

The `memory` property defines the amount of memory allocated to the machine. It is specified as an integer value representing the number of mebibytes (MiB) of memory.

```yaml title="robot.lttle.yaml"
machine:
  resources:
    memory: 64
```

#### Considerations

When configuring the resources for your machine, keep the following in mind:

- The `cpu` and `memory` values should be chosen based on the specific requirements of your application. Monitor the resource usage of your application and adjust the values as needed.
- Over-provisioning resources (allocating more CPU or memory than necessary) can lead to increased costs without any performance benefits.
- Under-provisioning resources can result in degraded performance or application failures. Make sure to allocate enough resources to handle peak loads.

:::info Caveat

Right now, machine memory consumers are

- Our configured [minified kernel](../advanced/linux-kernel.md)
- The [Takeoff Init System](../advanced/takeoff.md)
- Your application

:::

### Mode

The mode determines how the machine will be run. There are two modes available: `regular` and `flash`.

#### Regular Mode

In regular mode, the machine will be started normally and it will not be suspended.

```yaml title="robot.lttle.yaml"
machine:
  mode: regular
```

#### Flash Mode

In flash mode, the machine will start normally and it will be suspended based on the defined `strategy` and `timeout`.

| Properties                         | Type                | Default | Required |
| :--------------------------------- | :------------------ | :-----: | :------: |
| [`timeout`](#flash-mode-timeout)   | `int`               |    -    |    ✓     |
| [`strategy`](#flash-mode-strategy) | `regular \| object` |    -    |    ✓     |

##### Flash Mode Timeout

The timeout property defines the maximum amount of time (in seconds) that the machine will be allowed to run before it is suspended. The timeout starts based on the defined `strategy`.

```yaml title="robot.lttle.yaml"
machine:
  mode:
    flash:
      timeout: 42
```

##### Flash Mode Strategy

The strategy property defines the strategy to be used for the flash mode. It is specified as an object.

| Strategies                          |
| :---------------------------------- |
| [`first-listen`](#first-listen)     |
| [`nth-listen`](#nth-listen)         |
| [`listen-on-port`](#listen-on-port) |
| [`manual`](#manual)                 |

###### `first-listen`

In this strategy, the machine will be suspended after the first successful listen event to any socket.

```yaml title="robot.lttle.yaml"
machine:
  mode:
    flash:
      strategy: first-listen
```

###### `nth-listen`

In this strategy, the machine will be suspended after the nth successful listen event to any socket.

```yaml title="robot.lttle.yaml"
machine:
  mode:
    flash:
      strategy:
        nth-listen: 3
```

###### `listen-on-port`

In this strategy, the machine will be suspended after a successful listen event on a specific port.

```yaml title="robot.lttle.yaml"
machine:
  mode:
    flash:
      strategy:
        listen-on-port: 1984
```

###### `manual`

In this strategy, the machine will be suspended after a manual intervention.

```yaml title="robot.lttle.yaml"
machine:
  mode:
    flash:
      strategy: manual
```

If you want to use `manual` you can do so by using one of our [SDKs](../sdks/introduction.md).

:::warning

This is an advanced topic, for more details see [Advanced &gt; Manual Flash Mode](../advanced/manual-flash-mode.md).

:::

:::info

Flash mode defines when the machine is initially snapshotted and suspended, post initialization. After that, the machine can be resumed and suspended multiple times. This type of suspension is configured on the machine targeting [Service](./services.md) under the [Services &gt; Connection Tracking](./services.md#connection-tracking) strategy.

:::

### Restart Policy

This tells us how to manage if the machine exits. You can configure the machine to restart based on your use-case.

| Policy       | Description                                                             |
| ------------ | ----------------------------------------------------------------------- |
| `always`     | Always restart the machine if it exits                                  |
| `on-failure` | Restart the machine only if it exits with a non-zero exit code.         |
| `never`      | Do not restart the machine if it exits event with a non-zero exit code. |

### Environment Variables

This is where you can define environment variables for your machine. Environment variables can be used to configure your application at runtime.

```yaml
machine:
  env:
    - name: TARGET
      value: John Connor
    - name: MISSION
      value: KILL
    - name: CRITICALITY
      value: P0
```

### Volumes

This is where you can define what volumes should be mounted into your machine and where.

| Properties | Description                                                   |
| ---------- | ------------------------------------------------------------- |
| `name`     | The name of the volume.                                       |
| `path`     | The path where the volume will be mounted inside the machine. |

```yaml title="robot.lttle.yaml"
machine:
  volume:
    - name: historical-data
      path: /data/historical-data
    - name: memories
      path: /data/memories
```

In order to use these volumes in your machine, you will need to create them which be found in the [Volumes](./volumes.md) documentation.

:::warning

If you attach a volume to a machine, you must ensure that the volume is created because the machine will stay on a pending state until the volume is provisioned & ready.

::::

### Command

What command to execute on the provided image. If none is specified, the default command will be used.

```yaml title="robot.lttle.yaml"
machine:
  command:
    - execute
    - --mission
```
