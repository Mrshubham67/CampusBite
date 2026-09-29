# CampusBite

CampusBite is a college canteen ordering application built with React, Express, and MongoDB. Users can register and log in; authenticated admins manage food categories and items. Ordering is planned for a later phase.

## Requirements

- Node.js 20 or newer
- npm
- A MongoDB Atlas cluster reachable from the development machine

## Install

From the project root:

```powershell
npm.cmd install
```

## Configure environment

Create the backend env file from the placeholder template:

```powershell
Copy-Item .env.example server/.env
```

Set `MONGODB_URI`, `CLIENT_URL`, and `PORT` in `server/.env`. Generate a private JWT secret and replace the blank example value without printing the secret or changing the file encoding:

```powershell
$jwtSecret = node -e "process.stdout.write(require('node:crypto').randomBytes(48).toString('base64url'))"
$envText = (Get-Content server/.env -Raw) -replace '(?m)^JWT_SECRET=.*$', "JWT_SECRET=$jwtSecret"
[System.IO.File]::WriteAllText((Resolve-Path server/.env), $envText, [System.Text.UTF8Encoding]::new($false))
Remove-Variable jwtSecret, envText
```

`JWT_SECRET` must be at least 32 characters. `JWT_EXPIRES_IN` is optional and defaults to `1h`. Keep secrets only in ignored env files; never commit them.

For Atlas, create a cluster and database user, allow your development IP under **Network Access**, and copy the Node.js driver URI into `MONGODB_URI`. URL-encode reserved characters in the database username or password.

The client has a separate placeholder file at `client/.env.example`. For local development, copy it to `client/.env.local`; its `VITE_API_URL` points to the local backend. For production, replace that value with the deployed Render API base URL including `/api`. The frontend reads this setting directly through `import.meta.env.VITE_API_URL`.

## Run locally

Run each command in a separate terminal from the project root:

```powershell
npm.cmd run dev:server
npm.cmd run dev:client
```

Vite prints the frontend address, normally `http://localhost:5173`. The backend requires both a reachable MongoDB connection and a valid `JWT_SECRET` before it starts listening.

## Authentication

- Register at `/register`; public registration always creates a `user` role.
- Log in at `/login`; the browser keeps the JWT in session storage and sends it as a Bearer token.
- `GET /api/auth/me` returns the current authenticated user.
- Invalid or expired tokens return HTTP 401 and clear the browser session.
- The `/admin` page and all Category/Food write operations require an authenticated `admin`.
- To create the first admin, register a user and change that user's `role` to `admin` using trusted access in Atlas or MongoDB Compass. Do not add a public admin-registration flow.

Passwords are hashed with bcrypt. Password hashes are not included in API responses. Category and food reads are public; create, update, and delete routes require admin authorization. No order routes exist yet.

## Verify the API

Check server and database status:

```powershell
Invoke-RestMethod -Uri http://localhost:5000/api/health
```

A successful response reports `api.status` as `ok` and `database.status` as `connected`. Category and food endpoints are under `/api/categories` and `/api/foods`; writes require `Authorization: Bearer <admin-token>`.

## Deployment configuration

For a same-origin deployment, route `/api` to the Express server. For a separately hosted frontend and backend, set `VITE_API_URL` to the deployed API base URL including `/api` when building the frontend, and set `CLIENT_URL` to the frontend origin on the backend. Production CORS does not allow the localhost development origin unless explicitly configured. Use HTTPS.

## Project structure

```text
campusbite/
├── client/
│   ├── .env.example
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       │   ├── Brand/Brand.jsx + Brand.css
│       │   ├── Footer/Footer.jsx + Footer.css
│       │   ├── Navbar/Navbar.jsx + Navbar.css
│       │   ├── ProtectedRoute/ProtectedRoute.jsx + ProtectedRoute.css
│       │   └── SiteLayout/SiteLayout.jsx + SiteLayout.css
│       ├── context/AuthContext.jsx
│       ├── pages/
│       │   ├── AdminPage/AdminPage.jsx + AdminPage.css
│       │   ├── AuthPage/AuthPage.jsx + AuthPage.css
│       │   ├── HomePage/HomePage.jsx + HomePage.css
│       │   ├── MenuPage/MenuPage.jsx + MenuPage.css
│       │   └── NotFoundPage/NotFoundPage.jsx + NotFoundPage.css
│       ├── routes/AppRoutes.jsx
│       ├── services/api.js
│       ├── services/authApi.js
│       ├── App.jsx
│       ├── global.css
│       └── main.jsx
├── server/
│   ├── config/database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── categoryController.js
│   │   ├── foodController.js
│   │   └── healthController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── Category.js
│   │   ├── Food.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── foodRoutes.js
│   │   └── healthRoutes.js
│   ├── utils/
│   ├── app.js
│   └── server.js
├── .env.example
├── .gitignore
├── package-lock.json
└── package.json
```

## Current limitations

- Menu browsing and ordering are not implemented.
- The admin page is protected but does not yet provide a category/food management UI.
- Admin role promotion is a trusted database operation.
- JWTs are stored in session storage; deploy over HTTPS and protect against script injection.
- User orders, reviews, and offers remain future work.
