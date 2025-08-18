# Getting Started

## 1. Environment Variables

You need to provide environment variables for both the frontend and backend.

**Frontend:**  
  Create a `.env` file in the project root (or `src/` if required). Example:
  - VITE_SUPABASE_URL=your-supabase-url 
  - VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

  
**Backend:**  
Create a `.env` file in the `api/` directory. Example:
DATABASE_URL, SUPABASE_URL, SUPABASE_PK


Check `.env.example` files if available for all required variables.

## 2. Install Dependencies

From the project root, run:

```sh
npm install
cd api && npm install && cd ../
```

## 3. Database and Backend Setup
Run Prisma migrations and typescript to set up your database and server:

```sh
npm run build
```
## 4. Running the App in Development
Run
```sh
npm run dev
```
  This starts the Vite dev server (usually at http://localhost:5173).
  This starts the Express server (usually at http://localhost:3000).

# Architecture

## Frontend

- Located in the root `src` directory.
- Built with **React** and **TypeScript**.
- Uses **Vite** as the build tool for fast development and HMR.
- **Tailwind CSS** is used for styling (see `@import "tailwindcss";` in `src/index.css`).
- UI is component-based, with reusable components in `ui`, hooks in `hooks`, and utility functions in `utils`.
- Authentication is handled via **Supabase** (see `supabaseClient.ts`).
- State management is local (React hooks), with data fetched from the backend via REST API.

## Backend

- Located in the `api` directory.
- Built with **Node.js** and **Express** (see `api/src/index.ts`).
- **Prisma ORM** is used for database access (see `api/prisma/schema.prisma`).
- API routes are organized using routers and controllers (see `apiRouter.ts`, `api/src/routers/bookRouter.ts`).
- Middleware for authentication and error handling.
- Serves static frontend files for production.

## Database

- Managed via **Prisma** migrations.
- I'm using **PostgreSQL** as a main DB(common with Prisma and Supabase).

## Authentication

- Uses **Supabase Auth** (OAuth with Google).
- Frontend gets a session and sends JWT tokens to backend for protected routes.

## Deployment

- Config files for **Vercel** deployment (`vercel.json`).
- Environment variables managed via `.env` files in both root and `api`.

# Technologies

## Frontend

- React, TypeScript, Vite, Tailwind CSS, Framer Motion (animations), Lucide React (icons), Radix UI (dialogs), Supabase JS SDK.

## Backend

- Node.js, Express, Prisma ORM, TypeScript.

## Database

- Likely PostgreSQL (via Prisma).

## Auth

- Supabase Auth (OAuth).

## Dev Tools

- ESLint (custom config), Prettier, Vercel for deployment.

# Key Decisions

- **Monorepo structure:** Frontend and backend are in the same repository but separated by folders.
- **API-first:** Frontend communicates with backend via REST API (`/api/books`), with JWT-based authentication.
- **Type safety:** TypeScript is used everywhere, including custom type definitions for Express (`api/src/types/express.d.ts`).
- **Modern UI/UX:** Uses Tailwind CSS, Framer Motion, and Radix UI for a polished, responsive interface.
- **Prisma ORM:** For type-safe database access and migrations.
- **Supabase:** For authentication and possibly as a managed database.
- **Vercel:** For easy deployment and serverless support.

# Summary

This is a modern, type-safe, full stack React + Node.js app with a REST API backend, Supabase authentication, Prisma ORM, and Tailwind CSS for styling, structured for easy deployment and scalability.

---

## Key files and folders

- **Frontend:** `src`
- **Backend:** `api`
- **Shared types:** `types.ts`
- **Auth:** `supabaseClient.ts`
- **Database:** `schema.prisma`
