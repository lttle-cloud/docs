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

namespace="docs-"$(lttle deploy --eval "git.ref == 'main' ? 'main' : env.GITHUB_HEAD_REF + '-branch'")
tag=$(lttle deploy --eval "git.ref == 'main' ? 'latest' : env.GITHUB_HEAD_REF + '-branch'")

docsURL="https://"$(lttle deploy --eval "git.ref == 'main' ? 'docs.lttle.aifrim.com' : 'docs-' + env.GITHUB_HEAD_REF  + '-lttle-aifrim.eu.lttle.host'")
typesenseFQDN=$(lttle deploy --eval "git.ref == 'main' ? 'docs-search.lttle.aifrim.com' : 'docs-search-' + env.GITHUB_HEAD_REF  + '-lttle-aifrim.eu.lttle.host'")

deployDocs "$namespace" "$tag" "$docsURL" "$typesenseFQDN"
