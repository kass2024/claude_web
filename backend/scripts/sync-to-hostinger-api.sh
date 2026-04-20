#!/usr/bin/env bash
# Run on Hostinger SSH (Linux). Copies Laravel into public_html/api/ layout:
#   $API_ROOT/index.php .htaccess ...  (from backend/public)
#   $API_ROOT/backend/...                (full Laravel app)
#
# Usage:
#   chmod +x backend/scripts/sync-to-hostinger-api.sh
#   ./backend/scripts/sync-to-hostinger-api.sh /home/USER/domains/YOURDOMAIN/public_html/api
#
# Optional: point at your clone if not next to this script's repo root:
#   REPO=/home/USER/repositories/claude_web ./backend/scripts/sync-to-hostinger-api.sh /home/USER/.../public_html/api

set -euo pipefail

API_ROOT="${1:-}"
if [[ -z "$API_ROOT" ]]; then
  echo "Usage: $0 /home/USER/domains/YOURDOMAIN/public_html/api"
  echo "Example: $0 /home/u123456789/domains/jcarchitectureaiconsulting.com/public_html/api"
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
REPO_ROOT="$(cd "$BACKEND_DIR/.." && pwd)"

if [[ ! -f "$BACKEND_DIR/artisan" ]]; then
  echo "ERROR: backend/ not found (expected artisan at $BACKEND_DIR/artisan)"
  exit 1
fi

mkdir -p "$API_ROOT"

echo "==> Sync Laravel app → $API_ROOT/backend/"
# protect .env on server from --delete (repo does not ship .env)
rsync -a --delete \
  --filter='protect .env' \
  --exclude public \
  "$BACKEND_DIR/" \
  "$API_ROOT/backend/"

echo "==> Sync public web files → $API_ROOT/"
rsync -a --delete \
  "$BACKEND_DIR/public/" \
  "$API_ROOT/"

echo "==> Write Hostinger subfolder index.php"
cat >"$API_ROOT/index.php" <<'PHP'
<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

if (file_exists($maintenance = __DIR__.'/backend/storage/framework/maintenance.php')) {
    require $maintenance;
}

require __DIR__.'/backend/vendor/autoload.php';

/** @var Application $app */
$app = require_once __DIR__.'/backend/bootstrap/app.php';

$app->handleRequest(Request::capture());
PHP

echo "==> Deny HTTP access to backend/ (except via PHP bootstrap)"
cat >"$API_ROOT/backend/.htaccess" <<'HTACCESS'
<IfModule mod_authz_core.c>
    Require all denied
</IfModule>
HTACCESS

echo "Done. Next on the server:"
echo "  1) Create/edit $API_ROOT/backend/.env (see backend/.env.production.example)"
echo "  2) cd $API_ROOT/backend && composer install --no-dev --optimize-autoloader"
echo "  3) php artisan key:generate --force && php artisan migrate --force && php artisan db:seed --force"
echo "  4) php artisan storage:link && php artisan config:cache && php artisan route:cache"
echo "  5) chmod -R ug+rw $API_ROOT/backend/storage $API_ROOT/backend/bootstrap/cache"
