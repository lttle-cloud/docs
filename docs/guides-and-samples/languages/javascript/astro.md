# Astro

In this exercise we will be deploying a simple [Astro](https://astro.build/) project using [Nginx](https://nginx.org/) to serve the static files. You can find it in our [GitHub Samples](https://github.com/lttle-cloud/samples/tree/main/astro). We will be configuring an Nginx server to serve pre-compressed astro generated static files.

Please make sure you have [Node.js](https://nodejs.org/) installed and [Docker](https://docker.com/) installed.

## Creating an Astro Project

To deploy a static site, you will need to have the CLI installed and be authenticated. If you haven't done that yet, please follow the previous steps: [Installing the CLI](../../../getting-started/installing-the-cli.md) and [Authentication](../../../getting-started/authentication.md).

In this exercise we will be deploying a simple [Astro](https://astro.build/) project. If you don't have an Astro project ready, you can create one quickly by following the [Astro documentation](https://astro.build/docs).

```bash npm2yarn
npm create astro@latest
```

Do any changes you would like to the newly generated Astro project, such as adding components, pages, or styles. Once you are satisfied with your changes, you can deploy your static site follow the next steps.

## Configuring Nginx

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

## Creating the Docker Image

First we need to create a `dockerfile` where we will be putting our static site:

```Dockerfile title="dockerfile"
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

:::info Note

You can build & push the Docker image to a container registry of your choice and use that image both for deploying as an App or as a Machine.

:::

## Configuring the App

You can deploy your static site as an [App](../../../resources/apps.mdx) by using a built & configured nginx image that will serve your static files.

Create a file called `lttle.yaml` in the root of your project with the following content:

```yaml title="astro.lttle.yaml"
app:
  name: astro
  namespace: samples
  mode:
    flash:
      strategy: first-listen
  build:
    docker:
      context: .
      dockerfile: dockerfile
  resources:
    cpu: 1
    memory: 64
  expose:
    public:
      port: 80
      external:
        protocol: https
```

### Deploying the App

To deploy the app, run the following command in the root of your project:

```bash
lttle deploy astro.lttle.yaml
```

Once the deployment is complete you can get the URL of your static site by running:

```bash
lttle app get --ns samples astro
```

And you should see an output similar to this:

```plaintext
Building and pushing image for samples/astro
Built image eu.registry.lttle.cloud/$(tenant}/fd087015-33d0-413c-bd3f-7be089f80f10:latest
Pushing image eu.registry.lttle.cloud/$(tenant}/fd087015-33d0-413c-bd3f-7be089f80f10:latest
Pushed image for samples/astro → eu.registry.lttle.cloud/$(tenant}/fd087015-33d0-413c-bd3f-7be089f80f10:latest
Successfully deployed app: samples/astro
```

### Getting the App URL

To get the URL of your deployed app, run the following command:

```bash
lttle app get --ns samples astro
```

You should see an output similar to this:

```plaintext
               name: astro
          namespace: samples
          ... other fields ...
           services: public: https://astro--samples--public--your-tenant.eu.lttle.host → :80
```

To preview our Astro static-site deployment you can open [https://astro--samples--public--aifrim.eu.lttle.host/](https://astro--samples--public--aifrim.eu.lttle.host/) in your browser.

:::info Tenant

In the above output, replace `$(tenant)` with your actual tenant ID.

:::
