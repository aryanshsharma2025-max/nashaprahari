# NashaPrahari API Design and Integration Contract

**Document ID:** NP-API-001\
**Version:** 0.1 --- Draft / Proposed\
**Status:** Planning contract; not a list of verified or implemented
endpoints\
**Project:** NashaPrahari --- Field Testing Companion

> **Important:** This document proposes conventions for coordinating the
> React + TypeScript frontend with the Python + FastAPI backend. It does
> not confirm that any endpoint, authentication flow, database
> operation, offline queue, or integration already exists. The backend
> owner must review and approve the contract before implementation.
> FastAPI's generated OpenAPI schema and the agreed backend code are the
> source of truth once available.

------------------------------------------------------------------------

## 1. Purpose

Define a shared API contract so frontend and backend work can proceed
independently without guessing about URLs, field names, status values,
errors, or security behavior.

The API should support the approved NashaPrahari workflows, potentially
including:

-   Listing and viewing field records.
-   Creating a field record and recording screening
    observations/results.
-   Viewing synchronization status where synchronization is implemented.
-   Viewing laboratory confirmation information where an authorized
    source provides it.
-   Retrieving the signed-in user's permitted profile or role
    information, once authentication is selected.

These are candidate capabilities, not confirmed requirements or
implemented endpoints. Only build a resource after it is approved in the
requirements and architecture documents.

## 2. Contract status and change control

Every API item must be treated as one of:

-   **Proposed:** suggested in this document; requires backend
    agreement.
-   **Approved:** accepted by the frontend and backend owners and
    recorded in this document or a linked API specification.
-   **Implemented:** present in code and covered by tests.
-   **Verified:** tested against the agreed contract in a running
    environment.

Do not label an endpoint as implemented or verified merely because it
appears in a mockup, type definition, or prompt.

When changing an approved contract, update the OpenAPI schema, backend
tests, frontend types/client, and this document as appropriate. Prefer
backward-compatible additions. Discuss breaking changes with both owners
before merging.

## 3. API conventions

The following conventions are proposed for approval:

-   Protocol: HTTPS outside local development.
-   Style: resource-oriented HTTP API.
-   Payload format: JSON for ordinary request and response bodies.
-   Base path: `/api/v1` (proposed; confirm with backend owner).
-   Encoding: UTF-8.
-   Field names: `snake_case` in JSON to match conventional Python
    models, unless the team explicitly chooses another consistent
    convention.
-   Dates and timestamps: ISO 8601/RFC 3339 strings with timezone
    offsets; store and transmit UTC where practical.
-   IDs: opaque strings to the client. The frontend must not assume IDs
    are sequential integers.
-   Content types: use `application/json` when sending JSON and verify
    response content types before parsing.
-   HTTP methods: use `GET` for reads, `POST` for creation/actions,
    `PATCH` for partial updates only when supported, and `DELETE` only
    where an approved workflow requires it.
-   Do not send secrets, credentials, or sensitive evidence in URL query
    strings.

Example local base URL (configuration only; not a guaranteed running
service):

``` text
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

The actual host, port, and prefix must come from the backend run
instructions and environment configuration.

## 4. Proposed resource map

The following route names are examples for design discussion. They are
**not confirmed endpoints**.

  -----------------------------------------------------------------------------------------------------
  Candidate capability    Example route                                         Notes
  ----------------------- ----------------------------------------------------- -----------------------
  Health/readiness        `GET /health`                                         Operational endpoint;
                                                                                confirm whether public
                                                                                or internal.

  Field-record collection `GET /field-records`                                  Requires approved
                                                                                filters and access
                                                                                rules.

  Field-record detail     `GET /field-records/{record_id}`                      Must enforce
                                                                                record-level
                                                                                authorization.

  Create field record     `POST /field-records`                                 Validate required
                                                                                fields and the user's
                                                                                permission.

  Record screening result `POST /field-records/{record_id}/screening-results`   Use only if screening
                                                                                results are a separate
                                                                                approved resource.

  Sync status/queue       `GET /sync/status`                                    Only if sync
                                                                                functionality is in
                                                                                scope and actually
                                                                                implemented.

  Lab confirmation        `GET /field-records/{record_id}/lab-confirmation`     Only if an authorized
                                                                                lab workflow/source
                                                                                exists.

  Current user            `GET /me`                                             Depends on the selected
                                                                                authentication
                                                                                mechanism.
  -----------------------------------------------------------------------------------------------------

Do not implement every route simply because it is listed here. The
backend owner should approve route names, schemas, permissions, and
workflow semantics before frontend integration.

## 5. Request and response shapes

### 5.1 Success responses

Prefer a resource object for a single resource and a consistent list
envelope for collections. The exact shape must match the approved
OpenAPI schema.

Illustrative single-resource response:

``` json
{
  "id": "rec_example_001",
  "status": "draft",
  "created_at": "2026-10-17T12:30:00Z",
  "updated_at": "2026-10-17T12:30:00Z"
}
```

This is sample data to demonstrate structure, not a real record or a
finalized schema.

Illustrative list response:

``` json
{
  "items": [],
  "page": 1,
  "page_size": 20,
  "total": 0
}
```

If the backend uses cursor pagination or a different envelope, document
that choice and use it consistently. Do not silently adapt different
response shapes throughout individual components.

### 5.2 Request validation

-   Validate inputs on the backend even if the frontend also validates
    them.
-   Return field-level validation details when safe and useful.
-   Reject malformed or unsupported values explicitly.
-   Do not accept client-provided user IDs, roles, audit actors, or
    authorization decisions as proof of identity or permission.
-   Keep frontend validation messages understandable; preserve the
    backend's machine-readable error code for handling.

### 5.3 Error response format

Proposed consistent error envelope:

``` json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request contains invalid fields.",
    "details": [
      {
        "field": "example_field",
        "issue": "This field is required."
      }
    ],
    "request_id": "req_example"
  }
}
```

This is a proposed format, not a verified FastAPI response. The backend
owner must choose and implement one consistent format. Avoid returning
stack traces, database details, secrets, or internal infrastructure
information to the client.

Suggested HTTP status handling:

  -----------------------------------------------------------------------------
  Status                        Typical meaning         Frontend behavior
  ----------------------------- ----------------------- -----------------------
  `200 OK`                      Successful read/update  Render returned data.

  `201 Created`                 Resource created        Use returned
                                                        resource/ID.

  `202 Accepted`                Work accepted but not   Show pending state;
                                yet complete            poll only if contract
                                                        defines how.

  `204 No Content`              Successful action with  Do not attempt to parse
                                no body                 JSON.

  `400 Bad Request`             Malformed or invalid    Show actionable error.
                                request                 

  `401 Unauthorized`            Authentication          Follow the approved
                                missing/invalid         sign-in/session flow;
                                                        do not invent one.

  `403 Forbidden`               Authenticated but not   Explain access is
                                permitted               unavailable; do not
                                                        retry automatically.

  `404 Not Found`               Resource absent or      Show a not-found state.
                                intentionally           
                                undisclosed             

  `409 Conflict`                State conflict or       Follow the
                                duplicate operation     resource-specific
                                                        resolution rules.

  `422 Unprocessable Content`   Validation failure,     Map field errors to the
                                common in FastAPI       form when possible.

  `429 Too Many Requests`       Rate limit reached      Respect `Retry-After`
                                                        if supplied.

  `500`--`599`                  Server/service failure  Show a safe error and
                                                        allow a controlled
                                                        retry where
                                                        appropriate.
  -----------------------------------------------------------------------------

The backend's actual status-code choices must be documented in OpenAPI
and tested.

## 6. Filtering, sorting, and pagination

For list endpoints, define supported query parameters explicitly.
Candidate examples:

``` text
GET /field-records?page=1&page_size=20
GET /field-records?status=draft
GET /field-records?created_from=2026-10-01T00:00:00Z
```

These examples are not implemented routes or guaranteed filters.

Rules:

-   Set a server-enforced maximum page size.
-   Validate sort keys and directions against an allowlist.
-   Define whether date ranges are inclusive or exclusive.
-   Define which statuses are filterable and their canonical spelling.
-   Never rely on frontend-only filtering for access control.
-   Return pagination metadata or cursors consistently.

## 7. Authentication and authorization boundaries

Authentication is **not selected by this document**. The team must
decide and document the mechanism before protected endpoints are
integrated.

Until that decision is approved:

-   Do not hard-code tokens, passwords, API keys, or session secrets.
-   Do not treat a role stored in browser state as authorization.
-   Do not create a fake login that implies real identity verification.
-   Do not store long-lived sensitive credentials in `localStorage`.
-   Do not send protected data until the backend contract defines how
    the user is authenticated.
-   The backend must authorize every protected request, including
    record-level access. Hiding a button in React is not authorization.
-   Document session expiration, logout, refresh behavior, role changes,
    and unauthorized responses once the mechanism is chosen.

For local development, use only the backend's documented test
credentials or a clearly labeled mock mode. Never put production
credentials in `.env` files committed to Git.

## 8. Frontend API client rules

Keep HTTP logic in one shared client/service layer rather than placing
`fetch` calls in page components.

Suggested structure (adapt to the actual repository):

``` text
frontend/src/
  api/
    client.ts
    types.ts
    fieldRecords.ts
    errors.ts
```

Suggested responsibilities:

-   `client.ts`: base URL, headers, request serialization, response
    parsing, timeout/abort handling, and common error normalization.
-   `types.ts`: TypeScript types aligned with the approved OpenAPI
    schema.
-   `fieldRecords.ts`: functions for approved field-record operations.
-   `errors.ts`: shared API error types and user-safe messages.

Rules:

1.  Read the base URL from `VITE_API_BASE_URL`; validate it during
    development and provide a clear configuration error if missing.
2.  Do not scatter base URLs across components.
3.  Do not assume every successful response contains JSON; support
    `204 No Content`.
4.  Check `response.ok`; `fetch` does not reject just because the server
    returns a 4xx/5xx status.
5.  Normalize network, timeout, HTTP, parsing, and validation errors
    separately.
6.  Use `AbortController` or an equivalent supported approach to cancel
    stale requests when appropriate.
7.  Do not retry every request automatically. Retry only transient
    failures and only when the operation is safe to repeat.
8.  Keep API calls out of render functions and avoid duplicate requests
    caused by component lifecycle mistakes.
9.  Expose loading, empty, success, and error states in the UI.
10. Never report success until the server has confirmed it. A local
    button animation or timeout is not a successful API operation.
11. Do not silently substitute mock data when a live API fails. If demo
    mode is explicitly enabled, label it clearly and make the source of
    the data visible to developers.
12. Do not log sensitive payloads, evidence, credentials, or personal
    data to the browser console.

## 9. Timeouts, retries, and idempotency

Agree on timeout values with the backend owner and deployment
environment; do not assume a single timeout suits every operation.

-   Read requests may be retried after a transient network error if
    doing so is safe.
-   A create request must not be blindly retried after an ambiguous
    timeout: the server may have created the resource even if the client
    did not receive the response.
-   If duplicate prevention is required, agree on an idempotency
    mechanism, its header or key format, server retention period, and
    behavior before using it.
-   Never invent an `Idempotency-Key` contract in the frontend without
    backend support.
-   Avoid automatic retries for `400`, `401`, `403`, or validation
    errors.
-   Respect `Retry-After` for rate limits when present.
-   Display a clear pending/unknown state when the outcome of a write
    cannot be determined.

## 10. Offline operation and synchronization

Offline behavior is a high-risk contract and must be designed
explicitly. The design mockup's "queued" or "sync" labels do not
establish that a real synchronization service exists.

Before implementation, agree on:

-   Which actions can be performed offline.
-   What data may be stored locally and for how long.
-   Local record identifiers and their relationship to server IDs.
-   Queue states and legal transitions.
-   Duplicate prevention and idempotency.
-   Conflict detection and resolution.
-   Ordering guarantees, retry schedule, and maximum retry policy.
-   What happens when a user logs out or loses authorization.
-   How the UI distinguishes **saved locally**, **queued**, **sent to
    server**, **server accepted**, and **scientifically confirmed**.
-   What evidence of synchronization is returned by the server and
    retained for audit.

Do not show "Synced," "Verified," or "Confirmed" merely because a local
queue item disappeared. "Server received" and "lab-confirmed" are
different states. Do not claim offline database encryption or
tamper-proof audit behavior unless implemented and tested.

## 11. Evidence, privacy, and sensitive data

If the approved workflow includes photographs, documents, GPS
coordinates, or other evidence:

-   Decide whether uploads use multipart requests, pre-signed upload
    URLs, or another approved mechanism.
-   Define file type and size limits, malware/content checks, metadata
    handling, and failed-upload recovery.
-   Define access control, retention, deletion, audit, and export
    policies.
-   Avoid sending large binary files as base64 JSON unless the backend
    owner has explicitly chosen and justified that approach.
-   Avoid putting evidence URLs or sensitive coordinates into logs or
    analytics.
-   Treat client timestamps and device-provided location as untrusted
    input unless validated by the system.
-   Do not claim chain-of-custody, legal admissibility, tamper-proof
    storage, or standards compliance without specific implemented
    controls and appropriate review.

## 12. CORS and environment configuration

The backend must configure CORS for the exact approved frontend
development and deployment origins. Avoid unrestricted wildcard origins
when credentials are enabled.

Frontend environment variable example:

``` text
# frontend/.env.local — local development only
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

Rules:

-   `VITE_` variables are bundled into client-side code and are **not
    secrets**.
-   Never put private API keys, database passwords, signing keys, or
    server secrets in frontend environment variables.
-   Keep real secrets in backend/deployment secret management.
-   Add `.env.local` and secret-bearing environment files to
    `.gitignore`.
-   Provide a `.env.example` containing placeholder values only.
-   Document the development and production URLs separately.
-   Ensure production uses HTTPS and the correct allowed origins.

## 13. OpenAPI and frontend type alignment

FastAPI can publish an OpenAPI schema when configured. Once the backend
is running:

1.  Confirm the actual OpenAPI URL with the backend owner.
2.  Review the schema for route paths, request bodies, response models,
    status codes, security requirements, and error shapes.
3.  Use the schema as the authoritative contract rather than guessing
    from UI mockups.
4.  Generate TypeScript types or a client from the schema if the team
    chooses a generation tool.
5.  Add a repeatable process to detect contract drift.
6.  Test the frontend against a running backend or a contract-tested
    mock derived from the same schema.

Do not hand-maintain a second incompatible set of endpoint definitions.

## 14. Testing requirements

### Backend owner

-   Unit tests for validation and business rules.
-   API tests for success, invalid input, missing authentication,
    insufficient permissions, not-found, conflicts, and server errors.
-   Tests for filtering/pagination and duplicate-write behavior where
    supported.
-   OpenAPI schema review and CORS verification.
-   Authorization tests proving that one user cannot access another
    user's restricted records.

### Frontend owner

-   Unit tests for request serialization and error normalization.
-   Component tests for loading, empty, success, validation,
    offline/network failure, and permission-denied states.
-   Tests that confirm no fake success appears after failed requests.
-   Tests for `204` responses and malformed/unexpected response bodies.
-   Tests for cancellation and duplicate submissions where applicable.

### Integration checks

-   Confirm the frontend points to the intended backend URL.
-   Confirm CORS works from the actual development origin.
-   Confirm request and response fields match the OpenAPI schema.
-   Confirm no credentials or private data are committed or printed to
    logs.
-   Test the built frontend, not only the development server.

## 15. Definition of done

The API integration is ready only when all applicable items are true:

-   [ ] Backend owner approved the routes and schemas.
-   [ ] Actual endpoints are implemented and documented in OpenAPI.
-   [ ] Authentication and authorization requirements are explicit.
-   [ ] Request/response types match the backend contract.
-   [ ] Error and validation states are handled consistently.
-   [ ] Loading and empty states are implemented.
-   [ ] Writes do not show success before server confirmation.
-   [ ] Retries and duplicate-submission behavior are safe.
-   [ ] CORS and environment configuration are tested.
-   [ ] No secrets are present in frontend code or Git history.
-   [ ] Tests pass and the integration has been exercised against the
    agreed environment.
-   [ ] Offline/sync/evidence claims are limited to features that are
    actually implemented and tested.

## 16. Decisions requiring team agreement

Record the answer and owner for each item before relying on it:

  -----------------------------------------------------------------------
  Decision                            Owner / status
  ----------------------------------- -----------------------------------
  API base path and versioning        Backend owner --- TBD

  Canonical resource names and routes Frontend + backend --- TBD

  JSON field naming convention        Team --- TBD

  Authentication/session mechanism    Team/security owner --- TBD

  Roles and record-level access rules Product + backend --- TBD

  Error response envelope             Backend owner --- TBD

  Pagination/filtering conventions    Backend owner --- TBD

  Idempotency and duplicate-create    Backend owner --- TBD
  handling                            

  Offline storage and synchronization Frontend + backend --- TBD
  contract                            

  Evidence upload/storage/retention   Product + backend --- TBD
  contract                            

  OpenAPI location and                Backend + frontend --- TBD
  type-generation workflow            

  Production origins, HTTPS, and      Deployment owner --- TBD
  deployment configuration            
  -----------------------------------------------------------------------

## 17. Instructions for Antigravity agents

When working on API integration:

1.  Inspect the existing repository and backend contract before creating
    files.
2.  Search for existing API clients, schemas, routes, environment files,
    and tests; extend them instead of creating duplicates.
3.  Treat all routes and payloads in this draft as proposals until
    verified in backend code or approved OpenAPI.
4.  Do not fabricate endpoints, authentication, sync success, lab
    results, or server metrics.
5.  Keep mock/demo data clearly separated from live API responses.
6.  Implement one approved workflow at a time.
7.  Run type checks, tests, and production build after changes; report
    actual commands and outcomes.
8.  If the backend contract is missing or conflicts with this draft,
    stop at the integration boundary and report the exact decision
    needed rather than guessing.
9.  Do not commit or push changes unless explicitly authorized.

------------------------------------------------------------------------

**End of API Design and Integration Contract**
