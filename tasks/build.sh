#!/usr/bin/env bash

set -euxo pipefail

npm set //npm.pkg.github.com/:_authToken ${GITHUB_TOKEN}
yarn install --silent
yarn typecheck
yarn build
yarn lint
yarn test
