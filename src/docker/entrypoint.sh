#!/bin/sh
set -e

TEMPLATE=/docker-env/env.template.js
TARGET=/usr/share/nginx/html/env.js

API_BASE=${APP_API_BASE:-https://api.taskline.izzettin.dev}
ENV_NAME=${APP_ENV:-production}
VERSION=${APP_VERSION:-latest}

sed \
  -e "s|__API_BASE__|$API_BASE|g" \
  -e "s|__ENV__|$ENV_NAME|g" \
  -e "s|__VERSION__|$VERSION|g" \
  "$TEMPLATE" > "$TARGET"

exec "$@"
