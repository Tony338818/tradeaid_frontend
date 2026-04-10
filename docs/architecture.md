# Architecture Overview

## Project layout

- `frontend/tradeaid/`
  - `src/`
    - `App.tsx` — route definitions
    - `main.tsx` — React entrypoint, renders `App` inside `BrowserRouter`
    - `components/side_nav.tsx` — dashboard sidebar navigation component
    - `pages/`
      - `landing_page.tsx` — marketing landing page with CTA navigation
      - `login.tsx` — phone/OTP authentication flow
      - `dashboard.tsx` — dashboard layout with `SideNav`
      - `dash_page.tsx` — empty scaffold file
      - `products_page.tsx` — empty scaffold file
      - `transactions_page.tsx` — empty scaffold file
    - `assets/` — static image assets used in the landing page
    - `*.css` — layout and page styling files

## Frontend pattern

The application is a single-page React application using Vite and React Router DOM. It follows a page/component split:

- Pages contain route-level UI and page-specific logic.
- Components contain reusable UI elements.
- Styles are organized per page and imported directly into page modules.

## Important files

- `frontend/tradeaid/package.json` — dependency management and scripts
- `frontend/tradeaid/vite.config.ts` — Vite project config
- `frontend/tradeaid/tsconfig.json` — TypeScript compilation config
- `frontend/tradeaid/tsconfig.app.json` — application-specific TypeScript config
- `frontend/tradeaid/tsconfig.node.json` — Node environment config for build tooling
- `frontend/tradeaid/eslint.config.js` — linting rules and plugin registrations

## Notes

- The current dashboard view is a scaffold with placeholder content.
- The login flow is implemented entirely in the frontend and depends on external API endpoints.
