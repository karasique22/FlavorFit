#!/usr/bin/env bash

# PostToolUse hook: remind to regenerate Prisma client after .prisma file edits
# Receives tool_input JSON via stdin

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | grep -o '"file_path":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ -z "$FILE_PATH" ]; then
  exit 0
fi

if [[ "$FILE_PATH" == *.prisma ]]; then
  echo "REMINDER: You edited a .prisma file. Run 'pnpm db:generate' to regenerate the Prisma client, then 'pnpm db:migrate' if this is a schema change."
fi
