# MERN Multi-Vendor Project

## Project structure

- `frontend/` contains the React, Vite, and Tailwind CSS application.
- `backend/` contains the Express API and MongoDB setup.

## Run the frontend

```sh
cd frontend
npm install
npm run dev
```

The login and signup pages are available at `/login` and `/sign-up`.

## Run the backend

Set the MongoDB and JWT values in `backend/config/.env`. Account activation email
also requires `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, and `SMTP_PASSWORD`.
Optionally set `SMTP_SECURE`, `SMTP_FROM`, and `FRONTEND_URL`. Keep credentials
and signing secrets local; this file is ignored by Git.

The user registration endpoint is `POST /api/v2/user/create-user`, and account
activation is `POST /api/v2/user/activation`.

Then run:

```sh
cd backend
npm install
npm run dev
```