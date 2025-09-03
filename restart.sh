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

namespace="docs-"$(lttle deploy --eval "git.ref == 'main' ? 'main' : env.GITHUB_HEAD_REF.toSlug() + '-branch'");

what="$1"

if [[ "$what" == "scraper" ]]; then
    echo "Restarting typesense-scraper in namespace $namespace"
    lttle machine restart --ns $namespace typesense-scraper
elif [[ "$what" == "docs" ]]; then
    echo "Restarting nginx-docs in namespace $namespace"
    lttle machine restart --ns $namespace nginx-docs
elif [[ "$what" == "search" ]]; then
    echo "Restarting typesense-search in namespace $namespace"
    lttle machine restart --ns $namespace typesense-search
else
    restartMachines "$namespace"
fi