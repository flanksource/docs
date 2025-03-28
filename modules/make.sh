#!/bin/bash

set -euo pipefail

# Check if chart name is provided
if [ $# -lt 1 ]; then
  echo "Usage: $0 <chart-name> [helm-args]"
  echo "Example: $0 ./charts/my-chart --namespace default"
  exit 1
fi

CHART_NAME=$1
shift
HELM_ARGS=$@
OUTPUT_DIR="generated/playbooks"
export PATH=.bin:$PATH

# Create output directory
mkdir -p "$OUTPUT_DIR"

echo "Rendering Helm chart: $CHART_NAME"
echo "Output directory: $OUTPUT_DIR"

# Use helm template to render the chart and pipe to yq
helm template "$CHART_NAME" $HELM_ARGS > rendered.yaml

for playbook in $(yq e 'select(.kind =="Playbook") | .metadata.name '  -o json -r rendered.yaml); do
  FILENAME="$OUTPUT_DIR/${playbook}.yaml"
  CONTENT=$(yq e "select(.metadata.name == \"$playbook\")" rendered.yaml)
  echo "$CONTENT" > $FILENAME
done
