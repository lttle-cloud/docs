#!/bin/bash

set -e

echo "Building the lttle-docs image..."
docker build -f ./docker/dockerfile . -t aifrim/lttle-docs:latest

echo "Pushing the images to Docker Hub..."
docker push aifrim/lttle-docs:latest

echo "Building the Typesense Scraper image..."
docker build -f ./docker/typesense-scraper.dockerfile docker -t aifrim/typesense-scraper:latest

docker push aifrim/typesense-scraper:latest

echo "Deploying to lttle.cloud..."
lttle deploy ./lttle

# Restarting the machines to always make sure that new changes are picked up (e.g. env vars)
# TODO: Check wether this is still the case with @laurci
echo "Restarting the machines..."
lttle machine restart --ns docs nginx-docs
lttle machine restart --ns docs typesense-search
lttle machine restart --ns docs typesense-scraper