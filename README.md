# JC Architecture & AI Consulting Inc. (Monorepo)

Monorepo containing:

- `frontend/`: Next.js + TypeScript + Tailwind CSS (App Router)
- `backend/`: Laravel API + MySQL (CMS-ready)

## Local development

### Production-ready local (Docker)

This repo includes a Docker setup that:

- creates the **MySQL database automatically**
- runs the **Laravel API on** `http://localhost:8000`

Prerequisite: install Docker Desktop.

1. Start containers:

```bash
docker compose up -d --build
```

2. Run migrations + seed (first time):

```bash
docker compose exec backend php artisan migrate
docker compose exec backend php artisan db:seed
```

### Backend (Laravel) (non-Docker)

1. Create a MySQL database named `jc_consulting`.
2. Copy `backend/.env.example` to `backend/.env` and set DB credentials if needed.
3. Run:

```bash
cd backend
php artisan migrate
php artisan serve --port=8000
```

### Frontend (Next.js)

1. Copy `frontend/.env.local.example` to `frontend/.env.local` and adjust if needed.
2. Run:

```bash
cd frontend
npm install
npm run dev
```

## Live domains

- **Frontend**: `jcarchitectureaiconsulting.com`
- **Backend API**: `api.jcarchitectureaiconsulting.com`

Use:

- `frontend/.env.production.example` (Vercel / live frontend env vars)
- `backend/.env.production.example` (live API server env vars)

## Hostinger deployment notes (recommended setup)

These notes assume:

- `jcarchitectureaiconsulting.com` serves the **Next.js frontend**
- `api.jcarchitectureaiconsulting.com` serves the **Laravel API**
- MySQL is available on the same server (or a managed DB)

### Backend (Laravel API) on Hostinger

#### 1) Domain + web root

- Point the subdomain `api.jcarchitectureaiconsulting.com` to your server.
- Set the **document root** to:
  - `.../claude-website/backend/public`

#### 2) Environment file

- On the server, create `backend/.env` based on `backend/.env.production.example`
- Set at minimum:
  - `APP_ENV=production`
  - `APP_DEBUG=false`
  - `APP_URL=https://api.jcarchitectureaiconsulting.com`
  - `FRONTEND_URL=https://jcarchitectureaiconsulting.com`
  - `DB_*` credentials

#### 3) Install + optimize (from `backend/`)

```bash
cd backend
composer install --no-dev --optimize-autoloader
php artisan key:generate
php artisan migrate --force
php artisan db:seed --force
php artisan storage:link
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

#### 4) Storage permissions

Ensure the web server user can write to:

- `backend/storage/`
- `backend/bootstrap/cache/`

#### 5) Scheduler (cron)

Add this cron on Hostinger (run every minute):

```bash
* * * * * cd /path/to/claude-website/backend && php artisan schedule:run >> /dev/null 2>&1
```

#### 6) Queue worker (Supervisor)

If you use queues (recommended for emails/exports/media processing), run a worker via Supervisor:

Example program:

```ini
[program:jc-queue]
process_name=%(program_name)s_%(process_num)02d
command=php /path/to/claude-website/backend/artisan queue:work --sleep=3 --tries=3 --timeout=120
autostart=true
autorestart=true
user=www-data
numprocs=1
redirect_stderr=true
stdout_logfile=/path/to/claude-website/backend/storage/logs/queue.log
```

### Frontend (Next.js) on Hostinger

You have two viable deployment modes on Hostinger:

#### Option A (best): Node runtime (SSR) using PM2

Use this when Hostinger plan supports Node.js processes (typically VPS).

1) Set env vars (example):

- `NEXT_PUBLIC_SITE_URL=https://jcarchitectureaiconsulting.com`
- `NEXT_PUBLIC_API_BASE_URL=https://api.jcarchitectureaiconsulting.com/api`

2) Build and run (from `frontend/`):

```bash
cd frontend
npm ci
npm run build
```

3) Start with PM2:

```bash
pm2 start "npm run start -- -p 3000" --name jc-frontend
pm2 save
pm2 startup
```

4) Reverse proxy `jcarchitectureaiconsulting.com` to `http://127.0.0.1:3000` (Nginx/Apache).

#### Option B: Static export (no Node at runtime)

Use this if your Hostinger plan cannot run Node persistently (shared hosting).

1) Update `frontend/next.config.ts` to enable `output: "export"` and ensure your pages are compatible with static export.
2) Run:

```bash
cd frontend
npm ci
npm run build
```

3) Upload the exported output to your hosting public directory.

> Note: This project currently uses dynamic routes (`/services/[slug]`, `/projects/[slug]`, `/blog/[slug]`). For static export, you must generate static params (or switch those routes to fully static content).

### CORS / API access

On the API server, ensure:

- `FRONTEND_URL=https://jcarchitectureaiconsulting.com` in `backend/.env`

### SSL

Enable SSL for both:

- `jcarchitectureaiconsulting.com`
- `api.jcarchitectureaiconsulting.com`

## Hostinger branches (important)

Hostinger sometimes auto-detects the wrong folder when importing a monorepo.

- **Deploy the frontend website** from branch `hostinger-frontend`
- **Deploy the backend API** from branch `hostinger-backend`
- Full source stays on `main`

