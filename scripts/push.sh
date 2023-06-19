#!/usr/bin/env bash

TAG=$(cat version | xargs)
REGISTRY_TAG="ragibkl/web-bancuh:$TAG"
docker push $REGISTRY_TAG
