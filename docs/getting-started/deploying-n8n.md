---
sidebar_position: 5
---

# Deploying n8n Community Edition

Deploy n8n workflow automation on lttle.cloud in minutes using a pre-configured setup.

## Prerequisites

- Active lttle.cloud account ([sign up for free](https://lttle.cloud/))
- lttle CLI installed and configured ([Installation guide](./installing-the-cli.md))

## Quick Deployment

### 1. Download the configuration

```bash
curl -o n8n.yaml https://raw.githubusercontent.com/lttle-cloud/ignition/refs/heads/master/demos/n8n.yaml
```

### 2. Deploy to lttle.cloud

```bash
lttle deploy ./n8n.yaml
```

### 3. Monitor deployment status

Wait for the machine to reach "ready" or "suspended" state:

```bash
lttle machine ls --ns n8n
```

Keep running this command until you see the status change to "ready" or "suspended".

### 4. Get your n8n URL

Once ready, get your public URL:

```bash
lttle query "'https://' + service('n8n-public', 'n8n').bind.external.host"
```

### 5. Access n8n

Open the URL from step 4 in your browser and start building workflows!

## What you get

Your n8n instance includes:
- **Persistent storage** - Workflows and data are preserved
- **HTTPS encryption** - Secure access out of the box
- **Auto-generated domain** - No DNS configuration needed
- **Serverless** - Suspends when not in use to save costs. For more information, see [Machines > Mode](../resources/machines.mdx#mode).

## Next steps

Once n8n is running:
- Create your first workflow
- Connect to external services and APIs
- Set up webhooks for automation
- Explore n8n's extensive node library

## Troubleshooting

**Cannot access the URL:**
- Ensure the machine status is "ready" or "suspended"
- Try the query command again to get the latest URL

**Need to customize the setup:**
- Download and modify the `n8n.yaml` configuration file
- See [Apps configuration](../resources/apps.mdx) for available options
