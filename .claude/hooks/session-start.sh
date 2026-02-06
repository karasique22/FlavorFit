#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
ERRORS=0

# Check .env file
if [ ! -f "$ROOT_DIR/.env" ]; then
  echo "WARNING: .env file not found. Copy .env.example and configure it."
  ERRORS=$((ERRORS + 1))
fi

# Check node_modules
if [ ! -d "$ROOT_DIR/node_modules" ]; then
  echo "WARNING: node_modules/ not found. Run 'pnpm install' from project root."
  ERRORS=$((ERRORS + 1))
fi

# Check Prisma client generated
if [ ! -d "$ROOT_DIR/packages/database/src/generated/prisma" ]; then
  echo "WARNING: Prisma client not generated. Run 'pnpm db:generate' from project root."
  ERRORS=$((ERRORS + 1))
fi

# Check PostgreSQL
if command -v pg_isready &>/dev/null; then
  if ! pg_isready -q 2>/dev/null; then
    echo "WARNING: PostgreSQL is not reachable. Start the database before running the API."
    ERRORS=$((ERRORS + 1))
  fi
elif command -v docker &>/dev/null; then
  if ! docker ps --format '{{.Names}}' 2>/dev/null | grep -qi postgres; then
    echo "WARNING: No running PostgreSQL container found. Start the database before running the API."
    ERRORS=$((ERRORS + 1))
  fi
else
  echo "NOTE: Cannot check PostgreSQL (neither pg_isready nor docker available)."
fi

if [ "$ERRORS" -eq 0 ]; then
  echo "Environment OK. All checks passed."
fi
