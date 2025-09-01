#!/bin/bash

deployDocs() {
    local ns="$1"
    local tag="$2"
    local docsURL="$3"
    local typesenseFQDN="$4"

    echo "Building the aifrim/lttle-docs:$tag image..."
    docker build --build-arg DOCS_URL="$docsURL" --build-arg TYPESENSE_FQDN="$typesenseFQDN" --build-arg TYPESENSE_API_KEY="$TYPESENSE_API_KEY" -f ./docker/dockerfile . -t aifrim/lttle-docs:$tag

    echo "Pushing the aifrim/lttle-docs:$tag image..."
    docker push aifrim/lttle-docs:$tag

    echo "Deploying only the nginx-docs"
    lttle deploy ./lttle/docs.lttle.yaml

    echo "Restarting the machine in namespace $ns..."
    lttle machine restart --ns $ns nginx-docs
}

deployTypeSense() {
    local ns="$1"
    local tag="$2"
    local docsURL="$3"

    if [[ $ns != 'main' ]]; then
        echo "Backing up & patching ./docker/typesense-production.config.json"

        # Need to patch ./docker/typesense-production.config.json to scrape preview environment url
        cp ./docker/typesense-scraper.production.config.json ./docker/typesense-scraper.production.config.json.bak
        jq --arg url "$docsURL" '.start_urls[0].url = $url' ./docker/typesense-scraper.production.config.json.bak > ./docker/typesense-scraper.production.config.json
    fi

    echo "Building the aifrim/typesense-scraper:$tag image..."

    echo "Using config";
    cat ./docker/typesense-scraper.production.config.json

    docker build -f ./docker/typesense-scraper.dockerfile docker -t aifrim/typesense-scraper:$tag

    if [[ $ns != 'main' ]]; then
        echo "Restoring ./docker/typesense-scraper.production.config.json"
        cp ./docker/typesense-scraper.production.config.json.bak ./docker/typesense-scraper.production.config.json
        rm ./docker/typesense-scraper.production.config.json.bak
    fi

    echo "Pushing the aifrim/typesense-scraper:$tag image..."
    docker push aifrim/typesense-scraper:$tag

    echo "Deploying only the typesense-search"
    lttle deploy ./lttle/typesense.lttle.yaml

    restartMachines "$ns"
}

restartMachines() {
    local ns="$1"

    echo "Restarting the machine in namespace $ns..."

    lttle machine restart --ns $ns nginx-docs
    lttle machine restart --ns $ns typesense-search
    lttle machine restart --ns $ns typesense-scraper
}

isUp() {
    local ns="$1"
    local machine="$2"
    local url="$3"
    local timeout="$4"
    local sleepDuration="$5"

    echo "Waiting for $url to be ready..."

    echo "Waiting for machine $machine in namespace $ns to be ready..."

    start=$(date +%s)

    while true; do
        set +e
        lttle machine get --ns "$ns" "$machine" | grep "suspended"  > /dev/null 2>&1
        status=$?
        set -e

        if [ "$status" -eq 0 ]; then
            now=$(date +%s)
            elapsed=$((now - start))

            echo "✅ Machine $machine in namespace $ns is running after $elapsed seconds"
            break
        fi

        echo "⏳ Machine in namespace $ns not ready yet. Retrying in $sleepDuration seconds..."
        sleep $sleepDuration
    done

    start=$(date +%s)

    while true; do
        set +e
        status=$(curl -s -o /dev/null -w "%{http_code}" "$url")
        set -e

        if [ "$status" -eq 200 ]; then
            now=$(date +%s)
            elapsed=$((now - start))

            echo "✅ $url is up (HTTP 200) after $elapsed seconds"
            return 0
        fi

        now=$(date +%s)
        elapsed=$((now - start))

        if [ "$elapsed" -ge "$timeout" ]; then
            echo "❌ Timeout reached ($timeout seconds). $url did not return 200."
            return 1
        fi

        echo "⏳ $url not ready yet (status: $status). Retrying in $sleepDuration seconds..."
        sleep $sleepDuration
    done
}
