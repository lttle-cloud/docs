#!/bin/bash

set -e

source ./deploy/utilities.bash

if [[ -f .env.production ]]; then
  export $(xargs < .env.production)
fi

if [ -z "${GITHUB_HEAD_REF+x}" ]; then
  GITHUB_HEAD_REF=$(git rev-parse --abbrev-ref HEAD)
  export GITHUB_HEAD_REF
fi

namespace="docs-"$(lttle deploy --eval "git.ref == 'main' ? 'main' : env.GITHUB_HEAD_REF.toSlug() + '-branch'")

if [ "$namespace" == "docs-main" ]; then
  echo "We do not remove the main documentation"
  exit 1
fi

echo "Removing machines for namespace $namespace"
lttle machine rm --ns "$namespace" nginx-docs -y
lttle machine rm --ns "$namespace" typesense-search -y
lttle machine rm --ns "$namespace" typesense-scraper -y

echo "Removing services for namespace $namespace"
lttle service rm --ns "$namespace" docs-ingress -y
lttle service rm --ns "$namespace" typesense-search-ingress -y
lttle service rm --ns "$namespace" typesense-search-internal -y

echo "Removing volumes for namespace $namespace"
lttle volume rm --ns "$namespace" typesense-search -y

echo "Certificates are not removed"
