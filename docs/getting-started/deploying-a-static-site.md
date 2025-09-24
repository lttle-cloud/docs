---
sidebar_position: 3
---

# Deploying a static site

This guide walks you through deploying a simple static website on lttle.cloud, from basic setup to adding flash mode for cost-efficient serverless hosting.

## Prerequisites

- lttle CLI installed and configured ([Installation guide](./installing-the-cli.md))
- Basic familiarity with YAML configuration

## Getting Started

Let's start by creating a simple static site using a pre-built nginx image, then enhance it with lttle.cloud's features.

### Create your project

First, create a new directory for your project:

```bash
mkdir my-static-site
cd my-static-site
```

### Create the deployment configuration

Create a `lttle.yaml` file with a basic app configuration:

```yaml title="lttle.yaml"
app:
  name: hello-lttle
  image: nginx:latest
  resources:
    cpu: 1
    memory: 128
  expose:
    public:
      port: 80
      external:
        protocol: https
```

This creates an app that:
- Uses the official nginx image from Docker Hub
- Allocates 1 CPU core and 128MB of memory
- Runs nginx with its default configuration (serves nginx welcome page)
- Exposes port 80 externally via HTTPS with an auto-generated domain

The `expose` configuration:
- **public** - Names this service endpoint (you can have multiple endpoints)
- **port: 80** - The port nginx listens on inside the container
- **external** - Makes the service accessible from the internet
- **protocol: https** - Automatically provides SSL/TLS encryption

lttle.cloud will automatically generate a domain like `hello-lttle--public--yourtenantname.eu.lttle.host` for your app.

### Deploy your site

Deploy the app to lttle.cloud:

```bash
lttle deploy
```

You should see output similar to:
```
→ Successfully deployed app: default/hello-lttle
```

### Check deployment status

Monitor your machine's status with:

```bash
lttle machine ls
```

Wait for the machine to reach the `ready` state:
```
NAME          NAMESPACE   IMAGE          STATUS   CPU   MEMORY
hello-lttle   default     nginx:latest   ready    1     128
```

### Access your site

Get the URL for your deployed app:

```bash
lttle app get hello-lttle
```

This will show your app details including any exposed services. Open the provided URL in your browser to see the nginx welcome page.

## Adding Flash Mode

Now let's enhance your site with flash mode, which automatically suspends the machine when not in use, saving costs while providing instant wake-up on incoming requests.

### Update your configuration

Modify your `lttle.yaml` to include flash mode:

```yaml title="lttle.yaml"
app:
  name: hello-lttle
  image: nginx:latest
  resources:
    cpu: 1
    memory: 128
  expose:
    public:
      port: 80
      external:
        protocol: https
  mode: 
    flash:
      strategy:
        listen-on-port: 80
      timeout: 2
```

The configuration now includes:

**Flash mode settings:**
- **strategy: listen-on-port: 80** - Suspends the machine after nginx starts listening on port 80
- **timeout: 2** - Suspends the machine 2 seconds after the last connection ends

**Service exposure:**
- **public** service endpoint exposes port 80 via HTTPS
- Automatically provides SSL/TLS encryption and domain generation

For more details about flash mode, see [Machines > Mode](../resources/machines.mdx#mode).

### Redeploy with flash mode

Deploy the updated configuration:

```bash
lttle deploy
```

### Observe flash mode behavior

Check the machine status:

```bash
lttle machine ls
```

You'll see the machine go through these states:
1. `ready` - Machine is running
2. `suspending` - Creating a snapshot
3. `suspended` - Machine is suspended

Now open your site URL in the browser. The machine will automatically wake up from suspended state to serve your request!

## Adding Custom Content

Let's replace the default nginx page with custom content and use lttle.cloud's automatic building.

### Create your content

Create an `index.html` file in your project directory:

```html title="index.html"
<!DOCTYPE html>
<html>
<head>
    <title>Hello lttle.cloud</title>
</head>
<body>
    <h1>Hello, lttle.cloud!</h1>
    <p>This is my static site running on lttle.cloud</p>
</body>
</html>
```

### Switch to automatic building

Update your `lttle.yaml` to use automatic building instead of the pre-built nginx image:

```yaml title="lttle.yaml"
app:
  name: hello-lttle
  build: auto
  resources:
    cpu: 1
    memory: 128
  expose:
    public:
      port: 80
      external:
        protocol: https
  mode: 
    flash:
      strategy:
        listen-on-port: 80
      timeout: 2
```

The `build: auto` configuration tells lttle.cloud to:
1. Automatically detect your project type (static files)
2. Build an appropriate container image automatically
3. Push the image to lttle.cloud's registry
4. Deploy using the built image

For more information about building, see [Building & Deploying > Building](../building-and-deploying/building.md).

### Deploy your custom site

Deploy with automatic building:

```bash
lttle deploy
```

You'll see build output:
```
→ Building image for default/hello-lttle
→ Auto-build using providers: staticfile
→ Pushing image for default/hello-lttle → registry.lttle.cloud/tenant/hello-lttle:abc123
→ Successfully built and pushed image for default/hello-lttle
→ Successfully deployed app: default/hello-lttle
```

### Test your custom site

Check the machine status:

```bash
lttle machine ls
```

Once the machine reaches `suspended` state, open your site URL in the browser. You should now see your custom "Hello, lttle.cloud!" page instead of the nginx welcome page.

## What's Next?

You've successfully deployed a static site with:
- ✅ Automatic image building from static files
- ✅ Flash mode for cost-efficient serverless hosting  
- ✅ Custom content served by nginx

### Explore More Features

- **Add a custom domain**: Set a custom `host` in your app's [expose external](../resources/apps.mdx#expose-external) configuration
- **Add HTTPS**: Set up [certificates](../resources/certificates.mdx) for secure connections
- **Build from source**: Learn about [advanced building options](../building-and-deploying/building.md)

### Project Structure

Your final project structure should look like:

```
my-static-site/
├── lttle.yaml
└── index.html
```

The `lttle.yaml` file defines your infrastructure, while `index.html` contains your site content. lttle.cloud automatically builds everything into a deployable container image.
