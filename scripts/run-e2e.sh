#!/usr/bin/env bash
#
# Run E2E tests with automatic Docker environment management.
#
# Usage:
#   ./scripts/run-e2e.sh                                    # all tests
#   ./scripts/run-e2e.sh tests/e2e/orders/order-create.spec.ts  # one file
#   ./scripts/run-e2e.sh --headed                           # visible browser
#   ./scripts/run-e2e.sh --build                            # force rebuild images
#
set -euo pipefail

COMPOSE_FILE="docker-compose.test.yml"
PLAYWRIGHT_CONFIG="tests/playwright.config.ts"

# Check for --build flag
BUILD_FLAG=""
PLAYWRIGHT_ARGS=()
for arg in "$@"; do
  if [ "$arg" = "--build" ]; then
    BUILD_FLAG="--build"
  else
    PLAYWRIGHT_ARGS+=("$arg")
  fi
done

cleanup() {
  echo ""
  echo "==> Stopping test environment..."
  docker compose -f "$COMPOSE_FILE" down -v --remove-orphans 2>/dev/null || true
  echo "==> Done."
}

trap cleanup EXIT

# Build only if --build flag or images don't exist yet
if [ -n "$BUILD_FLAG" ]; then
  echo "==> Building Docker images (forced)..."
  docker compose -f "$COMPOSE_FILE" build
elif ! docker compose -f "$COMPOSE_FILE" images -q 2>/dev/null | grep -q .; then
  echo "==> Building Docker images (first time)..."
  docker compose -f "$COMPOSE_FILE" build
else
  echo "==> Using cached Docker images (pass --build to rebuild)"
fi

echo "==> Starting containers..."
docker compose -f "$COMPOSE_FILE" up -d

echo "==> Waiting for backend..."
SECONDS=0
until docker compose -f "$COMPOSE_FILE" ps backend 2>/dev/null | grep -q "healthy"; do
  if [ $SECONDS -ge 90 ]; then
    echo "ERROR: Backend not healthy after 90s. Logs:"
    docker compose -f "$COMPOSE_FILE" logs backend --tail=20
    exit 1
  fi
  sleep 2
done
echo "    Backend ready (${SECONDS}s)"

SECONDS=0
until curl -sf http://localhost:3001 > /dev/null 2>&1; do
  if [ $SECONDS -ge 60 ]; then
    echo "ERROR: Frontend not responding after 60s"
    exit 1
  fi
  sleep 2
done
echo "    Frontend ready (${SECONDS}s)"

echo ""
echo "==> Running tests..."
echo ""

set +e
npx playwright test --config="$PLAYWRIGHT_CONFIG" "${PLAYWRIGHT_ARGS[@]}"
TEST_EXIT_CODE=$?
set -e

echo ""
if [ $TEST_EXIT_CODE -eq 0 ]; then
  echo "==> All tests passed!"
else
  echo "==> Tests failed (exit code: $TEST_EXIT_CODE)"
  echo "    Run 'npm run test:e2e:report' to view HTML report"
fi

exit $TEST_EXIT_CODE
