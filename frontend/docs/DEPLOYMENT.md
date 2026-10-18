# NashaPrahari Deployment and Environment Guide

**Document ID:** NP-DEPLOY-001\
**Version:** 0.1 --- Draft / Proposed\
**Status:** Deployment guide template; adapt to the actual repository
and hosting decisions\
**Project:** NashaPrahari --- Field Testing Companion

> **Important:** This document describes a repeatable deployment
> process, not a claim that deployment infrastructure already exists.
> Confirm repository scripts, backend entry points, database migrations,
> hosting provider, environment variables, and production requirements
> before running commands or publishing the application.

------------------------------------------------------------------------

## 1. Purpose

This guide explains how to prepare a local development environment,
configure the frontend and backend, connect a database, validate a
release, and deploy NashaPrahari safely.

The current project plan identifies:

-   Frontend: React + TypeScript + Vite.
-   Backend: Python + FastAPI, planned with the backend teammate.
-   Database: PostgreSQL, planned.
-   Frontend directory: `frontend/`.

These are planning details that must be checked against the current
repository. The backend repository location, deployment provider,
domain, CI/CD workflow, and production database are not confirmed by
this document.

## 2. Deployment principles

-   Keep development, testing, staging, and production environments
    separate.
-   Use environment variables or a secret manager for configuration;
    never commit secrets.
-   Treat frontend environment variables as public. Vite variables
    prefixed with `VITE_` are bundled into client code.
-   Do not run destructive migrations or seed scripts against production
    without an approved procedure and backup.
-   Deploy only a tested build.
-   Do not claim a successful deployment until the deployed URL and
    critical workflows have been verified.
-   Do not deploy demo records or mock behavior as though they were real
    system capabilities.
-   Prefer repeatable, documented steps over manual changes that cannot
    be reproduced.
-   Define rollback and recovery steps before the first production
    release.

## 3. Repository discovery

Before setting up or deploying:

1.  Inspect the repository root and `frontend/`.
2.  Read `package.json`, the lockfile, Vite configuration, TypeScript
    configuration, and `.gitignore`.
3.  Check the package manager and scripts that actually exist.
4.  Locate the FastAPI application entry point and Python dependency
    file in the backend repository, if available.
5.  Inspect database migration tooling and current schema before
    applying changes.
6.  Identify the chosen hosting provider and its build/start
    requirements.
7.  Check Git status so local work is not overwritten.
8.  Record current working commands and any pre-existing failures.

Do not assume the backend is inside the frontend repository. Do not
create a second backend entry point or migration system without checking
with the backend owner.

## 4. Local development prerequisites

Install supported versions of the tools required by the actual
repository:

-   Node.js and the chosen package manager for the frontend.
-   Python and the project's chosen dependency/environment manager for
    FastAPI.
-   PostgreSQL, or an approved development database service, if the
    backend requires it.
-   Git and any project-specific tooling.

Use versions documented by the project or lockfiles where available. Do
not upgrade major versions solely to resolve an unrelated problem.

## 5. Frontend setup

Run commands from the `frontend/` directory unless the actual repository
instructions say otherwise.

### 5.1 Install dependencies

Use the package manager that matches the committed lockfile. For an npm
project, a typical command is:

``` bash
npm ci
```

If the project uses another package manager, follow its documented
frozen/locked install command instead. Do not delete the lockfile merely
to make installation succeed.

### 5.2 Configure the API base URL

A local-only example might be:

``` text
# frontend/.env.local
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

The URL is illustrative. Confirm the backend host, port, and API prefix
with the backend owner.

Rules:

-   Vite exposes `VITE_` variables to client-side code; do not put
    secrets there.
-   Keep `.env.local` out of Git.
-   Provide a safe `.env.example` with placeholders only.
-   Restart the Vite dev server after changing environment variables.
-   If the backend is not available, use a clearly labeled demo mode
    only if the product explicitly supports it. Do not silently
    substitute mock data for live API failures.

### 5.3 Start the frontend

A typical Vite command is:

``` bash
npm run dev
```

Use the actual script defined in `package.json`. Confirm the URL shown
in the terminal rather than assuming a fixed port.

### 5.4 Build verification

Run the scripts that are present in `package.json`. Typical examples
are:

``` bash
npm run build
npm run test
npm run lint
```

These are examples; a script may not exist. Inspect `npm run` output and
report any unavailable check accurately.

## 6. Backend setup

The exact commands depend on the backend repository and dependency
manager. Do not invent an entry-point module name or create a new
environment layout without inspecting the backend.

A typical Python virtual environment flow on Windows is:

``` powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

On macOS/Linux, activation commonly uses:

``` bash
python -m venv .venv
source .venv/bin/activate
```

Install dependencies using the backend's committed dependency
specification and documented command. For example,
`pip install -r requirements.txt` is appropriate only if that file
exists and is the team's chosen method.

Before starting FastAPI, confirm:

-   The actual application module and ASGI variable.
-   Required environment variables.
-   Database connection configuration.
-   Migration status.
-   CORS origins for local frontend development.
-   Authentication configuration, if implemented.

Use the backend owner's documented start command. Do not guess an
`uvicorn` module path.

## 7. Database setup and migrations

PostgreSQL is planned, but the actual schema, migration tool, and
database hosting arrangement must be confirmed.

Recommended workflow:

1.  Create a dedicated development database or isolated database
    instance.
2.  Configure the backend connection through protected environment
    configuration.
3.  Inspect existing migrations and current schema.
4.  Apply migrations using the repository's chosen migration tool.
5.  Run schema and repository tests.
6.  Load only synthetic seed data where the project supports it.
7.  Verify that the application can read and write expected test
    records.
8.  Document backup and restore steps before using important persistent
    data.

Migration safety rules:

-   Never manually alter production schema without the approved change
    process.
-   Do not rewrite an already-applied migration to change its meaning.
-   Review destructive operations such as column drops and data
    transformations.
-   Test migrations on a copy or staging database first.
-   Take and verify a backup before a risky production migration.
-   Define what happens if a migration fails halfway through.
-   Ensure rollback procedures account for both code and schema
    compatibility.
-   Do not run seed scripts that overwrite or delete real data.

## 8. Environment separation

Use separate configuration and credentials for each environment.

  -----------------------------------------------------------------------
  Environment             Purpose                 Data and secrets
  ----------------------- ----------------------- -----------------------
  Local development       Individual coding and   Synthetic data;
                          debugging               local-only credentials

  Automated test          Repeatable checks       Disposable test data
                                                  and isolated services

  Staging                 Release rehearsal       Synthetic or approved
                                                  sanitized data; staging
                                                  credentials

  Production              Real operational use,   Production secrets,
                          if authorized           restricted access,
                                                  approved data handling
  -----------------------------------------------------------------------

Do not reuse production secrets in development or staging. Keep
environment-specific URLs out of hard-coded application components.

Maintain an `.env.example` for each service that lists variable names
and safe placeholders, but never real values. Document required versus
optional variables and who owns each secret.

## 9. Production build and hosting

The deployment platform has not been selected in this document. Before
choosing or configuring a provider, confirm:

-   Whether the frontend is static-hosted or served by another
    application.
-   How the FastAPI service is built, started, and health-checked.
-   Where PostgreSQL is hosted and how private networking is configured.
-   Domain names, TLS certificates, and allowed origins.
-   Secret management and access controls.
-   Logs, metrics, alerting, and retention.
-   Backup schedules and restore testing.
-   Regional/data-residency requirements, if applicable.
-   Release approval and rollback ownership.

### Frontend deployment

For a typical Vite project, the production build output is often
`dist/`; verify the actual Vite configuration. The host must serve the
built static assets and correctly handle client-side routes if React
Router is used.

Check that:

-   The build succeeds from a clean dependency install.
-   The configured API URL points to the intended backend.
-   No development-only server or mock endpoint is embedded in
    production.
-   Refreshing a nested route works.
-   Browser console and network panels show no critical errors.
-   Cache headers do not prevent newly released assets from loading
    correctly.

### Backend deployment

Use the backend's documented production ASGI command and
provider-specific configuration. Do not run a development reload server
in production.

Check that:

-   The process binds to the host/port required by the provider.
-   Secrets are injected securely.
-   Database connections use least-privilege credentials.
-   CORS allows only approved frontend origins.
-   HTTPS is enforced at the appropriate boundary.
-   Health/readiness checks reflect real service readiness, including
    database availability where appropriate.
-   Logs avoid secrets and sensitive evidence.
-   Worker count and resource limits are selected for the actual host
    and workload.

### Database deployment

-   Keep the database private where the architecture allows.
-   Restrict network access and use dedicated credentials.
-   Configure backups and verify restoration.
-   Monitor capacity, connection usage, and failed operations.
-   Apply migrations through the approved release process.
-   Do not expose database credentials or connection strings to the
    browser.

## 10. Continuous integration and release workflow

If CI/CD is configured, the proposed pipeline is:

1.  Install dependencies from committed lockfiles.
2.  Run formatting/lint checks that are configured.
3.  Run type checks and unit/component tests.
4.  Run backend tests and migration checks where available.
5.  Build the frontend and backend artifacts.
6.  Scan dependencies and secrets using approved tooling.
7.  Publish a staging build.
8.  Run smoke and integration tests.
9.  Obtain the required release approval.
10. Deploy to production and run post-deployment checks.
11. Record the release version and any known limitations.

Do not add a new CI provider or workflow until the repository and team
preferences have been inspected. A green pipeline is useful evidence,
but does not prove every security or product requirement is satisfied.

## 11. Smoke test after deployment

Use this checklist after every release:

-   [ ] Deployed frontend URL loads over HTTPS where required.
-   [ ] Static assets load without critical errors.
-   [ ] Main navigation and direct nested-route refresh work.
-   [ ] API base URL points to the intended environment.
-   [ ] Backend health/readiness check returns the expected result.
-   [ ] Database connectivity works where required.
-   [ ] An approved read workflow succeeds.
-   [ ] An approved write workflow succeeds and persists data, if
    implemented.
-   [ ] Invalid input returns a safe, useful error.
-   [ ] Unauthorized access is rejected, if authentication is
    implemented.
-   [ ] No fake sync, verification, or laboratory-confirmation state
    appears.
-   [ ] Logs and browser output contain no secrets or unnecessary
    sensitive data.
-   [ ] Responsive layout remains usable on supported screen sizes.
-   [ ] Monitoring and alerting are functioning if configured.

Record which checks were skipped and why. Do not mark a check as passed
without actually running it.

## 12. Rollback and recovery

Before production deployment, document:

-   Previous known-good frontend and backend release identifiers.
-   How to restore the prior application version.
-   Whether database migrations are backward compatible.
-   How to restore database backups and verify restored data.
-   Who can approve and execute rollback.
-   How to communicate an incident to the team.
-   How to prevent old code from running against an incompatible schema.

Rolling back application code may not reverse a database migration.
Prefer expand-and-contract migrations where practical: add compatible
schema first, deploy compatible code, migrate data if needed, and remove
old schema only in a later approved release.

Never test recovery for the first time during a live incident.

## 13. Common deployment problems

### Frontend loads but API calls fail

Check the configured API base URL, backend availability, CORS policy,
HTTPS/mixed-content errors, and browser network panel. Do not assume a
frontend build failure is the cause.

### API works locally but fails after deployment

Check provider start command, injected environment variables, port
binding, database connectivity, TLS, allowed origins, and deployment
logs. Redact secrets before sharing logs.

### React Router routes fail on refresh

Configure the static host to serve the application entry point for
supported client-side routes while still returning proper responses for
actual assets and API routes.

### Database migration fails

Stop repeated attempts until the current schema and migration state are
understood. Inspect the error and migration history, take a backup if
data could be affected, and involve the database/backend owner.

### Production shows demo records

Inspect environment configuration and mock-data selection. Do not hide
the issue by silently replacing live failures with local data; correct
the configuration and verify the data source.

## 14. Release record template

For each release, record:

-   Release/version identifier:
-   Date and environment:
-   Source commit:
-   Frontend build result:
-   Backend test/build result:
-   Migration applied and result:
-   Smoke tests run:
-   Known issues and skipped checks:
-   Backup/rollback readiness:
-   Approver:
-   Deployment result:
-   Post-deployment verification:

Do not include credentials, private keys, tokens, or unnecessary
personal data in the release record.

## 15. Instructions for Antigravity agents

1.  Inspect repository scripts, environment files, deployment
    configuration, and backend instructions before proposing commands.
2.  Reuse the existing package manager, lockfiles, migration tool, and
    CI setup.
3.  Never invent a hosting provider, domain, secret, database URL, or
    backend entry point.
4.  Never place secrets in frontend code, prompts, screenshots, or Git.
5.  Do not run destructive commands or production migrations without
    explicit authorization.
6.  Keep mock/demo behavior clearly separated from production
    configuration.
7.  Run the available checks and report actual commands and results.
8.  Verify deployed behavior before reporting a successful release.
9.  If infrastructure or access is unavailable, document the blocker and
    provide the exact information needed.
10. Do not commit, push, deploy, or change shared/production resources
    without explicit authorization.

------------------------------------------------------------------------

## 16. Related project documents

Keep this guide aligned with:

-   `PROJECT_REQUIREMENTS.md` --- approved product scope.
-   `DESIGN.md` --- UI and interaction requirements.
-   `ARCHITECTURE.md` --- service boundaries and deployment topology.
-   `DATABASE.md` --- schema and migration considerations.
-   `API.md` --- endpoint contracts.
-   `TESTING.md` --- verification workflow.
-   `SECURITY.md` --- security and privacy controls.

**End of Deployment and Environment Guide**
