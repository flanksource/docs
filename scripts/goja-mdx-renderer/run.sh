#!/bin/bash
# Wrapper script to run the goja MDX renderer with proper module context

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR" && go run main.go