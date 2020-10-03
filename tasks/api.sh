#!/usr/bin/env bash

set -euxo pipefail

pushd ./packages/api
yarn dev
popd