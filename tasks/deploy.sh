#!/usr/bin/env bash

set -euxo pipefail

get_cfn_output() {
    echo $(aws cloudformation describe-stacks --stack-name ${CFN_STACK_NAME} --query "Stacks[0].Outputs[?OutputKey==\`${1}\`].OutputValue" --output text)
}

get_config_json() {
    echo $(jq -n --arg ApiUrl "${1}" '{API_URL: $ApiUrl}')
}

yarn deploy

BUCKET_NAME=$(get_cfn_output BucketName)
API_URL=$(get_cfn_output ApiUrl)
CONFIG_JSON=$(get_config_json ${API_URL})

echo ${CONFIG_JSON} | aws s3 cp - s3://${BUCKET_NAME}/config.json

