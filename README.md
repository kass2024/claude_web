# JC Architecture & AI Consulting Inc. (Website)

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

