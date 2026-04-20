# Static frontend build and manual deploy (Hostinger hPanel)

This project’s **Next.js** app is configured for **`output: "export"`**. Running **`npm run build`** produces a static site in **`frontend/out/`** (HTML, JS, CSS, `_next/`, etc.). You upload **the contents of `out/`** to your main domain’s **`public_html`** on shared hosting—**no Node.js** runtime is required on the server for the marketing site.

Your **Laravel API** can stay on **`api.`** or under **`public_html/api/`** as you already set up; this guide only replaces the **public marketing files**.

---

## Part A — Build static files on your computer (step by step)

### A1. Prerequisites

- **Node.js** 20 or 22 (LTS recommended) and **npm** installed.
- Your **API must be reachable over HTTPS** during the build (the site prerenders pages and reads `/services`, `/projects`, `/posts`, etc.).  
  - Production: `https://api.jcarchitectureaiconsulting.com/api`  
  - Or any URL that returns the same JSON your live site uses.

### A2. Open a terminal in the frontend folder

```powershell
cd c:\methode\water_level\claude-website\frontend
```

### A3. Install dependencies (clean install)

```powershell
npm ci
```

If you do not have a lockfile sync issue, `npm install` is also fine.

### A4. Set production URLs for this build (same terminal)

Replace with your real domain and API if they differ:

```powershell
$env:NEXT_PUBLIC_SITE_URL = "https://jcarchitectureaiconsulting.com"
$env:NEXT_PUBLIC_API_BASE_URL = "https://api.jcarchitectureaiconsulting.com/api"
```

Optional: create **`frontend/.env.production.local`** with the same two variables so you do not have to type them each time (Next loads it automatically for `next build`).

### A5. Run the production build

```powershell
npm run build
```

Wait until it finishes with no errors. You should see a line about **export** / static pages generated.

### A6. Confirm the `out` folder

```powershell
Get-ChildItem .\out | Select-Object -First 20
```

You should see **`index.html`**, **`_next\`**, folders like **`about\`**, **`services\`**, etc.

### A7. (Optional) Zip for upload

```powershell
Compress-Archive -Path .\out\* -DestinationPath ..\jc-frontend-static.zip -Force
```

The zip contains **the files that belong inside `public_html`**, not an extra outer `out` folder.

---

## Part B — Deploy manually on Hostinger (hPanel)

### B1. Turn off automatic Node / Git deploy for the main site

If hPanel is set to **build and deploy Next from Git** for the apex domain, **disable auto-deployment** (or disconnect that app) so your manual upload is not overwritten on the next push.

Remove any **Passenger / Node** `.htaccess` rules at the **site root** that forward everything to Node—static files should be served by **Apache** directly.

### B2. Back up current `public_html`

In **File Manager**, open the domain root (**`public_html`** for the main site). Download a backup or copy files to a folder like **`_backup_before_static`**.

### B3. Do not delete the API folder (if it lives there)

If the API is served from something like **`public_html/api/`**, **keep that directory** and only replace **root** marketing files (`index.html`, `_next`, `about`, …). Do not delete your Laravel `index.php`, `.htaccess`, and `backend` layout under **`api`** unless you intend to redeploy the API.

### B4. Upload static files

- **If you use a zip:** upload **`jc-frontend-static.zip`**, then **Extract** into `public_html` (choose “extract here” so **`index.html`** ends up directly under `public_html`, not under `out\index.html`).
- **If you use FTP:** upload **everything inside `frontend\out\`** into **`public_html`**, preserving structure (`_next` must remain a folder).

### B5. Permissions

Folders **755**, files **644** are typical defaults after extract; only change if Hostinger support asks you to.

### B6. Clear cache (if offered)

In hPanel, use **LiteSpeed / cache purge** or your **CDN** purge for the main domain so old HTML is not served.

### B7. Test in the browser

- Open **`https://jcarchitectureaiconsulting.com/`** (with or without trailing slash; this build uses **`trailingSlash: true`**).
- Open **`/services/`**, **`/blog/`**, a sample **`/services/architecture-construction/`**, and confirm data loads (the browser calls your **API** at runtime for some behaviors; forms already POST to the API base URL from **`NEXT_PUBLIC_API_BASE_URL`** baked in at build time).

### B8. When you change CMS content

Static HTML is fixed at build time. After you add services, projects, or posts in the CMS, **run `npm run build` again** on your PC and **re-upload `out/`** (or only changed files if you prefer, but full replace is simpler).

---

## Troubleshooting

| Problem | What to check |
|--------|----------------|
| Build error about **`generateStaticParams`** / export | API unreachable or empty lists; the repo includes **fallback slugs** so the build should still get paths—ensure **`NEXT_PUBLIC_API_BASE_URL`** is correct. |
| Blank page after upload | **`index.html`** must be in **`public_html`**, not nested inside **`out`**. Check **`_next`** folder uploaded. |
| 404 on deep links | Apache **MultiViews** / rewrites; with **`trailingSlash: true`**, prefer links like **`/about/`**. |
| API errors in browser | CORS and **`NEXT_PUBLIC_*`** values used **at build time**; rebuild after changing API URL. |

---

## One-liner reference (build only)

```powershell
cd c:\methode\water_level\claude-website\frontend; npm ci; $env:NEXT_PUBLIC_SITE_URL="https://jcarchitectureaiconsulting.com"; $env:NEXT_PUBLIC_API_BASE_URL="https://api.jcarchitectureaiconsulting.com/api"; npm run build
```

Output directory: **`frontend\out\`**.
