# NashaPrahari Security Guidelines

**Document ID:** NP-SEC-001\
**Version:** 0.1 --- Draft / Proposed\
**Status:** Security guidance; not a security audit or compliance
certification\
**Project:** NashaPrahari --- Field Testing Companion

> **Important:** This document describes recommended controls and
> decisions the team must make. It does not assert that authentication,
> encryption, audit logging, secure storage, tamper resistance, or any
> other control has already been implemented. Verify controls in code
> and tests before describing them as active.

------------------------------------------------------------------------

## 1. Purpose and security goals

NashaPrahari is intended to support field workflows that may involve
sensitive operational records, observations, location information,
images, and potential laboratory follow-up. The actual data
classification and legal obligations must be confirmed with the project
owner and relevant stakeholders.

Security should protect:

1.  **Confidentiality:** only authorized users and systems can access
    sensitive records.
2.  **Integrity:** records and changes are validated, authorized, and
    traceable.
3.  **Availability:** the application fails safely and recovers
    predictably.
4.  **Accountability:** important actions can be attributed to an
    authenticated actor where the system supports identity.
5.  **Privacy:** collect, retain, display, and share only data needed
    for an approved purpose.
6.  **Truthful status:** the UI must not imply that data is encrypted,
    synchronized, verified, or laboratory-confirmed unless that state is
    supported by implemented controls and evidence.

This is a practical engineering guide, not legal advice, a penetration
test, or proof of compliance with any law or standard.

## 2. Assets and trust boundaries

The team should identify and classify the data actually used by the
product. Potential assets include:

-   User accounts, session tokens, and access-control assignments.
-   Field records and screening observations.
-   Device identifiers and synchronization metadata.
-   GPS coordinates and timestamps.
-   Photographs, documents, and other evidence, if collected.
-   Laboratory confirmation records, if provided by an authorized
    source.
-   Audit events and operational logs.
-   Database backups and local/offline copies, if implemented.
-   API keys, signing keys, database credentials, and deployment
    secrets.

### Trust boundaries

Treat these as separate security boundaries:

-   **Browser/device:** user-controlled environment; data and
    client-side checks can be modified.
-   **Frontend code:** improves usability but is not a security
    enforcement layer.
-   **Network:** may be untrusted; production traffic should use HTTPS.
-   **Backend/API:** must validate input, authenticate callers,
    authorize every protected operation, and apply business rules.
-   **Database/object storage:** must restrict access and use controlled
    credentials.
-   **External services:** must be assessed and granted only necessary
    access.
-   **Development/test environment:** must not contain production
    secrets or unnecessary real personal data.

Never trust a role, user ID, timestamp, coordinate, status, or
permission decision merely because it came from the browser.

## 3. Threat model

Review these potential threats during design and before a release. The
table is a starting point, not an exhaustive threat assessment.

  -----------------------------------------------------------------------
  Threat                  Example                 Recommended mitigation
  ----------------------- ----------------------- -----------------------
  Broken access control   User changes a record   Enforce object-level
                          ID to view another      authorization on every
                          user's record           protected backend
                                                  operation; test
                                                  cross-user access.

  Credential exposure     Secret committed to Git Use secret management,
                          or included in a        scanning, least
                          frontend bundle         privilege, and
                                                  rotation.

  Session theft or misuse Token exposed through   Select a suitable
                          unsafe storage or logs  session design; limit
                                                  token exposure and
                                                  lifetime; secure logout
                                                  and revocation.

  Malicious input         Unexpected strings,     Validate types, length,
                          oversized fields,       ranges, formats, and
                          malformed identifiers   allowed values on the
                                                  server.

  Injection               Untrusted values affect Use parameterized
                          database queries or     database access and
                          commands                safe APIs; avoid shell
                                                  construction from user
                                                  input.

  Cross-site scripting    Untrusted record text   Use safe rendering,
  (XSS)                   is rendered as          avoid unsafe HTML
                          executable HTML         injection, validate
                                                  upload content, and
                                                  apply suitable browser
                                                  security headers.

  Cross-site request      Browser automatically   If cookie-based
  forgery (CSRF)          sends session cookies   authentication is used,
                          for an unwanted request apply appropriate
                                                  SameSite, CSRF token,
                                                  and origin checks.

  Sensitive-data leakage  Coordinates or evidence Minimize collection,
                          appear in URLs, logs,   redact logs, restrict
                          screenshots, or         exports, and review
                          analytics               telemetry.

  Unsafe uploads          Disguised or oversized  Enforce file size/type
                          file is uploaded as     limits, inspect
                          evidence                content, use safe
                                                  storage and controlled
                                                  download paths.

  Duplicate or            A retry creates two     Define idempotency and
  conflicting writes      field records           conflict handling in
                                                  the API contract.

  False sync status       UI says "Synced" after  Base status on server
                          only changing local     acknowledgements and
                          state                   explicit state
                                                  transitions.

  Data loss or corruption Interrupted write or    Use transactions,
                          migration damages       backups, migration
                          records                 checks, and recovery
                                                  tests.

  Insider or excessive    A role can access more  Use least privilege,
  access                  records than necessary  review role mappings,
                                                  and audit sensitive
                                                  actions.

  Dependency compromise   Vulnerable or malicious Review dependencies,
                          package enters the      lock versions, monitor
                          build                   advisories, and update
                                                  through controlled
                                                  changes.

  Device loss             Offline data remains    Define whether offline
                          accessible on a lost    storage is permitted;
                          device                  minimize local data and
                                                  assess encryption and
                                                  remote-revocation
                                                  options.
  -----------------------------------------------------------------------

## 4. Authentication and session management

The authentication mechanism is **not selected by this document**. The
project owner and backend owner must approve the design before protected
workflows are integrated.

Required decisions include:

-   Identity provider or account-management approach.
-   How users sign in and sign out.
-   Session or token format, storage, expiration, refresh, and
    revocation.
-   Password policy and multi-factor authentication, if applicable.
-   Account recovery and deactivation.
-   Behavior when connectivity is lost or a session expires.
-   Whether shared devices are expected and how user data is cleared
    between users.

Until those decisions are made:

-   Do not invent a production login flow.
-   Do not hard-code credentials or tokens.
-   Do not store long-lived sensitive credentials in `localStorage`.
-   Do not treat a frontend-only "logged in" flag as authentication.
-   Clearly label any local mock sign-in as demo-only and never connect
    it to real sensitive data.

The backend must verify identity on protected requests. The frontend
should handle expiration and access-denied states without leaking data
or retrying protected writes indefinitely.

## 5. Authorization and least privilege

Authorization must be enforced by the backend for every protected route
and every sensitive object.

Recommended rules:

-   Define a role-permission matrix based on approved product
    requirements.
-   Grant only the permissions needed for each role.
-   Check both the action and the specific record being accessed.
-   Do not rely on hidden navigation items, disabled buttons, or
    client-side route guards.
-   Validate requested ownership, organizational scope, and allowed
    state transitions on the server.
-   Re-check permissions for downloads, exports, attachments, and
    laboratory information.
-   Log important permission changes and sensitive administrative
    actions where audit logging is approved.
-   Test horizontal access (one user accessing another user's records)
    and vertical access (a lower-privilege user performing an
    administrative action).
-   Define how role changes and account deactivation affect existing
    sessions.

Do not assume the roles shown in an early requirements draft or mockup
are final. Confirm the role names, scope, and permissions with the
project owner.

## 6. Input validation and API safety

-   Treat all client input as untrusted.
-   Validate request schemas, field lengths, numeric ranges, enumerated
    values, timestamps, and file metadata on the backend.
-   Use parameterized queries or the ORM's safe query methods.
-   Reject unsupported state transitions rather than silently accepting
    them.
-   Set reasonable request-body and upload-size limits.
-   Apply rate limiting where abuse or resource exhaustion is plausible.
-   Use generic client-safe error messages and keep internal diagnostics
    in controlled server logs.
-   Avoid exposing stack traces, SQL statements, filesystem paths,
    tokens, or infrastructure details in responses.
-   Apply appropriate security headers for the chosen hosting
    architecture.
-   Define allowed CORS origins explicitly; do not use permissive
    wildcard configuration with credentialed requests.
-   Use CSRF protections if the selected authentication mechanism
    requires them.

Frontend validation improves usability but never replaces backend
validation.

## 7. Sensitive data, privacy, and minimization

Before collecting any personal, location, or evidence data, document:

-   The purpose for collecting each field.
-   Whether the field is necessary for the approved workflow.
-   Who may view, update, export, or delete it.
-   How long it is retained and how deletion is handled.
-   Whether it appears in notifications, logs, reports, screenshots, or
    backups.
-   Whether it is shared with external services or third parties.
-   The rules for access requests, incident response, and authorized
    disclosure, where applicable.

Recommended engineering controls:

-   Collect the minimum data required.
-   Do not place sensitive information in URLs or browser analytics.
-   Redact personal data, exact coordinates, evidence contents, and
    credentials from logs unless specifically justified and
    access-controlled.
-   Use synthetic data for development, screenshots, demonstrations, and
    automated tests.
-   Restrict database exports and backups.
-   Limit access to production data and review access periodically.
-   Define retention and secure deletion policies with the project
    owner.
-   Avoid copying production records into development environments.

The team must obtain appropriate legal and domain review for applicable
Indian data-protection, evidence-handling, and public-sector
requirements. This document does not determine legal obligations.

## 8. Evidence and chain-of-custody claims

If the approved product includes photographs, documents, samples, or
other evidence, define the evidence workflow before implementation.

At minimum, agree on:

-   Allowed evidence types, size limits, and capture/import rules.
-   Metadata handling, including device timestamps and location.
-   Upload, storage, download, access, retention, and deletion policies.
-   How the system identifies the uploader and each subsequent change.
-   Whether cryptographic hashes are required, what they cover, and
    where they are calculated.
-   How interrupted uploads and duplicate submissions are handled.
-   Whether original files are preserved and how derivatives are
    identified.
-   Who is authorized to review or export evidence.
-   How failures, corrections, and audit events are represented.

A hash alone does not prove that evidence is authentic, correctly
collected, legally admissible, or protected by an end-to-end chain of
custody. Do not claim "tamper-proof," "forensically secure,"
"court-ready," or legally admissible without implemented controls and
appropriate expert review.

## 9. Encryption and key management

Encryption decisions must be specific to each data location and threat
model.

Review separately:

-   Data in transit: use HTTPS/TLS for production connections.
-   Database and backup encryption: confirm actual hosting and storage
    capabilities.
-   Evidence/object storage encryption, if used.
-   Local/offline storage encryption, if offline operation is approved.
-   Secrets and key storage, rotation, access, and recovery.
-   Device loss, backup exposure, and key compromise scenarios.

Rules:

-   Do not invent an encryption claim based on a library being
    installed.
-   Do not hard-code cryptographic keys in source code or frontend
    bundles.
-   Do not use custom cryptographic algorithms.
-   Keep encryption keys separate from the data they protect where
    feasible.
-   Restrict who can access keys and record key rotation procedures.
-   Document what is encrypted, where, under which mechanism, and how it
    is verified.
-   Test backup restoration and key recovery before depending on
    encrypted backups.

The Stitch mockup's security labels are visual placeholders unless
independently verified in implementation.

## 10. Audit logging and accountability

If audit logging is approved, define which events must be recorded, such
as:

-   Sign-in and sign-out events, where appropriate.
-   Record creation, modification, and authorized deletion.
-   Changes to roles or permissions.
-   Evidence upload, download, export, or deletion.
-   Synchronization attempts and server acknowledgements.
-   Laboratory-status changes made by an authorized source.
-   Administrative configuration changes.
-   Rejected access attempts when logging is justified and safe.

Each event should use a consistent schema agreed by the team. Potential
fields include an event ID, event type, timestamp, authenticated actor
ID, target resource ID, outcome, and request/correlation ID.

Do not log passwords, session tokens, private keys, full evidence
contents, or unnecessary sensitive payloads. Restrict log access and
define retention. If logs are intended to be tamper-evident, document
the actual mechanism and threat assumptions; ordinary append-only
application logs are not automatically immutable.

## 11. Offline mode and device security

Offline operation is a product and security decision, not merely a
frontend convenience. Do not enable local caching of sensitive records
until the team has approved the threat model and data lifecycle.

Decisions to make:

-   Which fields are allowed offline.
-   Whether local storage is a browser database, native storage, or
    another mechanism.
-   Encryption and key management for local data.
-   How long records remain on the device.
-   What happens after logout, account deactivation, device loss, or
    role change.
-   How multiple users on one device are isolated.
-   How records are queued, retried, reconciled, and deleted.
-   How conflicts and uncertain server acknowledgements are shown.
-   Whether local records can be edited or removed before
    synchronization.
-   How the team detects and recovers from partial synchronization.

The UI must distinguish local persistence from server acceptance. A
local queue update is not proof of successful synchronization. If the
application does not support offline mode, show an honest
connection/error state rather than suggesting offline capability.

## 12. Dependency and supply-chain security

-   Use the repository's lockfile and package manager consistently.
-   Review new packages for maintenance status, licensing, scope, and
    necessity.
-   Keep dependencies updated through tested changes.
-   Run the project's approved dependency or vulnerability scanner when
    available.
-   Avoid adding packages to solve problems already covered by the
    existing stack.
-   Pin or constrain versions according to team policy.
-   Review build scripts and third-party code before introducing it.
-   Keep secrets out of build logs and CI output.
-   Protect repository and deployment permissions with least privilege.

A clean dependency scan is useful evidence but is not a complete
security audit.

## 13. Environment and secret management

-   Store backend secrets in an approved secret manager or protected
    environment configuration.
-   Keep frontend environment variables public-safe; anything prefixed
    with `VITE_` can be exposed in the built client.
-   Commit only placeholder `.env.example` files.
-   Ensure real environment files are excluded by `.gitignore`.
-   Use separate development, test, staging, and production credentials.
-   Do not reuse production database credentials in local development.
-   Rotate exposed credentials promptly and remove them from current
    files and history according to repository procedures.
-   Restrict CI/CD permissions and avoid printing secrets in logs.
-   Document who owns each secret and how rotation is performed.

## 14. Incident response

The team should define a lightweight incident process before handling
real sensitive data:

1.  Identify and report suspected exposure, unauthorized access, data
    loss, or integrity problems.
2.  Preserve relevant logs and technical evidence without spreading
    sensitive information.
3.  Notify the designated project/security owner through the agreed
    channel.
4.  Contain the issue: revoke exposed credentials, disable affected
    access, or isolate a compromised component as appropriate.
5.  Assess scope and impact using authorized access.
6.  Follow applicable organizational and legal notification procedures.
7.  Recover from a known-good state and verify integrity.
8.  Record root cause, corrective actions, and regression tests.
9.  Review whether documentation, access rules, monitoring, or training
    need changes.

Do not delete logs or rewrite records to hide an incident. Do not
investigate production data beyond authorized access.

## 15. Security verification checklist

Use this checklist for each release where applicable:

-   [ ] No secrets are committed or bundled into frontend code.
-   [ ] Backend authentication requirements are documented and tested.
-   [ ] Backend authorization is enforced per operation and per
    resource.
-   [ ] Invalid inputs are rejected on the server.
-   [ ] Error responses do not expose internal details.
-   [ ] CORS origins and production HTTPS are configured appropriately.
-   [ ] Sensitive data is minimized and redacted from logs.
-   [ ] Upload restrictions are tested if uploads exist.
-   [ ] Local/offline data storage has been explicitly reviewed if
    enabled.
-   [ ] Retry and duplicate-write behavior follows the approved API
    contract.
-   [ ] Dependencies are reviewed using the team's available tooling.
-   [ ] Backup and recovery procedures are documented where persistent
    data exists.
-   [ ] Claims about encryption, auditing, synchronization, and evidence
    integrity are backed by implementation and tests.
-   [ ] Remaining security limitations are documented and assigned an
    owner.

## 16. Decisions that must be confirmed

  -----------------------------------------------------------------------
  Decision                            Owner / status
  ----------------------------------- -----------------------------------
  Data classification and permitted   Project owner --- TBD
  demo data                           

  Applicable legal and organizational Project owner / qualified reviewer
  requirements                        --- TBD

  Authentication and session design   Backend owner --- TBD

  Final role-permission matrix        Product + backend --- TBD

  Record-level access rules           Product + backend --- TBD

  Evidence collection and retention   Project owner --- TBD
  policy                              

  Offline operation and local-storage Product + frontend + backend ---
  policy                              TBD

  Encryption at rest and key          Backend/deployment owner --- TBD
  management                          

  Audit-event schema and retention    Product + backend --- TBD

  Upload and external-storage         Backend owner --- TBD
  architecture                        

  Security testing and incident       Project owner --- TBD
  contact                             

  Production hosting, CORS, TLS, and  Deployment owner --- TBD
  secrets management                  
  -----------------------------------------------------------------------

## 17. Instructions for Antigravity agents

When making security-sensitive changes:

1.  Inspect existing code, dependencies, configuration, and the approved
    API contract first.
2.  Reuse existing security controls rather than creating duplicate or
    conflicting mechanisms.
3.  Never add real secrets to source code, prompts, logs, test fixtures,
    or frontend environment variables.
4.  Do not invent authentication, encryption, audit, sync, or
    evidence-protection features.
5.  Enforce access control on the backend; frontend hiding is not
    sufficient.
6.  Use synthetic test data and avoid copying production records.
7.  Add tests for the specific threat being addressed.
8.  Run the relevant checks and report actual results.
9.  If a security decision is unresolved, document the blocker rather
    than choosing a mechanism silently.
10. Do not commit, push, deploy, or change production configuration
    without explicit authorization.

------------------------------------------------------------------------

## 18. Related project documents

Keep this guide aligned with:

-   `PROJECT_REQUIREMENTS.md` --- approved scope and requirements.
-   `DESIGN.md` --- user-visible states and claims.
-   `ARCHITECTURE.md` --- trust boundaries and component
    responsibilities.
-   `DATABASE.md` --- data entities, retention, and persistence.
-   `API.md` --- API contracts and authorization behavior.
-   `TESTING.md` --- verification and regression workflow.

**End of Security Guidelines**
