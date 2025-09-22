<!-- # Deploying a static site

In this exercise we will be deploying a simple [Astro](https://astro.build/) project using [Nginx](https://nginx.org/) to serve the static files. You can find it in our [GitHub samples repository](https://github.com/lttle-cloud/samples/tree/main/static-site).

Please make sure you have Node.js installed and Docker installed. We will be deploying a lttle machine that will serve outbound traffic via a lttle service.

Superficially a machine can be viewed as a container that runs somewhere in the lttle.cloud infrastructure and a service relates to traffic management and routing.

## Creating an Astro Project

To deploy a static site, you will need to have the CLI installed and be authenticated. If you haven't done that yet, please follow the previous steps: [Installing the CLI](./installing-the-cli.md) and [Authentication](./authentication.md).

In this exercise we will be deploying a simple [Astro](https://astro.build/) project. If you don't have an Astro project ready, you can create one quickly by following the [Astro documentation](https://astro.build/docs).

```bash npm2yarn
npm create astro@latest
```

Do any changes you would like to the newly generated Astro project, such as adding components, pages, or styles. Once you are satisfied with your changes, you can deploy your static site follow the next steps.

## Setting up your Code Editor / IDE

All lttle resources are defined using YAML files. To get started, we have prepared a YAML schema to facilitate resource creation. You can find it here: [resources.json](https://raw.githubusercontent.com/lttle-cloud/ignition/refs/heads/master/schemas/resources.json) or you can directly reference it via: [resources.lttle.sh](https://resources.lttle.sh).

To make working with YAML files easier, you can set up your code editor or IDE with the following extensions:

### Visual Studio Code

Install the [YAML Language Support from RedHat](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml) extension for better YAML syntax highlighting and validation.

Create in the `.vscode` folder a `settings.json`, file with the following content:

```json
{
  "yaml.schemas": {
    "https://resources.lttle.sh": "/*.lttle.yaml"
  }
}
```

This will also work for Visual Studio Code spinoffs like **Cursor**.

### Other Editors / IDEs

Check your editors documentation on how to add schema definitions for YAML files.

## Creating your first deployment

In order to deploy our statically generated Astro project, we need:

1. Create an Nginx configuration file
2. Create a Dockerfile that will contain our static site and Nginx
3. Push the Docker image to a container registry
4. Create a machine resource to run our Docker container
5. Create a service resource to route traffic to our machine
6. Deploy the machine and the service to lttle.cloud

### Configuring Nginx

Create a file called `nginx.conf` in the root of your project with the following content:

```nginx title="nginx.conf"
server {
  listen 80;
  server_name _;

  location / {
    root /usr/share/nginx/html;
    index index.html;

    try_files $uri $uri/index.html =404;

    # Since we are serving static files, we can enable gzip compression
    # We will be pre-compressing our static files since we care about cpu-cost
    gzip_static on;
    gzip_comp_level 6;
  }

  # Custom 404 page
  error_page 404 /404.html;
  location = /404.html {
    internal;
  }
}
```

### Building & Pushing the Docker Image

First we need to create a `Dockerfile` where we will be putting our static site:

```Dockerfile title="Dockerfile"
FROM node:22.19.0-alpine3.22 AS build

WORKDIR /build

COPY . .

RUN npm install --frozen-lockfile

RUN npm run build

# Compress all build files with gzip
# But keep original files
RUN cd /build/build && find . -type f -exec gzip -9 -k \{\} \;

FROM nginx:1.29.1-alpine3.22

COPY --from=build /build/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
```

Then we need to build and push the Docker image.

```sh
docker build . -t "<docker-username>/static-site:latest"
docker push "<docker-username>/static-site:latest"
```

### Creating your first machine

In order to deploy our simple Astro project, we need to create a machine resource. Create a file called `machine.lttle.yaml` in the root of your project with the following content:

```yaml title="static-site.lttle.yaml"
machine:
  namespace: static-site
  name: nginx
  image: ${{ var.docker_username }}/static-site:latest
  resources:
    # The smallest number of CPUs we can actually have
    cpu: 1
    # The smallest amount of memory we can actually have
    memory: 64
  mode:
    # This tells lttle.cloud that 5 seconds after nginx starts listening
    # we can stop the machine if it is not receiving any traffic
    flash:
      timeout: 5
      strategy:
        listen-on-port: 80
```

You can read more about the [machine resource](../resources/machines.mdx).

### Creating your first service

We need to have a service that it will tell lttle.cloud how to route traffic to our machine. Create a file called `service.lttle.yaml` in the root of your project with the following content:

```yaml title="service.lttle.yaml"
service:
  namespace: static-site
  name: ingress
  # This service will target our nginx machine
  # And it tell lttle.cloud to route traffic to it
  target:
    name: nginx
    port: 80
    protocol: http
    # This tell lttle.cloud to snapshot the machine
    # when the machine has no active connections
    connection-tracking: connection-aware
  bind:
    external:
      # This is where the service will be available
      host: lttle-demo-static-site-${{ var.docker_username }}.eu.lttle.host
      protocol: https
```

More about [services](../resources/services.mdx).

:::info HTTPS

All subdomains of `eu.lttle.host` are covered by our wildcard certificate.
::::

### Deploying to lttle.cloud

Now that we have our machine and service resources defined, we can deploy them to lttle.cloud.

Run the following command to deploy the machine:

```bash
lttle deploy ./static-site.lttle.yaml --var docker_username="<docker-username>"
```

You will see this output underlining the details of your current deployment:

```text
 Successfully deployed machine: static-site/nginx
                       name: nginx
                  namespace: static-site
                     status: pulling-image
                       mode: flash
          snapshot strategy: listen on port 80
            suspend timeout: 5s
                      image: docker.io/<docker-username>/static-site:latest
                       cpus: 1
                     memory: 64 MiB
```

Now, we run the following command to deploy the service:

```bash
lttle deploy ./service.lttle.yaml --var docker_username="<docker-username>"
```

And you will get this output:

```text
  Successfully deployed service: static-site/ingress
                 name: ingress
            namespace: static-site
                 mode: external
               target: static-site/nginx
          target port: 80
                 host: my-static-site-eu.lttle.host
           service ip: 10.1.136.41
                route: :443 (https) → :80 (http)
  connection tracking: connection aware
```

:::info Deploy command output

The command outputs more information about the deployment process, we only included the most relevant parts here.

:::

## Seeing your deployment in action

Once your deployment is complete, you can visit `https://static-site-<docker-username>.eu.lttle.host` in your web browser to see your static site in action. It may take a moment for the site to become available.

To see the details of your deployment in the CLI you can run the following command:

```bash
lttle machine get --namespace static-site nginx
```

Or you could visit the [lttle.cloud | Web Console](https://console.eu.lttle.host/) to see your deployment and its details.

:::info Delay

Right now there is a bit of a delay after your machine is ready or suspended.

:::

## Final notes

In this example we have deployed a static Astro site using Nginx machine. We have attached a service to that machine that routes traffic to and from it.

We have specified that the machine should be in [flash mode](../resources/machines.mdx#flash-mode) with a timeout of 5 seconds and that the service should be [connection-aware](../resources/services.mdx#connection-aware) of the it's target (the machine).

The result of this means that the machine will be snapshotted and suspended 5 seconds after Nginx starts listening on port 80 if there is no active connection to it. When a request comes in, the machine will be resumed from the snapshot and will start serving traffic until, again, there are no active connections to it, then the machine will be re-snapshotted and suspended immediately.

This is the main functionality of lttle.cloud and it allows you to run your workloads in a cost efficient manner. For a more detailed explanation of the machine states and lifecycle, please check [Machine State Lifecycle](../resources/machines.mdx#state-lifecycle).

## More scenarios

If you want to deploy more complex applications we have prepared additional [guides & samples](../guides-and-samples/index.md) and dynamic templates via the lttle new. -->
