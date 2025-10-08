---
sidebar_position: 4
---

# Deploying a static site

This guide walks you through deploying a simple static website with [Nginx](https://nginx.org/) on [lttle.cloud](https://lttle.cloud), from basic setup to adding flash mode for cost-efficient serverless hosting.

The focus of this exercise if to get you familiar with lttle.cloud's features and workflows.
:::tip

If you want to skip the explanations, you can find the complete final example in our [GitHub Samples &raquo; Nginx](https://github.com/lttle-cloud/samples/tree/main/nginx) or you can follow the [Nginx](../guides-and-samples/software/nginx.md) guide.

:::

---

This guide is comprised of 4 main steps:

1. [Default Nginx deployment](#default-nginx-deployment) - where we will deploy the default Nginx Docker image as-is.
2. [Auto building](#auto-building) - where we will create a custom static site and use lttle.cloud's automated build and deploy feature to deploy it.
3. [Building & Deploying a dedicated Nginx Docker image](#building--deploying-a-dedicated-nginx-docker-image) - where we will build a custom Docker image with our static site and deploy it.
4. [Making our deployments serverless](#making-our-deployments-serverless) - where we will convert our deployments to use flash mode for cost-efficient serverless hosting.

---

## Default Nginx deployment

### Creating the deployment configuration

Create a file named `nginx-default.lttle.yaml` with the following content:

```yaml title="nginx-default.lttle.yaml" {4}
app:
  name: nginx-default
  namespace: samples
  image: nginx:latest
  resources:
    cpu: 1
    memory: 64
  expose:
    public:
      port: 80
      external:
        protocol: https
```

We have

- Defined an [app](../resources/apps.mdx) resource (that is a combination nf [machines](../resources/machines.mdx) and [services](../resources/services.mdx)) to manage our application within the `samples` [namespace](../building-and-deploying/namespaces.md).
- Specified the use of the latest official Nginx Docker image.
- Allocated `1` CPU Core and `64` MiB of memory to the application.
- Configured the application to be accessible via HTTPS and route traffic to port `80` of the Nginx server.

### Deploying the application

To deploy the application, run the following command in the directory where you created the `nginx-default.lttle.yaml` file:

```plaintext command="lttle deploy nginx-default.lttle.yaml"
// lttle-good-output-next-line
Successfully deployed app: samples/nginx-default
```

### Checking the deployment

After the deployment is complete, you can check the status of your application by running:

```plaintext command="lttle app get --ns samples nginx-default" {3,7}
               name: nginx-default
          namespace: samples
               mode: regular
              image: nginx:latest
               cpus: 1
             memory: 64 MiB
           services: public: https://nginx-default--samples--public--your-tenant.eu.lttle.host → :80
```

:::warning

The machine will be deployed with a `regular` mode by default, meaning that it will be continuously running and you will be charged for the compute resources even if there is no traffic.

:::

To make sure that our machine is ready, run:

```plaintext command="lttle machine get --ns samples nginx-default" {3,7}
                       name: nginx-default
                  namespace: samples
                     status: ready
                       mode: regular
                      image: docker.io/library/nginx:latest@sha256...
                       cpus: 1
                     memory: 64 MiB
```

To know more about machine statuses, check the [Machines &raquo; State Lifecycle](../resources/machines.mdx#state-lifecycle) documentation.

When the machine reaches its ready state, you can access your Nginx server by navigating to the URL provided in the `services` section of the output. Replace `your-tenant` with your actual tenant name.

Meanwhile you can check our deployment: [https://nginx-default--samples--public--your-tenant.eu.lttle.host/](https://nginx-default--samples--public--your-tenant.eu.lttle.host/) or you can check it out from our [GitHub Samples &raquo; Nginx &raquo; Default](https://github.com/lttle-cloud/samples/tree/main/nginx/default).

:::note

Right now, the default Nginx Docker image does not include any custom configuration or content. It will serve the default Nginx welcome page.

:::

## Auto building

### Creating something to deploy

To customize our Nginx deployment, we can use our automated build and deploy feature. This will allow you to build a custom Docker image from a source directory and deploy it to lttle.cloud in one step.

Create a file named `index.html` with the following content:

```bash
echo "Hello from Nginx via lttle.cloud! (custom build auto)" > index.html
```

### Creating the auto build & deployment configuration

After that, create a file named `nginx-custom-build-auto.lttle.yaml` with the following content:

```yaml title="nginx-custom-build-auto.lttle.yaml" {4}
app:
  name: nginx-custom-build-auto
  namespace: samples
  build: auto
  resources:
    cpu: 1
    memory: 64
  expose:
    public:
      port: 80
      external:
        protocol: https
```

:::note Builds

Note the change from `image: nginx:latest` to `build: auto`. This instructs lttle.cloud to automatically build a Docker image from the contents of the current directory, push that image to its internal registry, and deploy it.

:::

### Building and Deploying the application {#auto-building-and-deploying-the-application}

Building & Deploying happens in one step. To do that run the following command:

```plaintext command="lttle deploy nginx-custom-build-auto.lttle.yaml"
// lttle-green-output-next-line
Building and pushing image for samples/nginx-custom-build-auto
// highlight-next-line
// lttle-green-output-next-line
Auto-build using providers: staticfile
// lttle-green-output-next-line
Built image eu.registry.lttle.cloud/your-tenant/c6112699-6cea-4454-8dd8-be4b27ac6e6a:latest
// lttle-green-output-next-line
Pushing image eu.registry.lttle.cloud/your-tenant/c6112699-6cea-4454-8dd8-be4b27ac6e6a:latest
// lttle-green-output-next-line
Pushed image for samples/nginx-custom-build-auto → eu.registry.lttle.cloud/your-tenant/c6112699-6cea-4454-8dd8-be4b27ac6e6a:latest
// lttle-good-output-next-line
Successfully deployed app: samples/nginx-custom-build-auto
```

What happens here is:

- The automated build processes detected the presence of an `index.html` file and used the `staticfile` build provider to create a Docker image with Nginx serving that file.
- The built image is then pushed to lttle.cloud's internal container registry.
- Finally, the application is deployed using the newly built image.

To know more about the building & build providers, check the [Building & Deploying &raquo; Building](../building-and-deploying/building.md).

### Checking the deployment {#checking-the-deployment-build-auto}

```plaintext command="lttle app get --ns samples nginx-custom-build-auto" {3,9}
               name: nginx-custom-build-auto
          namespace: samples
               mode: regular
  snapshot strategy: listen on port 80
    suspend timeout: 10s
              image: eu.registry.lttle.cloud/your-tenant/c6112699-6cea-4454-8dd8-be4b27ac6e6a:latest
               cpus: 1
             memory: 64 MiB
           services: public: https://nginx-custom-build-auto--samples--public--your-tenant.eu.lttle.host → :80
```

To know more about machine statuses, check the [Machines » State Lifecycle documentation](../resources/machines#state-lifecycle).

When the machine reaches its ready state, you can access your Nginx server by navigating to the URL provided in the services section of the output. Replace your-tenant with your actual tenant name.

Meanwhile you can check our deployment: [https://nginx-default--samples--public--your-tenant.eu.lttle.host/](https://nginx-default--samples--public--your-tenant.eu.lttle.host/) or you can check it out from our [GitHub Samples &raquo; Nginx &raquo; Custom with Automated Build](https://github.com/lttle-cloud/samples/tree/main/nginx/custom-build-auto).

## Building & Deploying a dedicated Nginx Docker image

This part only serves to illustrate how you can build and deploy a custom Docker image. For a more in-depth guides:

- Check the [Building & Deploying &raquo; Building](../building-and-deploying/building.md) documentation to learn more about building.
- Check the [Nginx](../guides-and-samples/software/nginx.md) guide to learn more about deploying Nginx.

Here we will be using the same `index.html` file we created in the [previous step](#creating-something-to-deploy).

### Creating a Dockerfile

```dockerfile
FROM nginx:latest

COPY index.html /usr/share/nginx/html/
```

### Building & Deploying the application

```plaintext command="lttle deploy nginx-custom-dockerfile.lttle.yaml"
// lttle-green-output-next-line
Building and pushing image for samples/nginx-custom-dockerfile
// lttle-green-output-next-line
Built image eu.registry.lttle.cloud/your-tenant/0e9c0cc0-f046-455a-a4f6-d4e5afc80fd6:latest
// lttle-green-output-next-line
Pushing image eu.registry.lttle.cloud/your-tenant/0e9c0cc0-f046-455a-a4f6-d4e5afc80fd6:latest
// lttle-green-output-next-line
Pushed image for samples/nginx-custom-dockerfile → eu.registry.lttle.cloud/your-tenant/0e9c0cc0-f046-455a-a4f6-d4e5afc80fd6:latest
// lttle-good-output-next-line
Successfully deployed app: samples/nginx-custom-dockerfile
```

### Checking the deployment {#checking-the-deployment-dockerfile}

```plaintext command="lttle app get --ns samples nginx-custom-dockerfile" {3,7}
               name: nginx-custom-dockerfile
          namespace: samples
               mode: regular
              image: eu.registry.lttle.cloud/your-tenant/0e9c0cc0-f046-455a-a4f6-d4e5afc80fd6:latest
               cpus: 1
             memory: 64 MiB
           services: public: https://nginx-custom-dockerfile--samples--public--your-tenant.eu.lttle.host → :80
```

## Making our deployments serverless

Here we will convert our previous deployment to use [Machine &raquo; Flash Mode](../resources/machines.mdx#flash-mode) for cost-efficient serverless hosting.

```yaml title="nginx-custom-dockerfile.lttle.yaml" {13-16}
app:
  name: nginx-default
  namespace: samples
  image: nginx:latest
  resources:
    cpu: 1
    memory: 64
  expose:
    public:
      port: 80
      external:
        protocol: https
  mode:
    flash:
      strategy:
        listen-on-port: 80
```

And now we can redeploy it:

```bash
lttle deploy nginx-custom-dockerfile.lttle.yaml
```

This will update the existing deployment to use flash mode. The machine will now start up when it receives traffic and shut down after a period of inactivity, helping you save on compute costs.

To see this in action you can check the machine status:

```plaintext command="lttle machine get --ns samples nginx-custom-dockerfile" {3-4}
                       name: nginx-custom-dockerfile
                  namespace: samples
                     status: suspended
                       mode: flash
          snapshot strategy: listen on port 80
            suspend timeout: 10s
                internal ip: 10.0.127.62
                      image: eu.registry.lttle.cloud/your-tenant/c50a9c1f-932d-48cd-9e9f-c559ebc70426:la...
                       cpus: 1
                     memory: 64 MiB
```

Note that:

- The `mode` has changed to `flash`.
- The `status` is now `suspended`, indicating that the machine is **not currently running**.

And once you will visit the public service URL, the machine will start up in under 10ms and the status will change to `ready`.
