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

docsURL="https://"$(lttle deploy --eval "git.ref == 'main' ? 'docs.lttle.aifrim.com' : 'docs-' + env.GITHUB_HEAD_REF.toSlug()  + '-lttle-aifrim.eu.lttle.host'")
namespace="docs-"$(lttle deploy --eval "git.ref == 'main' ? 'main' : env.GITHUB_HEAD_REF.toSlug() + '-branch'")

isUp "$namespace" "nginx-docs" "$docsURL" 300 1