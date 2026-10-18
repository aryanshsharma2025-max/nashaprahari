# NashaPrahari --- Database Design Document

**Document ID:** NP-DB-001\
**Version:** 0.1\
**Status:** Draft --- proposed logical model\
**Last updated:** 17 October 2026

> **Important:** The actual backend schema has not been verified in this
> document. The model below is a proposed starting point based on the
> known project direction. Coordinate with the FastAPI/PostgreSQL
> backend owner and the official SIH requirements before implementing
> migrations. Do not create duplicate tables if equivalent models
> already exist.

## 1. Purpose

Define database design principles, proposed entities, relationships,
integrity constraints, migration practices, and data-handling rules for
NashaPrahari.

PostgreSQL is the planned database. The backend---not the browser
frontend---must own database access and enforce data integrity.

## 2. Design Principles

-   Store only information required by approved requirements.
-   Keep operational records distinguishable from demonstration data.
-   Use stable identifiers and explicit lifecycle/status fields.
-   Enforce integrity through database constraints as well as
    application validation.
-   Avoid duplicating derived values when they can be calculated
    reliably.
-   Design migrations as reviewed, versioned changes.
-   Never claim that data is persisted until the backend confirms a
    successful transaction.
-   Do not store sensitive personal or case data in logs unnecessarily.
-   Define retention, access, and deletion rules before production data
    is used.

## 3. Status and Assumption Labels

-   **Known direction:** PostgreSQL is the planned database.
-   **Proposed:** logical entities and fields in this document are
    candidates for discussion.
-   **TBD:** must be resolved with the backend owner and official
    requirements.
-   **Not implied:** this document does not confirm that a database,
    ORM, migration tool, or any table has already been implemented.

## 4. Proposed Logical Entities

The following entities are conceptual. They must be adjusted to match
approved requirements and the existing backend implementation.

### 4.1 User

Purpose: represent an authenticated person if user accounts are
required.

Potential fields: - `id`: primary key, UUID or another agreed stable
identifier. - `display_name`: display name. - `username` or `email`:
login identifier, only if required. - `status`: active/disabled state. -
`created_at`, `updated_at`: timestamps.

Security notes: - Do not store plaintext passwords. - If local password
authentication is chosen, store only a suitable password hash generated
by a vetted password-hashing library. - Avoid collecting personal data
that is not required. - Define uniqueness and account-recovery behavior
before implementation.

Status: **Proposed / authentication decision TBD.**

### 4.2 Role and UserRole

Purpose: model role-based access if approved.

Potential entities: - `Role`: stable role identifier and role name. -
`UserRole`: association between users and roles.

Use database constraints to prevent duplicate user-role assignments. Do
not treat role names in the UI as authorization. The final role list and
permissions must be approved in `SECURITY.md`.

Status: **Proposed / final role matrix TBD.**

### 4.3 FieldRecord

Purpose: represent a field-testing activity or record, subject to the
final domain definition.

Potential fields: - `id`: stable primary key. - `record_reference`:
human-readable reference, if required and uniquely generated. -
`created_by_user_id`: reference to the responsible user, if accounts
exist. - `created_at`: server-side creation timestamp. - `updated_at`:
server-side modification timestamp. - `workflow_status`: lifecycle
status from an approved set. - `notes`: optional text only if permitted
by policy.

Do not add real officer identity, location, substance details, or case
identifiers without confirmed requirements and a data-handling policy.

Status: **Proposed; domain fields TBD.**

### 4.4 ScreeningResult

Purpose: represent a presumptive field-screening result separately from
confirmatory laboratory results.

Potential fields: - `id`: primary key. - `field_record_id`: foreign key
to the associated record. - `outcome`: an approved value such as
`presumptive_positive`, `presumptive_negative`, or `inconclusive`, if
these outcomes match the actual test method. - `recorded_at`:
timestamp. - `recorded_by_user_id`: user reference, if required. -
`method_or_kit_reference`: optional reference only if the test procedure
defines it.

Rules: - Do not label a presumptive outcome as a confirmed
identification. - Preserve the method's actual terminology. - Define
whether a record can have multiple screening attempts or results before
finalizing cardinality.

Status: **Proposed; result rules TBD.**

### 4.5 SyncOperation / SyncState

Purpose: track synchronization only if offline or deferred
synchronization is an approved requirement.

Potential fields: - `id`: primary key. - `field_record_id`: associated
record. - `state`: explicitly defined state such as pending, in
progress, synchronized, or failed. - `attempt_count`: number of
attempts, if useful. - `last_attempt_at`: last attempt timestamp. -
`last_error_code`: safe, non-sensitive error classification. -
`confirmed_at`: server acknowledgement timestamp, if applicable.

This entity may belong in a client-side local store rather than
PostgreSQL, depending on the synchronization design. Decide this before
implementation.

Rules: - Do not mark a record synchronized before receiving a valid
server acknowledgement. - Use idempotency to prevent duplicate creation
on retries. - Do not confuse synchronization state with result validity,
review, or laboratory confirmation.

Status: **TBD; do not implement solely because it appears in a mockup.**

### 4.6 AuditEvent

Purpose: record significant actions if an audit trail is required.

Potential fields: - `id`: primary key. - `actor_user_id`: actor, if
known. - `event_type`: controlled event category. - `entity_type` and
`entity_id`: affected entity reference. - `occurred_at`: server-side
timestamp. - `metadata`: tightly controlled structured metadata, only if
approved.

Audit design questions: - Which actions must be recorded? - Who can read
audit events? - Can records be corrected, and how are corrections
represented? - What retention period applies? - Is tamper resistance
required, and what threat model supports it?

Do not call an ordinary audit table "tamper-proof" or "cryptographically
secure" without a verified design.

Status: **Proposed / requirements TBD.**

### 4.7 LaboratoryConfirmation

Purpose: represent a confirmatory laboratory result if a real laboratory
workflow or integration is approved.

Potential fields: - `id`: primary key. - `field_record_id`: associated
field record. - `laboratory_reference`: external reference only where
authorized. - `result_status`: controlled status. - `reported_at`:
timestamp. - `source_system`: approved source identifier.

This entity must remain distinct from a presumptive screening result. Do
not invent laboratory results or claim a laboratory integration exists.

Status: **Future / TBD.**

## 5. Proposed Relationship Overview

``` text
User 1 ─── * FieldRecord
FieldRecord 1 ─── * ScreeningResult
FieldRecord 1 ─── * SyncOperation       [only if required]
User 1 ─── * AuditEvent                 [actor may be nullable]
FieldRecord 1 ─── * AuditEvent          [logical reference]
FieldRecord 1 ─── * LaboratoryConfirmation [if implemented]
User * ─── * Role via UserRole          [if role-based access is approved]
```

This is a conceptual relationship diagram, not a final schema. Confirm
whether each relationship is one-to-one, one-to-many, or optional based
on the workflow.

## 6. Identifier and Timestamp Rules

-   Choose UUID or another stable primary-key strategy with the backend
    owner.
-   If human-readable references are required, keep them separate from
    primary keys.
-   Generate record references safely and enforce uniqueness in the
    database.
-   Store timestamps consistently, preferably as timezone-aware values.
-   Decide whether displayed timestamps use the user's local timezone.
-   Do not use client clocks as the sole authoritative timestamp for
    sensitive events.
-   Define update and deletion semantics before data becomes
    operational.

## 7. Constraints and Indexes

Apply constraints based on confirmed requirements, including: - Primary
keys for all persistent entities. - Foreign keys for relationships. -
Unique constraints for login identifiers or record references where
applicable. - `NOT NULL` only for genuinely mandatory fields. - Check
constraints or constrained types for approved status values. - Indexes
on frequent lookup fields, foreign keys, and time-based queries when
justified by query patterns.

Do not add speculative indexes or constraints without considering the
expected queries and data lifecycle.

## 8. Data Validation

Validation should occur at multiple appropriate boundaries: 1. Frontend
validation for user experience. 2. FastAPI request/schema validation. 3.
Business-rule validation in the backend. 4. Database constraints for
persistent integrity.

Frontend validation is not a security boundary. Database constraints do
not replace meaningful domain validation or error messages.

## 9. Migrations and Schema Evolution

-   Use the migration mechanism selected by the backend team.
-   Keep migrations version-controlled.
-   Review generated migrations before applying them.
-   Test migrations against a development/test database before
    production.
-   Avoid destructive changes without a backup and an explicit
    rollback/recovery plan.
-   Prefer staged migrations for changes that affect existing records.
-   Never manually edit production schema without a documented change
    process.
-   Document seed data separately from schema migrations.
-   Use fictional seed records and label them as demonstration data.

Do not assume Alembic or any ORM is selected until the actual backend
configuration is inspected.

## 10. Transactions and Concurrency

-   Use transactions for related writes that must succeed or fail
    together.
-   Define uniqueness and idempotency behavior for retried requests.
-   Handle concurrent updates deliberately.
-   Avoid assuming a request timed out means its transaction failed.
-   Use locking or optimistic concurrency only when the workflow
    requires it.
-   Document the expected behavior when duplicate submissions occur.

## 11. Privacy, Security, and Retention

Before storing real operational or personal data, define: - Data
classification and permitted purposes. - Minimum required fields. -
Role-based access and record ownership rules. - Retention and deletion
policy. - Backup access and recovery procedures. - Encryption
requirements at rest and in transit. - Audit access and retention. -
Safe handling of exports and logs. - Whether offline copies are
permitted and how they are protected.

Do not claim encryption or compliance based solely on choosing
PostgreSQL or HTTPS. Verify actual deployment configuration.

## 12. Seed and Demonstration Data

-   Keep development seed data clearly separate from real records.
-   Use fictional names, identifiers, and locations.
-   Do not include real case details or credentials.
-   Make it obvious in the UI and documentation when seed data is
    active.
-   Do not use demo data to claim operational performance or system
    readiness.
-   Ensure seed scripts are safe to rerun or explicitly document if they
    are not idempotent.

## 13. Backup and Recovery

Production backup strategy is **TBD** and must be selected based on
deployment and retention requirements.

Before production: - Define backup frequency and retention. - Protect
backups with appropriate access controls. - Test restoration, not merely
backup creation. - Document recovery objectives if required. - Restrict
access to exported database files. - Avoid storing backups in the source
repository.

## 14. Questions Requiring Team Decisions

-   What exactly constitutes a field record?
-   Can a field record have multiple screening attempts?
-   What are the approved screening outcome values?
-   Are user accounts and roles required for the prototype or only
    later?
-   Is offline-first operation a mandatory requirement?
-   Where should pending synchronization state live?
-   What record fields are mandatory under the official problem
    statement?
-   Are laboratory confirmations part of this product's scope?
-   What audit events, retention, and deletion rules apply?
-   Which ORM and migration tool does the backend teammate use?
-   What is the approved identifier strategy?

Do not silently answer these questions through code. Record decisions
and update this document.

## 15. Database Acceptance Checklist

-   [ ] Existing backend models and migrations inspected before schema
    changes.
-   [ ] Logical entities validated with the backend owner.
-   [ ] Presumptive results remain distinct from confirmatory laboratory
    results.
-   [ ] Primary keys, foreign keys, and constraints are documented.
-   [ ] Status values and transitions are explicitly defined.
-   [ ] Migration tool and migration workflow are confirmed.
-   [ ] Seed data is fictional and clearly identified.
-   [ ] No secrets or sensitive real data are committed.
-   [ ] Transaction, retry, and duplicate-submission behavior is
    understood.
-   [ ] Retention, audit, backup, and recovery decisions are documented
    before production.
-   [ ] Migrations and relevant database tests pass in a non-production
    environment.

## 16. Related Documents

-   `PROJECT_REQUIREMENTS.md`
-   `ARCHITECTURE.md`
-   `API.md`
-   `SECURITY.md`
-   `IMPLEMENTATION.md`
-   `TESTING.md`
-   `DEBUGGING.md`

## 17. Status

**Draft v0.1.** This document proposes a logical data model only.
Reconcile it with the official requirements and the backend team's
actual code before creating or changing database tables.
