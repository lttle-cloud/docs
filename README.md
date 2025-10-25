# lttle.cloud | Documentation

To get started with contributing to the lttle documentation, follow the instructions below. If you just want to read the documentation, you can visit the [lttle Documentation Website](https://docs.lttle.cloud/).

This documentation website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Prerequisites

- Node.js (version 18 or higher)
- Docker (for local development with TypeSense & TypeSense Scraper)

## Installation

Just run:

```bash
npm install
```

And you are good to go.

## Local Development

TypeSense server needs to be started alongside the documentation website for the search functionality to work. This can be done using Docker Compose. The TypeSense Scraper will try to index the documentation website on startup, but fail silently if the website is not yet available. No need to worry about that. More details about the scraper can be found in the [Searchable documentation](#searchable-documentation) section.

Start the Docker containers:

```bash
docker compose up -d
```

Run the local development server:

```bash
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server. For more information about Docusaurus, check out the [Docusaurus documentation](https://docusaurus.io/docs).

## Build

To create a local build with local configuration, run:

```bash
npm run build
```

To create a production build with production configuration, run:

```bash
npm run build:prod
```

These commands generates static content into the `build` directory and can be served using any static contents hosting service.

Once the build is complete, you can preview it locally by running:

```bash
npm run serve
```

## Searchable documentation

This documentation site is integrated with [TypeSense](https://typesense.org/) to provide a fast and relevant search experience. The search index is automatically updated whenever the documentation is built.

The documentation website is scraped by a [TypeSense DocScraper](https://typesense.org/docs/guide/docsearch.html#step-1-set-up-docsearch-scraper) that runs in a separate container alongside the documentation website.

This scraper needs to be **manually triggered** to re-scrape the documentation website whenever there are significant changes to the content. This can be done by restarting the scraper container.

Once the scraper has finished its job, the TypeSense server will have an up-to-date index of the documentation content, which can be searched using the search bar in the top right corner of the website. You may also see changes to the `./docker/typesense-scraper-config.json` file, which contains the configuration for the scraper. The `nbHits` field in this file indicates the number of documents indexed by TypeSense.

You can run local scraping using:

```bash
npm run scrape
```

Or by restarting the scraper container:

```bash
docker compose restart typesense-scraper
```

### Production Scraper Configuration

Note, for production deployments, the scraper is configured with the `typesense-scraper.production.config.json` file, which is located in the `./docker` directory.

## Deployment

By default, the documentation website is configured to be deployed using [Lttle](https://lttle.cloud/), a serverless platform for deploying applications and services. The deployment configuration is defined in the `lttle` directory.

Check the [Deployment Guide](./DEPLOYMENT.md) for more details.

## Testing

For more details, check the [Testing Guide](./TESTING.md).
