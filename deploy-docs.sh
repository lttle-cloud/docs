#!/bin/bash

set -e

echo "Building the lttle-docs image..."
docker build -f ./docker/dockerfile . -t aifrim/lttle-docs:latest

echo "Pushing the images to Docker Hub..."
docker push aifrim/lttle-docs:latest

echo "Deploying only the nginx-docs"
lttle deploy ./lttle/docs.lttle.yaml