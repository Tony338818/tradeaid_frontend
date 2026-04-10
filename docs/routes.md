# Routes and Navigation

## Defined client routes

All client routes are defined in `frontend/tradeaid/src/App.tsx` using React Router v7.

### Routes

- `/` — `LandingPage`
- `/login` — `LoginPage`
- `/dashboard` — `Dashboard`

## Navigation flow

- The landing page UI navigates to `/login` via `useNavigate()`.
- The login page performs phone validation and OTP verification.
- After successful OTP verification, the app currently stores auth data in `localStorage` but does not automatically redirect to `/dashboard`.

## Navigation components

- `frontend/tradeaid/src/components/side_nav.tsx` renders a static sidebar for the dashboard.
- The sidebar contains sections for "GENERAL" and "HELP & SETTINGS" but does not yet provide active route links.

## Route responsibilities

- `LandingPage` — marketing homepage, user onboarding CTA
- `LoginPage` — handles auth state, OTP timing, error messages, and backend integration
- `Dashboard` — shell layout for secure content and navigation
