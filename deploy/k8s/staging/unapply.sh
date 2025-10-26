#!/usr/bin/bash

set -e
source .env
kubectl --kubeconfig kubeconfig.yaml delete -k ./
