# Dependencies

## Runtime dependencies

- `react` — core React library
- `react-dom` — React DOM rendering
- `react-router-dom` — routing for single-page application navigation
- `bootstrap` — CSS framework used for styling
- `react-bootstrap` — React components for Bootstrap
- `lucide-react` — icon library used in the dashboard sidebar
- `react-phone-number-input` — phone number input component for login page

## Development dependencies

- `typescript` — static typing for React
- `vite` — build tooling and dev server
- `@vitejs/plugin-react` — React support within Vite
- `eslint` — linting engine
- `@eslint/js` — ESLint core package for JavaScript
- `eslint-plugin-react-hooks` — rules for React hooks usage
- `eslint-plugin-react-refresh` — React Fast Refresh integration
- `@types/react`, `@types/react-dom`, `@types/node` — TypeScript type definitions
- `@babel/core`, `@rolldown/plugin-babel`, `babel-plugin-react-compiler` — Babel tooling for custom compilation
- `typescript-eslint` — TypeScript linting rules
- `globals` — global variables used by ESLint config

## Package notes

- The repository uses `type: "module"` in `package.json`, so imports and tooling operate in ESM mode.
- `npm run build` executes `tsc -b` before `vite build`, enforcing TypeScript checks and bundling.
