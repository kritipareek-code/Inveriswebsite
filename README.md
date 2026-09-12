# Inveris Solutions Website

Monorepo with a Next.js frontend and Express API backend.

## Structure

- `frontend/` — Next.js (App Router) + Tailwind CSS
- `server/` — Express + Node.js API

## Getting started

### 1. Backend (Express)

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

API runs at **http://localhost:5001**

- `GET /health` — health check
- `POST /api/contact` — contact form submissions

### 2. Frontend (Next.js)

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

App runs at **http://localhost:3000**

## Note on macOS

Port 5000 is often used by AirPlay Receiver on macOS. The API defaults to **5001** to avoid conflicts.

## Environment variables

**server/.env**

| Variable     | Default               | Description        |
| ------------ | --------------------- | ------------------ |
| `PORT`                  | `5001`                    | API port           |
| `CLIENT_URL`            | `http://localhost:3000`   | Allowed CORS origin |
| `ADMIN_EMAIL`           | —                         | Admin login email (required, no default) |
| `ADMIN_PASSWORD`        | —                         | Admin login password (required, no default) |
| `JWT_SECRET`            | —                         | JWT signing secret (required) |
| `MONGODB_URI`           | —                         | MongoDB Atlas connection string |
| `IMAGEKIT_PRIVATE_KEY`  | —                         | ImageKit private API key |
| `CONTACT_NOTIFY_EMAIL`  | `vanshagarwal0144@gmail.com` | Inbox for contact form emails |
| `RESEND_API_KEY`        | —                         | Resend API key (`re_...`) |
| `RESEND_FROM_EMAIL`     | `Inveris Solutions <noreply@inverissolutions.com>` | From address (must be on a Resend-verified domain) |

**frontend/.env.local**

| Variable              | Default                 | Description   |
| --------------------- | ----------------------- | ------------- |
| `NEXT_PUBLIC_API_URL` | `http://localhost:5001` | Express API URL |

---

## Deploy to GitHub + Render + Vercel

### Architecture

| Service | Hosts | Folder |
| ------- | ----- | ------ |
| GitHub  | Source code | whole repo |
| Render  | Express API | `server/` |
| Vercel  | Next.js site | `frontend/` |

Deploy the **backend first**, then the **frontend**, so you have the Render API URL for Vercel env vars.

---

### Step 1 — Push to GitHub

From the project root:

```bash
cd "/Users/vanshagarwal/Desktop/inveris website"

git init
git add .
git status   # confirm .env files and node_modules are NOT listed
git commit -m "Initial commit: Inveris website"
```

Create a new repo on GitHub (e.g. `inveris-website`), then:

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/inveris-website.git
git push -u origin main
```

**Do not commit:** `.env`, `.env.local`, `node_modules/`, `.next/`, `.vercel/` — these are covered by `.gitignore`.

---

### Step 2 — Deploy backend on Render

1. Go to [render.com](https://render.com) and sign in (connect GitHub).
2. **New → Web Service** → select your repo.
3. Settings:
   - **Name:** `inveris-api` (or any name)
   - **Root Directory:** `server`
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance type:** Free (or paid)
4. **Environment variables:**

   | Key | Value |
   | --- | ----- |
   | `NODE_ENV` | `production` |
   | `CLIENT_URL` | `https://YOUR-VERCEL-URL.vercel.app` (update after Step 3) |
   | `ADMIN_EMAIL` | your admin email |
   | `ADMIN_PASSWORD` | a strong password |
   | `JWT_SECRET` | a long random string |
   | `MONGODB_URI` | MongoDB Atlas connection string |
   | `IMAGEKIT_PRIVATE_KEY` | ImageKit private API key (`private_...`) |
   | `CONTACT_NOTIFY_EMAIL` | `vanshagarwal0144@gmail.com` |
   | `RESEND_API_KEY` | Resend API key (`re_...`) |
   | `RESEND_FROM_EMAIL` | `Inveris Solutions <noreply@inverissolutions.com>` |

   > Render sets `PORT` automatically — do not override it.

5. Click **Create Web Service** and wait for deploy.
6. Copy your live API URL, e.g. `https://inveris-api.onrender.com`
7. Test: open `https://inveris-api.onrender.com/health` → should return `{"status":"ok"}`

**Optional:** Use the included `render.yaml` at repo root with **New → Blueprint** for one-click setup.

---

### Step 3 — Deploy frontend on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (connect GitHub).
2. **Add New → Project** → import your repo.
3. Settings:
   - **Root Directory:** `frontend` (click Edit, set to `frontend`)
   - **Framework Preset:** Next.js (auto-detected)
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `.next` (default)
4. **Environment variables:**

   | Key | Value |
   | --- | ----- |
   | `NEXT_PUBLIC_API_URL` | `https://inveris-api.onrender.com` (your Render URL, no trailing slash) |

5. Click **Deploy**.
6. Copy your Vercel URL, e.g. `https://inveris-website.vercel.app`

---

### Step 4 — Connect frontend ↔ backend (CORS)

1. In **Render** → your web service → **Environment**:
   - Set `CLIENT_URL` to your Vercel production URL.
   - For preview deploys, use comma-separated URLs:
     ```
     https://inveris-website.vercel.app,https://inveris-website-git-main-YOUR_USERNAME.vercel.app
     ```
2. **Save** and let Render redeploy.

3. In **Vercel** → Project → **Settings → Environment Variables**:
   - Confirm `NEXT_PUBLIC_API_URL` points to Render.
   - Redeploy if you changed it after the first deploy.

---

### Step 5 — Verify production

- [ ] Homepage loads on Vercel URL
- [ ] All pages work (`/about`, `/services`, `/contact`, etc.)
- [ ] Contact form submits successfully (appears under Admin → Form responses and arrives by email)
- [ ] No CORS errors in browser DevTools → Network tab

---

### Future updates

```bash
git add .
git commit -m "Describe your change"
git push
```

- **Vercel** redeploys automatically on push to `main`.
- **Render** redeploys automatically on push to `main` (if auto-deploy is enabled).

---

### Troubleshooting

| Issue | Fix |
| ----- | --- |
| Contact form fails | Check `NEXT_PUBLIC_API_URL` on Vercel and `/health` on Render |
| CORS error | Add exact Vercel URL (with `https://`) to Render `CLIENT_URL` |
| Render cold start slow | Free tier sleeps after inactivity; first request may take ~30s |
| Build fails on Vercel | Ensure **Root Directory** is `frontend`, not repo root |
| Build fails on Render | Ensure **Root Directory** is `server` |
| API fails to start | Set `MONGODB_URI` and allow Render's IPs (or `0.0.0.0/0`) in Atlas Network Access |
| Image upload fails | Set `IMAGEKIT_PRIVATE_KEY` on Render |
| Contact form saves but no email | Set `RESEND_API_KEY` (and a verified `RESEND_FROM_EMAIL` in production) |

---

## Environment variables (reference)

**server/.env**

| Variable     | Default               | Description        |
| ------------ | --------------------- | ------------------ |
| `PORT`                  | `5001`                    | API port (local only; Render sets this in production) |
| `CLIENT_URL`            | `http://localhost:3000`   | Allowed CORS origin(s), comma-separated |
| `ADMIN_EMAIL`           | —                         | Admin login email (required, no default) |
| `ADMIN_PASSWORD`        | —                         | Admin login password (required, no default) |
| `JWT_SECRET`            | —                         | JWT signing secret (required) |
| `MONGODB_URI`           | —                         | MongoDB Atlas connection string |
| `IMAGEKIT_PRIVATE_KEY`  | —                         | ImageKit private API key |
| `CONTACT_NOTIFY_EMAIL`  | `vanshagarwal0144@gmail.com` | Inbox for contact form emails |
| `RESEND_API_KEY`        | —                         | Resend API key (`re_...`) |
| `RESEND_FROM_EMAIL`     | `Inveris Solutions <noreply@inverissolutions.com>` | From address (must be on a Resend-verified domain) |

**frontend/.env.local**

| Variable              | Default                 | Description   |
| --------------------- | ----------------------- | ------------- |
| `NEXT_PUBLIC_API_URL` | `http://localhost:5001` | Express API URL |
