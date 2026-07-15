# BuddyScript Social Feed

Full-stack implementation of the Appifylab selection task using React, Express, Prisma, and PostgreSQL. Source: [GitHub repository](https://github.com/AnwarHossainSR/appifylab-assesments).

## Features

- Registration, login, logout, and protected routes using an HTTP-only JWT cookie.
- Newest-first feed containing public posts plus the signed-in user's private posts.
- Text posts and optional Cloudinary-backed image posts.
- Post comments, one-level replies, like/unlike state, liker lists, and cursor-based load-more controls.
- Public/private post visibility, owner-only deletion, visible failure states, and keyboard-accessible modals.

## Architecture

- `client/`: React 19, Vite 8, React Router, and TanStack Query. Local development runs on `http://localhost:3000` and proxies `/api` to the server.
- `server/`: Express 5 API with Zod validation, JWT authentication, Prisma 7, and PostgreSQL. Default port: `4000`.
- `server/prisma/`: schema and migrations for users, posts, comments/replies, and normalized likes.
- `docker-compose.yml`: persistent development PostgreSQL on port `5433` and disposable test PostgreSQL on port `5434`.

## Prerequisites

- [Bun](https://bun.sh/) 1.3.14 or newer.
- Docker with Docker Compose.

## Local Setup

From the repository root in PowerShell:

```powershell
bun install
Copy-Item server/.env.example server/.env
docker compose up -d db
Set-Location server
bun run prisma:deploy
Set-Location ..
bun run dev
```

Open `http://localhost:3000`. The API listens on `http://localhost:4000`.

## Environment Variables

Server values live in `server/.env`:

| Variable | Purpose |
| --- | --- |
| `NODE_ENV` | `development`, `test`, or `production` |
| `PORT` | API port; defaults to `4000` |
| `CLIENT_ORIGIN` | trusted browser origin; local default is `http://localhost:3000` |
| `DATABASE_URL` | PostgreSQL connection URL |
| `JWT_SECRET` | token secret, minimum 32 characters |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |

Cloudinary values are optional only as a complete group. Text posts work without them; an image-post attempt returns `503` until all three are configured. Never commit real secrets.

For a separately hosted API, set client build variable `VITE_API_URL` to its origin. Local development needs no client variable because Vite proxies `/api`.

## Commands

| Location | Command | Purpose |
| --- | --- | --- |
| root | `bun run dev` | run client and server in watch mode |
| root | `bun run typecheck` | typecheck both workspaces |
| server | `bun run prisma:migrate` | create/apply a development migration |
| server | `bun run prisma:deploy` | apply committed migrations |
| server | `bun run test:db:up` | start disposable test PostgreSQL |
| server | `bun run test:db:migrate` | deploy migrations to the test DB |
| server | `bun run test` | run backend regression tests |
| server | `bun run build` | compile the API |
| client | `bun run lint` | lint the React client |
| client | `bun run build` | typecheck and build the client |

## API Summary

All routes use the `/api` prefix. Protected requests require the JWT cookie; browser requests include credentials.

- `/api/auth`: register, login, logout, and current-user (`/me`) operations.
- `/api/posts`: create/list/delete posts, like/unlike, paginated liker lists, and create/list comments.
- `/api/comments`: list replies, delete comments/replies, like/unlike, and paginated liker lists.

Post creation uses `multipart/form-data`; other request bodies are JSON. Main errors are `400` validation, `401` authentication, `404` missing or invisible resource, `409` duplicate registration, `429` auth rate limit, and `503` unavailable image storage.

## Security and Performance Decisions

- Shared visibility queries prevent access to another user's private posts and related comments/likes.
- Public user DTOs omit email and account timestamps; auth responses return the signed-in user's private fields.
- HTTP-only `SameSite=Lax` cookies, trusted-Origin mutation checks, security headers, and process-local auth rate limiting protect the API baseline.
- Image uploads are capped at 5 MB and checked by byte signature before Cloudinary upload.
- Unique database constraints plus conflict-safe writes keep likes idempotent under concurrent requests.
- Cursor pagination, bounded page sizes, indexed sort/filter fields, and stored counters avoid unbounded feed and relationship reads.
- Rate limiting is process-local; use a shared store such as Redis only when deploying multiple API instances.

## Verification

Run the complete command checkpoint:

```powershell
Set-Location server
bun run test:db:up
bun run test:db:migrate
bun run test
Set-Location ..
bun run typecheck
Set-Location client
bun run lint
bun run build
Set-Location ../server
bun run build
```
