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
Account activation opens at `/activation/:activation_token`.

The frontend uses `http://localhost:8000/api/v2` when accessed locally. In
GitHub Codespaces, it derives the forwarded backend URL from the frontend
preview host. To override it, set `VITE_API_URL` in `frontend/.env.local`.

## Run the backend

Set the MongoDB and JWT values in `backend/config/.env`. Account activation email
also requires `SMPT_HOST`, `SMPT_PORT`, `SMPT_SERVICE`, `SMPT_MAIL`, and
`SMPT_PASSWORD`. For Gmail, use a Google App Password rather than your account
password. Keep credentials and signing secrets local; this file is ignored by
Git.

The user registration endpoint is `POST /api/v2/user/create-user`, and account
activation is `POST /api/v2/user/activation`.

Then run:

```sh
cd backend
npm install
npm run dev
```