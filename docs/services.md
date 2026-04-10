# External Services and Integrations

## OTP authentication backend

The login page calls two external endpoints:

- `POST https://shantelle-arsino-fosteringly.ngrok-free.dev/request-otp`
- `POST https://shantelle-arsino-fosteringly.ngrok-free.dev/verify-otp`

These endpoints are used by `frontend/tradeaid/src/pages/login.tsx` for:

- requesting an OTP for a phone number
- verifying the entered OTP code

## Auth storage

On successful verification, `login.tsx` stores values in browser localStorage:

- `authToken`
- `user`

This is a frontend-only storage pattern.

## Third-party UI integrations

- `react-phone-number-input` provides phone input formatting and validation.
- `lucide-react` provides icons used in the dashboard sidebar.

## Notes

- The external backend URL is hard-coded in the frontend. For production use, move this to environment configuration.
- The current app does not include backend code in this repository.
