# NashaPrahari

> **Project status:** Documentation baseline / implementation status
> must be verified against the current repository.\
> **Document status:** Draft project entry point.\
> **Important:** This README describes the intended project direction.
> It does not certify that every listed feature, integration, control,
> or backend service is implemented.

## 1. Project overview

**NashaPrahari** is being developed as a digital field-testing companion
for the Smart India Hackathon project. The intended product direction is
to help authorized field personnel record field-test activities, manage
associated records, and understand whether data is waiting to
synchronize with a central service.

The application must communicate scientific and operational limitations
clearly. A field-screening result must not be presented as a definitive
laboratory confirmation. Any formal evidentiary or procedural use must
follow the applicable official protocol and authorized laboratory
process.

### Goals for the initial web application

-   Provide a clear, responsive dashboard for field operations.
-   Support a structured field-test record workflow.
-   Present record status and synchronization status accurately.
-   Make demo data visibly distinguishable from real records.
-   Keep the frontend/backend boundary explicit so a real API can
    replace mock data without rewriting the whole UI.
-   Prioritize accessibility, data integrity, privacy, and honest status
    reporting.

### Out of scope unless confirmed

Do not assume that the following are already implemented or officially
approved: live synchronization, offline persistence, user
authentication, role-based access, laboratory integrations, GPS capture,
camera calibration, cryptographic evidence signing, encryption claims,
official hotline details, or regulatory/compliance certification. Check
the codebase and authoritative project requirements first.

## 2. Planned technology direction

The current working direction is:

  -----------------------------------------------------------------------
  Layer                   Intended technology     Status
  ----------------------- ----------------------- -----------------------
  Web frontend            React, TypeScript,      Previously identified;
                          Vite, React Router      verify against current
                                                  repository

  Backend API             Python with FastAPI     Planned; verify with
                                                  backend teammate

  Database                PostgreSQL              Planned; verify schema
                                                  and ownership

  UI reference            Stitch exports in       Design reference only;
                          `Design/`               not proof of
                                                  implementation
  -----------------------------------------------------------------------

The actual repository, lockfiles, package scripts, backend service, and
team decisions are the source of truth. Do not change the stack simply
because this document mentions a planned technology.

## 3. Documentation index

Keep these files under `docs/`. The filenames below are the intended
canonical names; normalize any generated filename when copying it into
the repository.

  -----------------------------------------------------------------------------------------------
  Document                                                    Purpose
  ----------------------------------------------------------- -----------------------------------
  [`PROJECT_REQUIREMENTS.md`](PROJECT_REQUIREMENTS.md)   Product goals, proposed
                                                              requirements, scope, acceptance
                                                              criteria, open questions

  [`DESIGN.md`](DESIGN.md)                               Visual direction, responsive
                                                              behavior, interaction and
                                                              accessibility rules

  [`ARCHITECTURE.md`](ARCHITECTURE.md)                   Proposed frontend, API, backend,
                                                              and data-layer boundaries

  [`DATABASE.md`](DATABASE.md)                           Proposed logical data model,
                                                              constraints, migrations, and data
                                                              handling

  [`API.md`](API.md)                                     Proposed API conventions and
                                                              candidate routes; not a verified
                                                              API contract

  [`TESTING.md`](TESTING.md)                             Testing strategy, acceptance
                                                              checks, and defect workflow

  [`SECURITY.md`](SECURITY.md)                           Threat model and security
                                                              requirements to validate during
                                                              implementation

  [`DEPLOYMENT.md`](DEPLOYMENT.md)                       Environment, release, deployment,
                                                              rollback, and smoke-test guidance

  [`AGENTS.md`](AGENTS.md)                               Instructions for AI coding agents
                                                              working in this repository

  [`REPOSITORY_AUDIT.md`](REPOSITORY_AUDIT.md)           Comprehensive repository audit,
                                                              technical baseline, and roadmap
  -----------------------------------------------------------------------------------------------

These documents are drafts. Reconcile them with the official problem
statement, actual code, and decisions made by the project team. When a
decision changes, update the relevant document rather than leaving
conflicting instructions in place.

## 4. Repository layout

The intended documentation layout is:

``` text
NashaPrahari/
├── docs/
│   ├── PROJECT_REQUIREMENTS.md
│   ├── DESIGN.md
│   ├── ARCHITECTURE.md
│   ├── DATABASE.md
│   ├── API.md
│   ├── TESTING.md
│   ├── SECURITY.md
│   ├── DEPLOYMENT.md
│   ├── AGENTS.md
│   └── REPOSITORY_AUDIT.md
├── Design/
│   └── ... Stitch design exports (reference only)
├── frontend/
│   └── ... React application (verify current structure)
└── ... other repository files
```

This is a target layout, not a guarantee that every folder already
exists. Preserve the actual repository structure unless a deliberate,
reviewed change is needed.

## 5. Local development

### Frontend

If the current frontend still uses Vite and has a `package.json` in
`frontend/`, start from the project root and run:

``` bash
cd frontend
npm install
npm run dev
```

Vite commonly prints a local URL such as `http://localhost:5173/`, but
use the URL printed by the command. If the repository uses a different
package manager, lockfile, or script, follow the checked-in
configuration instead. Do not delete or replace the lockfile just to
make installation work.

Before reporting the frontend as healthy, run the scripts actually
defined in `frontend/package.json`. If the relevant scripts exist,
typical checks may include:

``` bash
npm run build
npm run lint
```

Do not claim a command passed unless it was run and its exit status was
checked.

### Backend and database

FastAPI and PostgreSQL are the planned backend direction, but the
correct startup commands, environment variables, migrations, and service
entry point must be confirmed from the backend repository and its
README. Coordinate with the backend owner before inventing endpoints,
database names, credentials, or migration commands.

Never commit `.env` files, API keys, passwords, private certificates, or
real sensitive field records. Provide a safe `.env.example` only after
the required variables are verified.

## 6. Design and data integrity rules

-   Use the Stitch exports as a visual reference, not as evidence that a
    feature exists.
-   Keep the interface professional, restrained, readable, and
    responsive.
-   Clearly label synthetic records and sample metrics as demo data.
-   Never show a fake successful sync when no server request has
    completed successfully.
-   Keep **sync status**, **screening status**, and **laboratory
    confirmation status** separate.
-   Do not describe a record as scientifically "verified" merely because
    it synchronized.
-   Do not invent live location, battery, sensor, encryption,
    calibration, or network telemetry.
-   Do not use an unverified hotline, protocol URL, certification, or
    legal claim.
-   Do not store secrets or unnecessary sensitive data in frontend code,
    browser logs, screenshots, or demo seed data.
-   Prefer accessible labels, keyboard operation, visible focus states,
    sufficient contrast, and useful error messages.

## 7. Recommended first workflow for an AI coding agent

1.  Read this README and `AGENTS.md`.
2.  Inspect the repository tree, Git status, package manifests,
    lockfiles, existing routes, assets, and scripts before editing.
3.  Compare the actual code with the draft documents and list
    contradictions or missing decisions.
4.  Check the official SIH problem statement and team-confirmed
    requirements; label anything not yet verified as an open question.
5.  Identify the smallest useful implementation milestone and define
    testable acceptance criteria.
6.  Implement one coherent slice at a time.
7.  Run relevant tests, type checks, linting, and production builds that
    are actually configured.
8.  Review the UI at desktop and mobile sizes, including loading, empty,
    error, and demo states.
9.  Fix confirmed defects and rerun the relevant checks.
10. Report exact files changed, commands run, observed results,
    remaining issues, and any manual verification still required.

If agent delegation is available, use separate agents for bounded tasks
such as repository audit, UI review, API-contract review, and test
review. Do not claim delegation occurred unless it actually did. Avoid
multiple agents editing the same files concurrently without a clear
ownership plan.

## 8. Definition of done

A task is complete only when:

-   The implementation matches the agreed requirement and design intent.
-   Existing behavior and unrelated files are preserved.
-   Relevant checks were run and their results recorded honestly.
-   User-facing states do not misrepresent mock data or backend
    behavior.
-   Accessibility, privacy, and error handling were considered.
-   Documentation is updated if behavior, architecture, or a contract
    changed.
-   Remaining blockers and unverified assumptions are explicitly listed.

## 9. Git and collaboration

The repository is intended to be maintained in the project's private
GitHub repository. Before committing or pushing:

-   Review `git status` and the diff.
-   Confirm no secrets, local environment files, generated build output,
    or real sensitive records are staged.
-   Follow the team's branch and review workflow.
-   Do not commit or push on the user's behalf unless explicitly
    authorized.

## 10. Current priorities

The recommended next steps are:

1.  **Reconcile documentation with reality:** inspect the current
    repository and update draft assumptions.
2.  **Confirm official requirements:** validate the SIH problem
    statement and any required workflow with the team.
3.  **Establish a clean baseline:** record the existing build/test
    status before modifying the app.
4.  **Implement the first vertical slice:** build a real dashboard and
    field-record flow with clearly marked demo data where backend
    integration is not ready.
5.  **Agree on the API contract:** coordinate with the backend owner
    before wiring frontend requests.
6.  **Test and review:** iterate until acceptance criteria pass or a
    concrete blocker is documented.

**Do not keep adding documents instead of validating and building the
product.** These documents are useful only when they guide work in the
actual repository.
