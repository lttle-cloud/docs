---
sidebar_position: 4
---

# Deploying an existing app

This guide shows you how to deploy an existing application to lttle.cloud using the automatic initialization tool.

## Prerequisites

- lttle CLI installed and configured ([Installation guide](./installing-the-cli.md))
- An existing application or project directory

## Quick Start

### Navigate to your application

Go to your existing application directory:

```bash
cd my-existing-app
```

### Initialize lttle.cloud configuration

Run the initialization command:

```bash
lttle gadget init
```

The `gadget init` command will:
- Automatically detect your application type and framework
- Generate appropriate lttle.cloud configuration files
- Provide deployment instructions specific to your project

### Follow the initialization output

The command will analyze your project and provide tailored instructions. Common scenarios include:

**For web applications:**
- Detects package managers (npm, yarn, pnpm)
- Identifies frameworks (Next.js, React, Vue, etc.)
- Generates app configuration with appropriate build settings

**For API servers:**
- Detects runtime (Node.js, Python, Go, etc.)
- Configures appropriate ports and health checks
- Sets up service exposure

**For static sites:**
- Identifies static content
- Configures nginx or appropriate server
- Sets up automatic building

### Deploy your application

After `gadget init` completes, deploy using:

```bash
lttle deploy
```

## What `gadget init` creates

The initialization process typically generates:

- **`lttle.yaml`** - Main deployment configuration
- **`.lttle/`** - Directory with additional configuration files (if needed)
- **Build configuration** - Automatic detection of build requirements

## Customizing the configuration

After initialization, you can modify the generated `lttle.yaml` to:

- Adjust resource allocation (CPU, memory)
- Configure environment variables
- Set up custom domains
- Add flash mode for cost efficiency
- Configure dependencies

For detailed configuration options, see:
- [Apps configuration](../resources/apps.mdx)
- [Building options](../building-and-deploying/building.md)

## Troubleshooting

**No compatible framework detected:**
- The tool may not recognize your specific setup
- Manually create a `lttle.yaml` file based on the [apps documentation](../resources/apps.mdx)

**Build errors during deployment:**
- Check the generated build configuration
- See [Building troubleshooting](../building-and-deploying/building.md#troubleshooting)

**Port configuration issues:**
- Verify your application listens on the correct port
- Update the `expose` configuration in `lttle.yaml`

## What's next?

Once your app is deployed:
- **Monitor status**: Use `lttle machine ls` to check deployment status
- **View logs**: Use `lttle machine logs <app-name>` for debugging
- **Scale resources**: Adjust CPU/memory in your configuration
- **Add custom domain**: Configure a [custom domain](../resources/apps.mdx#using-custom-domains)
