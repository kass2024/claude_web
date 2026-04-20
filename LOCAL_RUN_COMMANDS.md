# Local run — all commands (copy-paste)

PowerShell. Repo root: `c:\methode\water_level\claude-website`

---

## 1) Latest `main` branch

```powershell
cd c:\methode\water_level\claude-website
git fetch origin
git checkout main
git pull origin main
```

If checkout fails because of untracked `frontend\` files, run this once, then repeat the block above:

```powershell
cd c:\methode\water_level\claude-website
Move-Item -Path frontend -Destination frontend._bak_untracked -Force
```

---

## 2) Frontend only (Next.js + live API)

```powershell
Set-Content -Path c:\methode\water_level\claude-website\frontend\.env.local -Value @"
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=https://jcarchitectureaiconsulting.com/api
"@
```

```powershell
cd c:\methode\water_level\claude-website\frontend
npm install
npm run dev
```

Open: http://localhost:3000

If the browser blocks API calls (CORS), either use **section 3** (local `php artisan serve`) or on the server set `FRONTEND_URLS=http://localhost:3000` in `backend/.env` (see `backend/.env.production.example`).

---

## 3) Frontend + local Laravel API (`php artisan serve`)

Requires MySQL (or another DB) configured in `backend\.env`.

```powershell
cd c:\methode\water_level\claude-website
Copy-Item backend\.env.example backend\.env -Force
```

Edit `backend\.env` with your `DB_*` credentials, then:

```powershell
cd c:\methode\water_level\claude-website\backend
composer install --no-interaction --prefer-dist
php artisan key:generate --force
php artisan migrate --force
php artisan db:seed --force
php artisan serve --host=127.0.0.1 --port=8000
```

In a **second** terminal, point Next at the local API:

```powershell
Set-Content -Path c:\methode\water_level\claude-website\frontend\.env.local -Value @"
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000/api
"@
```

```powershell
cd c:\methode\water_level\claude-website\frontend
npm install
npm run dev
```

---

## 4) Full stack with Docker (MySQL + Laravel in containers)

Requires Docker Desktop. Configure `backend\.env` for Docker MySQL (host `mysql`, user/password from `docker-compose.yml`), then:

```powershell
cd c:\methode\water_level\claude-website
docker compose up -d --build
docker compose exec backend php artisan key:generate
docker compose exec backend php artisan migrate
docker compose exec backend php artisan db:seed
```

Frontend env (API on host port 8000):

```powershell
Set-Content -Path c:\methode\water_level\claude-website\frontend\.env.local -Value @"
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
"@
```

```powershell
cd c:\methode\water_level\claude-website\frontend
npm install
npm run dev
```

Stop containers:

```powershell
cd c:\methode\water_level\claude-website
docker compose down
```

---

## 5) Sanity check (optional)

```powershell
Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing -TimeoutSec 15
```
