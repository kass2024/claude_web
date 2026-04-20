# Deploy Laravel API into `public_html/api/` (Hostinger)

Your File Manager path: **`public_html/api/`** (currently empty). This layout matches a normal **subfolder API** at `https://YOURDOMAIN.com/api/...`.

## Target layout on the server

```text
public_html/api/                 ← web root for the API (only “public” files here)
  index.php                      ← patched (see below)
  .htaccess
  favicon.ico                    ← copy from repo backend/public/
  … (other files from backend/public/)
  backend/                       ← full Laravel project (app, vendor, .env, …)
    .htaccess                    ← blocks browsers from reading the app over HTTP
    artisan
    app/
    bootstrap/
    config/
    database/
    routes/
    vendor/
    .env
    storage/ → writable
```

---

## Step 1 — Push from your PC (GitHub must have latest)

```powershell
cd c:\methode\water_level\claude-website
git checkout main
git add -A
git commit -m "deploy: backend"   # only if you have changes to commit
git push origin main
```

---

## Step 2 — SSH into Hostinger and clone (outside `public_html` is fine)

```bash
mkdir -p ~/repositories
cd ~/repositories
git clone https://github.com/kass2024/claude_web.git
cd claude_web
git checkout main
git pull origin main
```

---

## Step 3 — Composer on the server

```bash
cd ~/repositories/claude_web/backend
composer install --no-dev --optimize-autoloader
```

If `composer` is missing, use Hostinger’s documentation for **Composer** / **PHP CLI** path.

---

## Step 4 — Copy Laravel into `public_html/api/`

Replace **`YOURUSER`** with your Hostinger username (see File Manager path or SSH welcome message).

```bash
DOMAIN_ROOT=/home/YOURUSER/domains/jcarchitectureaiconsulting.com/public_html
API_ROOT="$DOMAIN_ROOT/api"

mkdir -p "$API_ROOT"

# Full application (Laravel root) → api/backend/
rsync -a --delete \
  --exclude public \
  ~/repositories/claude_web/backend/ \
  "$API_ROOT/backend/"

# “Public” web files → api/
rsync -a --delete \
  ~/repositories/claude_web/backend/public/ \
  "$API_ROOT/"
```

---

## Step 5 — Patch `public_html/api/index.php`

The stock Laravel `public/index.php` expects `vendor/` next to `public/`. On the server, `vendor` is under **`api/backend/`**, so replace **`public_html/api/index.php`** with:

```php
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
```

Create **`public_html/api/backend/.htaccess`** so the app directory is not browsable over HTTP:

```apache
<IfModule mod_authz_core.c>
    Require all denied
</IfModule>
```

(The web server still runs PHP for `../index.php`; it does not need to execute files inside `backend/` via URL.)

---

## Step 6 — Environment file on the server

```bash
nano /home/YOURUSER/domains/jcarchitectureaiconsulting.com/public_html/api/backend/.env
```

From `backend/.env.production.example`, set at least:

- `APP_URL=https://jcarchitectureaiconsulting.com/api`
- `FRONTEND_URL=https://jcarchitectureaiconsulting.com`
- `APP_DEBUG=false`
- `APP_ENV=production`
- `DB_*` from hPanel → **Databases** → MySQL

Then:

```bash
cd /home/YOURUSER/domains/jcarchitectureaiconsulting.com/public_html/api/backend
php artisan key:generate --force
php artisan migrate --force
php artisan db:seed --force
php artisan storage:link
php artisan config:cache
php artisan route:cache
```

Fix permissions if uploads / logs fail:

```bash
chmod -R ug+rw storage bootstrap/cache
```

---

## Step 7 — Test from SSH

```bash
curl -sS -o /dev/null -w "HTTP %{http_code}\n" \
  "https://jcarchitectureaiconsulting.com/api/services"
```

Expect **HTTP 200** and JSON when you open the URL in a browser.

---

## If you cannot use SSH (File Manager only)

1. On your PC, run `composer install --no-dev --optimize-autoloader` inside `backend/`, then zip the whole **`backend`** folder (including **`vendor`**).  
2. Upload the zip into **`public_html/api/`**, extract so you get **`public_html/api/backend/`** with `vendor/` inside it.  
3. Upload everything inside your local **`backend/public/`** into **`public_html/api/`** (not inside `backend/`).  
4. Overwrite **`public_html/api/index.php`** with the patched version above.  
5. Add **`public_html/api/backend/.htaccess`** (deny all).  
6. Create **`.env`** on the server under **`api/backend/`** and run **`php artisan key:generate`** etc. using Hostinger **Cron / PHP** or their **Terminal** tool if available.

---

## Updating later

```bash
cd ~/repositories/claude_web
git pull origin main
cd backend
composer install --no-dev --optimize-autoloader
php artisan migrate --force
php artisan config:cache
php artisan route:cache
# repeat rsync commands from Step 4
```
