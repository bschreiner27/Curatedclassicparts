# Road & Race Parts (rrp)

This repo is ready to deploy on a Hostinger VPS using Docker + Caddy.
It includes:
- **Caddy** reverse proxy with HTTPS
- **web/** React (Vite) app served by Nginx
- **api/** Express (TypeScript) API
- **db/** (inside api) Drizzle ORM schema + migrations + Garage Alerts job

## Quick start (VPS)
1) Put `.env` at repo root (copy `.env.example`).
2) `docker compose up -d --build`
3) Visit `https://your-domain.com` and `https://your-domain.com/api/health`

## Migrations (run from your laptop or on the VPS inside api/)
```bash
cd api
npm i
npm run db:generate
npm run db:migrate
npm run db:seed
```

## Garage alert job
- One-off: `npm run job:garage`
- Cron hourly on server or add a worker container.

See `api/db/schema/*` and `api/scripts/enqueueGarageMatches.ts`.
