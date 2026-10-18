# NashaPrahari --- Project Requirements Document (PRD)

**Document ID:** NP-PRD-001\
**Version:** 0.1\
**Status:** Draft --- baseline for Phase 1\
**Project:** NashaPrahari\
**Competition context:** Smart India Hackathon (SIH)\
**Problem statement reference:** SIH26231\
**Last updated:** 17 October 2026

> **Document control:** This is an initial requirements baseline
> assembled from the project context currently available. Items marked
> Proposed, Assumption, or TBD must be confirmed against the official
> problem statement, team decisions, and the actual implementation. This
> document is not proof that a feature already exists.

## 1. Purpose

NashaPrahari is intended to be a digital field companion for
drug-testing operations. The application should help authorized field
personnel manage field-test workflows and associated records through a
clear, reliable interface.

This document defines product goals, user groups, functional scope,
non-functional requirements, constraints, and acceptance criteria. It is
intended to guide implementation agents and contributors so that code
changes remain consistent with the agreed scope.

## 2. Product Vision

Provide field personnel with a usable digital workflow for recording and
reviewing field-testing activity, while keeping the distinction between
a **presumptive screening result** and a **confirmatory laboratory
result** explicit.

Priorities: - Field usability on desktop and mobile-sized screens. -
Clear record status and workflow progression. - Accurate representation
of local, pending, and synchronized information. - Honest communication
of unavailable or unimplemented functionality. - Maintainable
implementation that can be expanded in later phases.

## 3. Problem and Proposed Approach

### 3.1 Problem context

Field operations can involve collecting information, documenting test
activity, and managing records that may later need review. A digital
companion can reduce avoidable manual work and make record status easier
to understand.

The exact operational pain points and mandatory requirements must be
validated against the official SIH26231 problem statement. Do not invent
requirements and present them as official.

### 3.2 Proposed approach

The known frontend direction is React, TypeScript, and Vite. The known
backend direction is Python with FastAPI and PostgreSQL, assigned to a
teammate. The frontend should be designed so backend integration can be
added without pretending mock data is live data.

## 4. Goals

### 4.1 Initial goals

1.  Establish a stable, maintainable frontend foundation.
2.  Translate exported Google Stitch designs into reusable React
    components.
3.  Provide a responsive dashboard suitable for desktop and mobile-sized
    screens.
4.  Show a clear summary of field records and their states using
    explicitly labelled demonstration data until real data is connected.
5.  Provide clear entry points to implemented record and field-test
    workflows.
6.  Display a caution that field-test outputs are presumptive screening
    results and do not replace appropriate confirmatory laboratory
    analysis.
7.  Add repeatable build, testing, and debugging practices.
8.  Maintain documentation that guides future contributors and coding
    agents.

### 4.2 Longer-term goals --- proposed, not yet committed

-   Connect the frontend to the FastAPI backend.
-   Persist records through the backend and PostgreSQL.
-   Implement authentication and role-based authorization according to
    approved requirements.
-   Support reliable synchronization if offline operation is formally
    required.
-   Implement record history and auditability according to verified
    legal, operational, and technical requirements.
-   Integrate device capabilities only after hardware, permissions, and
    data flows are defined.

## 5. Out of Scope for Phase 1

Unless the repository already contains verified implementations, Phase 1
must not claim to provide: - Real drug or substance identification from
images or sensors. - Confirmatory laboratory analysis or GC-MS
integration. - Production authentication or authorization. - Real
synchronization with a remote server. - Secure evidence signing or a
tamper-proof evidence ledger. - Guaranteed offline persistence or
encrypted local storage. - Live GPS, calibrated sensor, kit inventory,
battery, or network telemetry. - Production-grade legal or regulatory
compliance certification.

These may be considered in later phases after requirements, risks, and
implementation plans are approved.

## 6. Users and Roles

The following are **candidate user groups**, not a finalized
authorization matrix:

  -----------------------------------------------------------------------
  User group              Potential need          Status
  ----------------------- ----------------------- -----------------------
  Field officer /         Start a field-test      Proposed
  authorized operator     workflow and review     
                          records                 

  Supervisor / reviewer   Review submitted        Proposed
                          records and their       
                          status                  

  Laboratory or           Receive or review       TBD
  confirmatory-analysis   confirmatory results    
  personnel                                       

  System administrator    Manage access and       Proposed
                          system configuration    

  Project evaluator /     Inspect a clearly       Demonstration need
  demonstrator            labelled demonstration  
                          workflow                
  -----------------------------------------------------------------------

Do not implement permissions based only on this table. A separate
security document must define approved roles, permissions, and
authorization rules before production access control is implemented.

## 7. Functional Requirements

Priority meanings: **P0** = required for current foundation; **P1** =
next increment; **TBD** = confirm before commitment.

### FR-001 --- Responsive application shell (P0)

The application shall provide a consistent navigation and page layout
that adapts to desktop and mobile-sized viewports.

**Acceptance criteria** - Core content remains readable at narrow and
wide viewport sizes. - Navigation has a visible active state where
applicable. - No major content is clipped or inaccessible. - Existing
project conventions are preserved where practical.

### FR-002 --- Dashboard overview (P0)

The application shall provide a dashboard that summarizes records and
presents a recent-records section.

**Acceptance criteria** - Summary values come from clearly identified
mock data until a real source is connected. - Demonstration data is
visibly labelled. - The dashboard does not imply live activity when
using mock data. - Empty or unavailable data is represented honestly.

### FR-003 --- Record status clarity (P0)

The interface shall distinguish record states such as pending
synchronization and synchronized status when implemented or represented
in mock data.

**Acceptance criteria** - Status labels are unambiguous. -
"Synchronized" is not presented as equivalent to scientifically verified
or laboratory-confirmed. - Mock states are not reported as real server
outcomes.

### FR-004 --- Field-test entry point (P0)

The dashboard shall provide a clear entry point to the field-test
workflow when that workflow is implemented.

**Acceptance criteria** - The primary action navigates to an implemented
destination or displays an honest unavailable state. - Dead `#` links
are not presented as functional actions. - Successful test submission is
never fabricated.

### FR-005 --- Presumptive-result notice (P0)

The interface shall state that field-test outputs are presumptive
screening results and do not replace appropriate confirmatory laboratory
analysis where formal confirmation is needed.

**Acceptance criteria** - The notice is readable at relevant workflow
points. - The interface does not label a presumptive result as a
confirmed identification.

### FR-006 --- Records view (P1)

The application should provide a coherent way to review available
records, with search or filtering where supported by the agreed scope.

**Acceptance criteria** - Implemented search/filter controls change
displayed results correctly. - Empty results are handled clearly. - Mock
records are labelled as demonstration data.

### FR-007 --- Honest unavailable states (P0)

The interface shall not imply that an unimplemented backend-dependent
action succeeded.

**Acceptance criteria** - Synchronization, authentication, evidence
capture, persistence, and external integrations are not simulated as
real operations. - Unavailable actions are disabled or explain their
current limitation. - Errors are visible and do not silently disappear.

### FR-008 --- Backend integration (P1 / later phase)

The frontend should be structured to connect to the Python FastAPI
backend without coupling UI components directly to hardcoded
demonstration values.

**Acceptance criteria** - The API contract is documented before
integration. - API access is placed in a suitable service/client
layer. - Loading, success, empty, and failure states are handled. - No
real backend behavior is claimed until verified against a running
service.

### FR-009 --- Authentication and authorization (TBD)

Authentication and role-based authorization shall be implemented only
after the identity model, role matrix, and security requirements are
approved.

### FR-010 --- Offline operation and synchronization (TBD)

Offline storage and synchronization require explicit rules for conflict
handling, retries, record identity, data protection, and truthful status
reporting. Do not infer requirements from visual mockups alone.

## 8. Non-Functional Requirements

### NFR-001 --- Maintainability

-   Use reusable React components with clear responsibilities.
-   Keep data models, mock data, API access, and presentation reasonably
    separated.
-   Avoid a monolithic dashboard component.
-   Prefer existing dependencies and conventions over unnecessary
    additions.

### NFR-002 --- Type safety and build quality

-   Use TypeScript consistently.
-   Resolve type-check and production-build failures introduced by
    changes.
-   Run existing tests where available.
-   Record verification that could not be performed.

### NFR-003 --- Responsive usability

-   Support desktop and mobile-sized layouts.
-   Use readable typography, clear focus states, and adequate control
    sizes.
-   Ensure essential actions do not depend solely on hover.

### NFR-004 --- Accessibility

-   Use semantic HTML and accessible names for controls.
-   Support keyboard navigation for interactive elements.
-   Provide visible focus indicators.
-   Maintain adequate text and control contrast.
-   Associate form labels and validation messages with their fields.

### NFR-005 --- Data integrity

-   Do not invent or silently alter operational records.
-   Distinguish local, pending, synchronized, and reviewed/confirmed
    states according to the eventual approved data model.
-   Do not claim persistence or synchronization without verifying it.

### NFR-006 --- Security and privacy

-   Do not commit credentials, API keys, tokens, or secrets.
-   Validate untrusted input at appropriate boundaries.
-   Enforce authorization on the backend, not only by hiding frontend
    controls.
-   Minimize sensitive data in logs.
-   Define retention, access, and audit requirements before handling
    real operational data.

### NFR-007 --- Reliability and observability

-   Surface actionable errors.
-   Avoid false success messages.
-   Keep diagnostics factual and derived from real measurements only.
-   Document reproducible debugging steps.

### NFR-008 --- Visual consistency

Use supplied Stitch exports as visual references. The target direction
is a restrained navy, white, slate, and teal palette, clear information
hierarchy, and a credible field-operations interface. Do not introduce
unsupported capabilities simply because they appear in a mockup.

## 9. Technology Baseline

  -----------------------------------------------------------------------
  Layer                   Current known direction Notes
  ----------------------- ----------------------- -----------------------
  Frontend                React + TypeScript +    Existing frontend;
                          Vite                    verify repository state

  Routing                 React Router            Previously identified;
                                                  verify before changing

  Backend                 Python + FastAPI        Teammate's
                                                  planned/assigned stack

  Database                PostgreSQL              Planned backend
                                                  database

  Design reference        Google Stitch HTML      Located in the
                          exports                 project's `Design`
                                                  directory

  Development environment Windows                 Known from project path

  Version control         Git and private GitHub  Do not push or commit
                          repository              without authorization
  -----------------------------------------------------------------------

These are project directions, not a guarantee that every layer is
implemented or running.

## 10. Design and Implementation Constraints

-   Treat Stitch exports as visual references, not production React
    source.
-   Preserve original design exports.
-   Do not replace the existing frontend wholesale without inspecting
    it.
-   Do not overwrite or delete user-created work without understanding
    it.
-   Do not add hardcoded real-world coordinates, fabricated telemetry,
    certification badges, or unsupported encryption claims.
-   Do not infer backend contracts from visual labels.
-   Do not add a technology or service without explaining why it is
    needed.

## 11. Acceptance Criteria for Phase 1

-   [ ] Existing repository and Git status inspected before edits.
-   [ ] Both Stitch export folders inspected.
-   [ ] Dashboard implemented in the existing React application.
-   [ ] Desktop and mobile layouts reviewed to the extent tooling
    allows.
-   [ ] Dashboard metrics clearly use mock/demo data unless connected to
    a real source.
-   [ ] Presumptive-screening notice is visible.
-   [ ] Visible navigation and primary controls work or state their
    limitations.
-   [ ] No fake successful synchronization, authentication, persistence,
    or evidence signing.
-   [ ] Type check and production build pass.
-   [ ] Available automated tests pass.
-   [ ] Relevant browser checks performed where tools permit.
-   [ ] Git diff reviewed for accidental or unrelated changes.
-   [ ] Remaining limitations documented.

An unchecked criterion must not be reported as complete.

## 12. Risks and Open Questions

  -----------------------------------------------------------------------
  ID                      Question / risk         Required action
  ----------------------- ----------------------- -----------------------
  R-001                   Official mandatory      Compare against the
                          requirements from       official problem
                          SIH26231 are not        statement
                          reproduced here         

  R-002                   Final user roles and    Obtain team approval
                          permission matrix are   and document in
                          not confirmed           security design

  R-003                   Backend endpoints and   Agree on an API
                          schemas are not         contract with the
                          confirmed               backend teammate

  R-004                   Offline requirements    Define before
                          and conflict-resolution implementing local
                          rules are not confirmed persistence/sync

  R-005                   Evidence metadata,      Validate with project
                          retention, and audit    requirements and
                          policy are not          stakeholders
                          confirmed               

  R-006                   Deployment environment  Decide before
                          is not confirmed        deployment and
                                                  production
                                                  configuration

  R-007                   Laboratory and          Identify approved
                          external-service        interfaces and access
                          integrations are not    requirements
                          confirmed               

  R-008                   Legal, regulatory, or   Do not display such
                          certification claims    claims without evidence
                          need independent        
                          validation              
  -----------------------------------------------------------------------

## 13. Change Management

When a requirement changes: 1. Record the change and reason. 2. Identify
affected UI, API, data model, security, and tests. 3. Update this
document and related documents. 4. Implement the change in a bounded
phase. 5. Verify acceptance criteria and review the diff. 6. Document
unresolved issues.

Agents must not silently expand scope or convert assumptions into
requirements.

## 14. Related Documentation

Companion documents to create: - `DESIGN.md` - `ARCHITECTURE.md` -
`DATABASE.md` - `API.md` - `AGENTS.md` - `README.md` -
`IMPLEMENTATION.md` - `SETUP_AND_INITIALIZATION.md` -
`FEATURE_DEVELOPMENT.md` - `SECURITY.md` -
`MCP_CONNECTIONS.md` - `INTEGRATIONS.md` - `TESTING.md` -
`DEBUGGING.md`

## 15. Current Status

**Status: Draft baseline.** Use this document to guide Phase 1, but
verify assumptions against the repository, official problem statement,
and project-team decisions. Update it as implementation becomes
concrete.
