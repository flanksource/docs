#!/bin/bash


	vale --output=JSON $1 > vale.json
	aider --no-git $1 vale.json  -m "As a technical editor for developer tool documentation, Fix any issues detected in $1 by using the scan results in vale.json, do not make changes to anything quoted using \` or \`\`\`. do not remove '//' if found at the start of a line or in the middle of a line. Do not modify any whitespace. Only modify the content based on suggestions in vale.json. DO not modify lines that start with '{{' or lines that look like code. Only modify english sentances. Stop after 20 fixes"
