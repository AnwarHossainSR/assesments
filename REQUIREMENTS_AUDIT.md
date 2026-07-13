# Appifylab Selection Task Requirements Audit

**Audit date:** 2026-07-13
**Checkpoint:** Backend remediation plan 1 of 3 complete
**Scope:** React client, Express API, Prisma/PostgreSQL, configuration, security, UX, tests, documentation, and deliverables.

## Verdict

**Backend checkpoint passed. Overall submission is not ready yet.**

Privacy, public DTO exposure, concurrent likes, request security, upload validation, auth conflict handling, and repeatable database tests are remediated. Remaining submission work is mainly frontend UX/accessibility, project documentation, real Cloudinary upload proof, visual browser QA, and required video evidence.

## Verified Evidence

Executed on 2026-07-13:

- PASS - disposable PostgreSQL test service running on port 5434.
- PASS - Prisma test migration deployed; no pending migrations.
- PASS - backend suite: 15 tests, 41 assertions, 0 failures across 7 files.
- PASS - root workspace typecheck; client and server both exited 0.
- PASS - client production build (`tsc -b && vite build`).
- PASS - server production build (`tsc`).
- PASS - client lint with 0 errors and 1 existing Fast Refresh warning in `AuthContext.tsx`.
- PASS - API health smoke returned 200.
- PASS - unauthenticated `/api/posts` smoke returned 401.
- PASS - hostile-Origin mutation smoke returned 403.
- PASS - current local environment satisfies the stricter environment schema.

Not verified by this checkpoint:

- Real Cloudinary credentials and successful live image upload.
- Full register/login/logout browser journey.
- Desktop/mobile visual parity and browser interactions.
- YouTube walkthrough and live deployment.

## Requirement Coverage

### Frontend and provided design

- **React.js or Next.js:** PASS. React 19 + Vite client exists.
- **Login, Register, Feed converted to React:** PASS by static inspection and successful client build.
- **Stick to provided design:** PARTIAL/UNVERIFIED. Existing pages reuse supplied structure, classes, CSS, and assets. Browser visual comparison remains open.

### Authentication and authorization

- **Registration fields:** PASS. First name, last name, email, and password are validated; password uses bcrypt.
- **Sign up and log in:** IMPLEMENTED, PARTIALLY VERIFIED. Registration conflict behavior is integration-tested. Full happy-path API/browser auth remains open.
- **Feed protected:** PASS. Client route guard exists; API smoke proves unauthenticated feed returns 401.
- **Private posts author-only:** PASS for backend services. Two-user integration tests cover feed, post delete, post likes/likers, comments, replies, comment delete, and comment likes/likers. Invisible resources return 404.
- **Public profile privacy:** PASS. Public post/comment/liker DTOs omit email and account timestamps; self auth DTO retains them.
- **Request security:** PASS for implemented baseline. Mutations reject hostile Origins, cookies use `HttpOnly` and `SameSite=Lax`, auth endpoints are rate-limited, and security headers are applied.
- **No forgot-password feature needed:** PASS functionally. Inert UI copy still needs UX cleanup.

### Feed

- **All users see all public posts:** PASS by service implementation and visibility tests.
- **Newest posts first:** PASS by static inspection: `createdAt DESC, id DESC` with cursor pagination.
- **Create text posts:** PASS at service level through integration tests.
- **Create image posts:** PARTIAL. Five-megabyte limit, byte-signature validation, all-or-none Cloudinary config, and clear 503 behavior are implemented. Real upload remains unverified.
- **Like/unlike posts:** PASS. Unique rows and counters remain correct under parallel duplicate like/unlike calls.
- **Comments:** PASS for create/list authorization paths covered by integration tests.
- **Replies:** PARTIAL. Backend one-level reply flow and privacy guards exist; frontend exposes only the first reply page.
- **Like/unlike comments and replies:** PASS for backend idempotence and privacy guards.
- **Show who liked content:** PARTIAL. Backend pagination and authorization exist; frontend has no load-more control.
- **Public/private visibility:** PASS for backend authorization matrix.

### Engineering considerations

- **Development practices:** IMPROVED. Strict TypeScript, service separation, disposable test DB, and 15 backend tests now pass. CI is still absent.
- **Security:** PASS for planned backend remediation. Remaining hardening includes CSP design, JWT issuer/audience, distributed rate limiting if horizontally scaled, and deployment review.
- **UX:** PARTIAL. Main flows exist, but several mutation/query errors are hidden and visible controls remain inert.
- **Database modeling:** PASS for current scope. Foreign keys, cascades, unique likes, indexes, counters, and migrated test schema are verified.
- **Millions of posts/reads:** PARTIAL. Cursor pagination, caps, indexes, and counters are sensible. Query-plan/load evidence and frontend request reduction remain open.

### Deliverables

- **GitHub repository:** PASS. Git remote exists.
- **YouTube walkthrough:** NOT EVIDENCED.
- **Live deployment:** NOT EVIDENCED; recommended, not mandatory.
- **Brief documentation:** FAIL. Root README remains insufficient; client README remains template content.

## Resolved Backend Findings

### Private-resource authorization

Resolved with one shared visibility policy used by posts, comments, replies, likes, and liker lists. Integration tests prove another user cannot access private-post resources.

### Public email exposure

Resolved by splitting `PublicUser` and `SelfUser`. Feed, comment, and liker responses use public fields only.

### Repeatable database tests

Resolved with disposable PostgreSQL Compose service, guarded test helpers, migration scripts, and backend regression tests.

### Duplicate-like transaction failure

Resolved using conflict-safe `createMany({ skipDuplicates: true })`. Counters change only when a like row is inserted; concurrent post/comment like tests pass.

### CSRF-style cross-origin mutations and API hardening

Resolved for the planned baseline with trusted-Origin validation, `SameSite=Lax`, auth rate limiting, security headers, and JSON 404 responses.

### Upload and registration validation

Resolved with all-or-none Cloudinary config, image signature checks, clear missing-storage 503, malformed JSON/Multer mappings, stronger JWT secret minimum, and Prisma P2002-to-409 mapping.

## Remaining Prioritized Work

### P0 - Submission evidence and operational image upload

1. Configure real Cloudinary credentials and verify valid image upload, fake image rejection, and over-5-MB rejection end to end.
2. Add required brief project documentation: architecture, prerequisites, environment variables, migrations, run/test commands, API summary, tradeoffs, and links.
3. Record and link the required YouTube walkthrough.

### P1 - Frontend completeness

1. Add load-more controls for liker and reply pagination using existing query state.
2. Render feed/query/mutation errors, preserve input after failure, add retry, and centralize 401 logout/redirect behavior.
3. Fetch liker details only when modal opens; current per-post preview can create N extra requests.
4. Complete modal accessibility: focus trap, Escape, focus restoration, and `aria-modal`.
5. Make out-of-scope controls visibly unavailable or non-interactive: Google auth, forgot password, share, video, event, article, search, follow, notifications, and chat.
6. Run desktop/mobile browser QA against provided design.

### P1 - Additional confidence

1. Add happy-path register/login/logout API tests and client auth redirect smoke tests.
2. Add cursor-boundary tests with identical timestamps and fuller comment/reply counter tests.
3. Add CI for tests, typechecks, lint, and builds.
4. Verify development/deployment migration workflow outside disposable test DB.

### P2 - Scale and deployment

1. Capture `EXPLAIN ANALYZE` evidence for the public-plus-own-private feed query.
2. Add load tests only when target throughput is defined.
3. Add structured logs, request IDs, monitoring, and graceful shutdown for production deployment.
4. Replace process-local rate limiting with Redis only when running multiple API instances.
5. Add live deployment URL if time permits.

### P2 - Repository cleanup

1. Replace root and client template READMEs with project documentation.
2. Remove or implement the broken `db:seed` script.
3. Change client document title from `client`.
4. Preserve supplied HTML/assets until submission expectations are confirmed; archive or delete afterward.

## Backend Remediation Commits

- `9921b45` - disposable PostgreSQL test harness.
- `fc93892` - public/self user DTO split.
- `50249aa` - shared visibility policy.
- `d105058` - private-resource authorization.
- `fb443f1` - concurrent like idempotence.
- `6918cd3` - request security middleware.
- `8d71e49` - upload, environment, and auth conflict validation.

## Final Checkpoint

Backend remediation plan 1 is complete and verified. Do not mark full selection task complete until frontend remediation, documentation, real image upload evidence, visual QA, and video deliverable are finished.
