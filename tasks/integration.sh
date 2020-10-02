#!/usr/bin/env bash

set -euxo pipefail

echo ${DYNAMODB_URL}
yarn test:integration
