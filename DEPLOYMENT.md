# Deployment Guide

To deploy the documentation website, we use [Lttle](https://lttle.cloud/), a serverless platform for deploying applications and services.

The deployment configuration is defined in the `lttle` directory, which contains the necessary configuration files for deploying the website and the TypeSense server.

## Prerequisites

1. The [lttle.cloud CLI](https://lttle.cloud/docs/cli/installation) installed and configured.
2. Docker installed on your local machine.
3. Authentication to the container registry where the Docker images are stored.
4. Authentication to the `lttle` CLI with the appropriate credentials.

## Environment Variables

For local development, you can create a `.env` file in the root of the project to define the necessary environment variables. Here's an example of the variables you might need:

```sh
TYPESENSE_API_KEY=some-api-key
```

For production deployment there are multiple variables needed because we use them to deploy the services on both the production and for preview deployments.

```sh
DOCS_URL=https://path.to.docs.url
TYPESENSE_FQDN=https://path.to.typesense.url
TYPESENSE_API_KEY=some-api-key
```

## Deployment Steps

1. **Build the Docker Images**: Ensure that the Docker images for the documentation website and the TypeSense scraper are built and pushed to a container registry. You can use the following commands:

   ```bash
   docker build -f docker/dockerfile . -t aifrim/lttle-docs:latest
   docker push aifrim/lttle-docs:latest

   docker build -f docker/typesense-scraper.dockerfile docker -t aifrim/typesense-scraper:latest
   docker push aifrim/typesense-scraper:latest
   ```

2. **Deploy the Services**: Use the `lttle` CLI to deploy the services defined in the `lttle` directory. Navigate to the `lttle` directory and run:

   ```bash
   lttle deploy ./lttle
   ```

3. **Restart the Services**: If you need to restart the services, you can use the following command:

   ```bash
   lttle restart --namespace docs --name nginx-docs
   lttle restart --namespace docs --name typesense-search
   lttle restart --namespace docs --name typesense-scraper
   ```

All of these steps have been automated in the `deploy.sh` script, which you can run to perform the deployment:

```bash
./deploy.sh
```

## Only Updating the Documentation Website

If you only need to update the documentation website without redeploying the entire stack, you can use the following command:

First you need to build and push the updated Docker image for the documentation website:

```bash
docker build -f docker/dockerfile . -t aifrim/lttle-docs:latest
docker push aifrim/lttle-docs:latest
```

Then, deploy and restart only the documentation website service:

```bash
lttle deploy ./lttle/nginx-docs.yaml
```

Or you can use the `deploy-docs.sh` script:

```bash
./deploy-docs.sh
```
