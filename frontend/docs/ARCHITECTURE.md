# NashaPrahari --- System Architecture Document

**Document ID:** NP-ARCH-001\
**Version:** 0.1\
**Status:** Draft --- proposed architecture baseline\
**Last updated:** 17 October 2026

> **Important:** This document describes the intended architecture, not
> a claim that every component exists. The known project direction is a
> React + TypeScript + Vite frontend and a Python + FastAPI + PostgreSQL
> backend. Verify the repository and coordinate with the backend
> teammate before treating any proposed interface as final.

## 1. Purpose

Define the system boundaries, responsibilities, data flow, deployment
direction, and architectural constraints for NashaPrahari. This document
is the shared reference for frontend and backend contributors and for
coding agents.

## 2. Architecture Goals

-   Keep the frontend, backend, and persistence responsibilities
    separate.
-   Support maintainable development in small, testable phases.
-   Make the UI usable on desktop and mobile-sized screens.
-   Distinguish demonstration data from real server data.
-   Design explicit API contracts before connecting the frontend to the
    backend.
-   Prevent mock UI behavior from being mistaken for real operational
    capability.
-   Add authentication, synchronization, auditability, and external
    integrations only against approved requirements.

## 3. Known and Proposed Technology

  -----------------------------------------------------------------------
  Layer                   Direction               Confidence / action
  ----------------------- ----------------------- -----------------------
  Frontend                React + TypeScript +    Existing project
                          Vite                    direction; verify
                                                  current files

  Client routing          React Router            Previously identified;
                                                  inspect package and
                                                  routes

  Backend                 Python + FastAPI        Backend teammate's
                                                  planned stack;
                                                  coordinate

  Database                PostgreSQL              Planned persistence
                                                  layer; confirm schema
                                                  and deployment

  Design references       Google Stitch HTML      Available in the
                          exports                 project's `Design/`
                                                  directory

  Version control         Git / private GitHub    Do not commit or push
                          repository              without authorization
  -----------------------------------------------------------------------

Do not add a state-management framework, ORM, queue, cache, cloud
service, or new database until a concrete requirement justifies it.

## 4. Logical Architecture

The intended high-level request flow is:

``` text
User
  |
  v
React + TypeScript Web Client
  |  UI components, routes, forms, view state
  v
Frontend API Client / Service Layer
  |  HTTP requests to a documented API contract
  v
FastAPI Backend
  |  authentication, authorization, validation, business rules
  v
Persistence / Data Access Layer
  |
  v
PostgreSQL
```

Cross-cutting concerns: - Configuration and secrets management. -
Structured error handling and logging. - Input validation. - Automated
tests and build checks. - Authentication and authorization, when
approved and implemented. - Audit events and synchronization only when
their requirements and designs are established.

This is a proposed logical architecture. It must be reconciled with the
actual repository and the backend teammate's implementation.

## 5. Component Responsibilities

### 5.1 Frontend

Responsible for: - Rendering the approved design system. - Navigation
and responsive behavior. - Form input and client-side validation for
usability. - Displaying records and their explicitly defined statuses. -
Loading, empty, unavailable, and error states. - Calling documented
backend endpoints through a service/client layer. - Avoiding hardcoded
production data in UI components.

Not responsible for: - Enforcing security solely through hidden
buttons. - Making authoritative authorization decisions. - Claiming a
write succeeded before the backend confirms it. - Treating a presumptive
test outcome as a confirmatory laboratory result.

### 5.2 Backend

The planned FastAPI service should be responsible for: - Exposing
versioned or otherwise stable documented HTTP endpoints. - Validating
request payloads and domain rules. - Authenticating callers when
authentication is implemented. - Enforcing authorization on every
protected operation. - Coordinating persistence through a data-access
layer. - Returning consistent success and error responses. - Applying
transaction boundaries where multiple database changes must succeed
together. - Avoiding exposure of secrets and unnecessary sensitive data
in logs.

Exact endpoint names, authentication method, ORM, and service structure
remain to be decided with the backend owner.

### 5.3 Database

PostgreSQL is the planned system of record. The schema, migrations,
constraints, indexes, retention rules, and audit model must be
documented before production data flows are finalized.

The frontend must not connect directly to PostgreSQL.

### 5.4 Design exports

The Stitch HTML files are reference assets. They should not be served as
a separate application or treated as the React source of truth. Preserve
them for comparison during implementation.

## 6. Proposed Frontend Structure

Adapt this proposal to the actual repository instead of forcing a
rewrite:

``` text
frontend/
├── public/
├── src/
│   ├── app/             # App shell, router, app-level setup
│   ├── components/      # Reusable UI components
│   ├── features/        # Feature-oriented screens and logic
│   ├── pages/           # Route pages, if consistent with current project
│   ├── services/        # API client and endpoint services
│   ├── types/           # Shared frontend types
│   ├── data/            # Clearly labelled demo data only
│   ├── styles/          # Global styles and design tokens
│   └── main.tsx
├── package.json
└── vite.config.ts
```

Do not create both `features/` and `pages/` as competing architectures
without a reason. Follow existing conventions where they are already
coherent.

## 7. Proposed Backend Structure

The backend owner should adapt this proposal to the actual
implementation:

``` text
backend/
├── app/
│   ├── main.py
│   ├── api/             # Route definitions
│   ├── schemas/         # Request and response models
│   ├── models/          # Persistence models
│   ├── services/        # Domain/business logic
│   ├── repositories/    # Database access, if justified
│   ├── core/            # Configuration and security
│   └── db/              # Session and migration integration
├── tests/
├── migrations/          # If using a migration tool
├── requirements.txt or pyproject.toml
└── README.md
```

This is illustrative. Do not create files until the backend repository
and its conventions have been inspected.

## 8. Data Flow and Error Handling

For a frontend operation that uses the backend:

1.  User initiates an action.
2.  Frontend validates basic input for usability.
3.  Frontend sends a request using the documented API contract.
4.  Backend authenticates and authorizes the caller where required.
5.  Backend validates input and applies business rules.
6.  Backend performs persistence within appropriate transaction
    boundaries.
7.  Backend returns a documented response or error.
8.  Frontend updates the UI only according to the actual response.
9.  Frontend displays a truthful success, pending, or failure state.

Never display success before a write or synchronization has been
confirmed. If a request times out, do not assume it failed or succeeded;
follow the API's idempotency and retry policy once defined.

## 9. Authentication and Trust Boundaries

-   The browser is an untrusted client.
-   Client-side route guards improve navigation but do not replace
    backend authorization.
-   The backend must enforce permissions for protected records and
    operations.
-   Secrets must remain in appropriate server-side configuration, not
    frontend bundles.
-   CORS should be restricted to approved origins in deployed
    environments.
-   Production transport should use HTTPS.
-   Do not store sensitive authentication tokens in browser storage
    without a reviewed threat model.
-   Do not claim that data is encrypted at rest, locally encrypted,
    signed, or tamper-proof until the implementation and configuration
    have been verified.

See `SECURITY.md` for detailed requirements.

## 10. Offline Operation and Synchronization

Offline-first behavior is **not assumed to exist** merely because it
appears in a Stitch design.

Before implementing it, define: - Which actions must work offline. -
What data is stored locally. - How local data is protected. - Stable
record identifiers. - Pending/synchronized/failed states. - Retry and
backoff policy. - Idempotency and duplicate prevention. - Conflict
detection and resolution. - What happens if the server accepts a request
but the response is lost. - How users can identify stale or
unsynchronized records. - Audit requirements and retention behavior.

Do not mark a record synchronized until the server's acknowledgement has
been verified. Do not equate synchronization with scientific
confirmation.

## 11. External Integrations

Integrations such as laboratory systems, camera capture, GPS, hardware
sensors, SMS, maps, or external identity providers are not assumed to
exist. Each integration requires: - A documented business need. - An
identified owner and authoritative data source. - An API/protocol
contract. - Permission and privacy analysis. - Failure and timeout
behavior. - Testing strategy. - Credentials and environment
configuration handled securely.

MCP connections, if needed for development agents, are tooling
integrations and should not automatically become runtime dependencies of
the NashaPrahari product.

## 12. Configuration and Environments

Separate local development, testing, and production configuration. Use
environment variables or the backend's approved configuration system for
secrets and deployment-specific values.

Rules: - Commit an example environment file containing placeholders
only. - Ignore actual local environment files and credentials. -
Validate required configuration at startup. - Do not expose backend
secrets to Vite client-side environment variables. - Document database
initialization and migration steps. - Avoid hardcoding hostnames,
production URLs, real officer details, or coordinates.

## 13. Deployment Direction

The deployment platform is TBD. Before deployment, decide: - Where the
frontend is hosted. - Where the FastAPI service runs. - Where PostgreSQL
is hosted. - How HTTPS and domain routing are configured. - How secrets
and database backups are managed. - How migrations are applied safely. -
How logs, monitoring, and health checks are handled. - How test and
production data are separated.

Do not deploy or change production resources without explicit
authorization.

## 14. Architecture Decision Records

For significant choices, record: - Decision title and date. - Context
and constraints. - Options considered. - Selected approach. -
Trade-offs. - Consequences and migration path. - Status: proposed,
accepted, superseded, or rejected.

Decisions that require explicit team agreement include: - API versioning
and error schema. - Database ORM and migration tool. - Authentication
method and role matrix. - Offline persistence and synchronization. -
Audit and evidence integrity model. - Deployment environment. - External
laboratory or hardware integrations.

## 15. Architecture Acceptance Checklist

-   [ ] Existing frontend and backend structure inspected.
-   [ ] Frontend/backend responsibilities are clear.
-   [ ] UI uses an API service layer for real backend requests.
-   [ ] Frontend never connects directly to PostgreSQL.
-   [ ] Mock data is separated and clearly labelled.
-   [ ] Success states are driven by actual operation results.
-   [ ] Security controls are enforced server-side where required.
-   [ ] Configuration and secrets are separated from source code.
-   [ ] Offline and synchronization behavior is not claimed without
    implementation.
-   [ ] API and database contracts are coordinated with the backend
    owner.
-   [ ] Significant architecture decisions are documented.
-   [ ] Build and relevant tests pass after architectural changes.

## 16. Related Documents

-   `PROJECT_REQUIREMENTS.md`
-   `DESIGN.md`
-   `DATABASE.md`
-   `API.md`
-   `SECURITY.md`
-   `INTEGRATIONS.md`
-   `MCP_CONNECTIONS.md`
-   `IMPLEMENTATION.md`
-   `TESTING.md`
-   `DEBUGGING.md`

## 17. Status

**Draft v0.1.** This document establishes the proposed architecture
direction. Verify it against the actual repository and coordinate
backend decisions with the teammate responsible for FastAPI and
PostgreSQL before treating proposed structures or interfaces as final.
