# TradeAid

## Project Overview

`TradeAid` is a frontend React + TypeScript + Vite application located in `frontend/tradeaid`. It provides a polished landing page, OTP-based login experience, and a dashboard scaffold with a sidebar navigation component.

This repository currently contains only the frontend application. The authentication flow depends on external API endpoints for OTP request and verification.

## What is included

- `frontend/tradeaid/src/main.tsx` — React app entrypoint using `BrowserRouter`
- `frontend/tradeaid/src/App.tsx` — top-level route definitions
- `frontend/tradeaid/src/pages/landing_page.tsx` — landing page with CTA navigation to login
- `frontend/tradeaid/src/pages/login.tsx` — phone + OTP login flow with external API calls
- `frontend/tradeaid/src/pages/dashboard.tsx` — dashboard shell with `SideNav`
- `frontend/tradeaid/src/components/side_nav.tsx` — sidebar navigation component
- `frontend/tradeaid/src/assets/` — hero and branding images
- `frontend/tradeaid/src/*.css` — page and layout styling files

## Key Routes

- `/` — Landing page
- `/login` — Login / OTP authentication page
- `/dashboard` — Dashboard placeholder layout

## How to run

From `frontend/tradeaid`:

```bash
npm install
npm run dev
```

## Available scripts

- `npm run dev` — start Vite development server
- `npm run build` — build production assets (`tsc -b` + `vite build`)
- `npm run lint` — run ESLint across the project
- `npm run preview` — preview the production build locally

## Notes

- The project uses React Router v7 for page routing.
- OTP auth is implemented in `login.tsx` through fetch calls to external ngrok endpoints.
- `dash_page.tsx`, `products_page.tsx`, and `transactions_page.tsx` are currently empty scaffolds.

## Documentation

Detailed documentation lives in the `docs/` folder.
