# NashaPrahari Testing Strategy

**Document ID:** NP-TEST-001\
**Version:** 0.1 --- Draft / Proposed\
**Status:** Team working guide; adapt to the actual repository and
approved requirements\
**Project:** NashaPrahari --- Field Testing Companion

> **Important:** This document defines a proposed testing workflow. It
> does not claim that tests already exist, that any feature is
> implemented, or that any command will pass in the current repository.
> Inspect the project and its package scripts before running commands.
> Test names, tooling, and acceptance criteria should be aligned with
> the actual implementation.

------------------------------------------------------------------------

## 1. Purpose

This document gives developers and Antigravity agents a repeatable
method to verify changes before calling a feature complete. The goal is
to catch defects early, protect existing behavior, and ensure that the
UI does not imply that unimplemented backend, synchronization, evidence,
or scientific-confirmation capabilities are working.

Testing should answer four questions:

1.  Does the feature meet an approved requirement?
2.  Does it behave correctly in normal and failure conditions?
3.  Does it work at supported screen sizes and with
    keyboard/accessibility basics?
4.  Did the change break anything that previously worked?

## 2. Testing principles

-   **Test real behavior, not appearances alone.** A button that looks
    correct but does nothing is not complete.
-   **Requirements lead.** Every test should map to an approved
    requirement, a documented defect, or a clearly stated risk.
-   **No fake success.** A timeout, mock, local queue change, or
    animation is not proof of server success.
-   **Keep demo data explicit.** Tests must distinguish demo/mock data
    from live backend data.
-   **Test failure states.** Network failure, validation errors, denied
    access, empty data, and unexpected responses are part of the
    product.
-   **Repeat after changes.** Run the relevant tests and regression
    checks after fixing a defect.
-   **Report evidence.** Record the command, environment, result, and
    any unresolved limitation.
-   **Do not overstate.** A passing frontend build does not prove API
    integration, security, scientific validity, or end-to-end
    correctness.

## 3. Test levels

  -----------------------------------------------------------------------
  Level                   What it checks          Example
  ----------------------- ----------------------- -----------------------
  Static checks           Type errors, lint       TypeScript check or
                          rules, formatting if    linter
                          configured              

  Unit tests              Small functions and     Input validation,
                          isolated logic          status mapping

  Component tests         UI behavior in          Form errors, loading
                          isolation               state, disabled submit

  Integration tests       Multiple modules        API client plus
                          working together        field-record service

  API/backend tests       FastAPI routes,         Invalid request
                          validation,             rejected
                          authorization, database 
                          behavior                

  End-to-end tests        User journey across the Create and view a
                          running app and backend record

  Manual exploratory      Visual quality,         Mobile navigation and
  tests                   usability, responsive   error messages
                          behavior                

  Regression tests        Previously working      Existing record list
                          behavior after a change still loads
  -----------------------------------------------------------------------

Not every level is necessarily configured in the repository. Do not add
multiple testing frameworks without a clear need and team agreement.

## 4. Repository discovery before testing

Before editing test configuration or choosing commands:

1.  Inspect the repository root and `frontend/` structure.
2.  Read `package.json` scripts and lockfile to identify the package
    manager and existing test tooling.
3.  Inspect existing test files, TypeScript configuration, Vite
    configuration, routing, API modules, and CI workflows.
4.  If the backend repository is available, inspect its dependency file,
    FastAPI app entry point, pytest configuration, route tests, and
    database test setup.
5.  Check the current Git status and avoid overwriting user work.
6.  Run the existing baseline checks before changes when practical;
    record any failures that already existed.
7.  Do not install a new framework or rewrite configuration before
    checking whether a suitable tool already exists.

Potential frontend commands (use only if supported by the actual
scripts):

``` bash
npm run
npm run build
npm run test
npm run lint
```

For a Python/FastAPI backend, commands might include:

``` bash
pytest
```

These are examples, not guarantees that the scripts or test dependencies
are configured.

## 5. Frontend test coverage

### 5.1 Rendering and navigation

-   Each approved route renders the expected page.
-   Navigation links go to the intended route.
-   Unknown routes show a useful not-found state.
-   Browser refresh on a nested route behaves correctly in the
    configured environment.
-   Loading, empty, error, and populated states are distinct.
-   No critical console errors occur during normal flows.

### 5.2 Forms and validation

-   Required fields are identified clearly.
-   Invalid inputs show specific, understandable messages.
-   Valid input can proceed to the next step.
-   Invalid input cannot be submitted accidentally.
-   Double-clicking submit does not create duplicate operations.
-   Form state is preserved or reset according to the approved workflow.
-   Keyboard users can reach and operate the controls.
-   Validation is repeated on the backend; frontend validation alone is
    not a security boundary.

### 5.3 API client behavior

-   Base URL comes from the documented environment configuration.
-   Successful JSON responses are parsed correctly.
-   `204 No Content` is handled without attempting JSON parsing.
-   HTTP errors, network errors, timeouts, malformed JSON, and
    validation errors are distinguishable.
-   Aborted/stale requests do not overwrite newer results.
-   Retry behavior follows the API contract and does not blindly repeat
    write requests.
-   No sensitive payloads or credentials are printed to the console.
-   Live API failures are not silently replaced with demo data.

### 5.4 User feedback and action integrity

For every visible button or action, verify:

-   Its purpose is clear.
-   It is enabled only when appropriate.
-   It responds to activation by mouse and keyboard.
-   It shows a pending state for work that takes time.
-   It prevents accidental duplicate submission when needed.
-   It displays success only after the operation is actually confirmed.
-   It shows a useful failure message when the operation fails.
-   It does not claim synchronization, verification, or confirmation
    without supporting system evidence.

### 5.5 Responsive and accessibility checks

At minimum, inspect representative narrow, medium, and wide viewports.
The exact breakpoints should follow the design system and actual
supported devices.

Check that:

-   No content is unintentionally clipped or causes page-wide horizontal
    scrolling.
-   Tables and dense records remain usable on narrow screens.
-   Navigation is accessible at small widths.
-   Text remains readable and controls have adequate target sizes.
-   Focus indicators are visible.
-   Form fields have programmatic labels.
-   Color is not the only way to communicate status.
-   Images have appropriate alternative text when meaningful.
-   Dialogs, menus, and keyboard interactions behave correctly if used.
-   Reduced-motion preferences are respected if motion is introduced.

Automated accessibility scans can help but do not replace keyboard and
screen-reader checks.

## 6. Backend/API test coverage

Where the backend is available, cover the following for each approved
endpoint:

-   Expected success response and response schema.
-   Missing, malformed, and boundary-value input.
-   Authentication missing or invalid, where authentication is required.
-   Authenticated user lacking permission.
-   Resource not found.
-   Conflicting or duplicate operation.
-   Database error and transaction rollback behavior.
-   Pagination and filters, if supported.
-   Safe error response with no stack trace or secret leakage.
-   Rate limits or throttling, if implemented.
-   CORS behavior from the intended frontend origin.

Authorization tests are especially important: verify that one user
cannot access or modify another user's restricted records by changing an
ID in the URL or request body.

Use isolated test data and a test database/configuration. Do not run
destructive tests against production data.

## 7. End-to-end journeys

Create end-to-end tests only for approved, implemented workflows. A
candidate journey for team review is:

1.  Open the application.
2.  Navigate to the approved field-record workflow.
3.  Enter valid data and submit.
4.  Confirm the server returns a record identifier and accepted status.
5.  Open the saved record and verify persisted values.
6.  Simulate a backend/network failure and confirm the UI reports
    failure rather than success.
7.  Confirm a user without permission cannot access restricted records,
    if authentication and roles are implemented.

If offline entry or synchronization is implemented, add separate tests
for offline creation, reconnecting, retries, duplicates, conflicts, and
server acknowledgements. Do not simulate a passing sync test by only
changing local UI state.

If lab confirmation is part of the approved workflow, test that the
interface clearly distinguishes a presumptive screening result from an
authorized confirmatory result. Do not use invented laboratory data to
claim scientific correctness.

## 8. Test data and demo mode

-   Use synthetic records that cannot be mistaken for real cases.
-   Label demo mode visibly in the interface and test reports.
-   Keep test fixtures separate from production data.
-   Avoid real personal information, real case evidence, and real
    location details in screenshots or logs.
-   Make fixtures deterministic so tests are repeatable.
-   Include empty, typical, long-text, invalid, boundary, and error
    scenarios.
-   Do not use fake data as evidence that the backend, sync, security,
    or laboratory workflow is functional.

## 9. Security and privacy checks

This section is a practical checklist, not a security certification.

-   No credentials, private keys, tokens, or database passwords in
    source control.
-   Frontend `VITE_` environment variables contain no secrets.
-   Protected API operations enforce authorization on the backend.
-   Error messages do not expose stack traces, SQL, filesystem paths, or
    internal infrastructure.
-   Logs avoid sensitive evidence and personal data.
-   CORS allows only approved origins appropriate to the deployment.
-   Production traffic uses HTTPS.
-   Upload validation and access controls are tested if evidence uploads
    exist.
-   Local storage and offline retention are reviewed before storing
    sensitive records on a device.
-   Dependency vulnerabilities are reviewed using the team's approved
    process.
-   Claims such as "encrypted," "tamper-proof," "legally admissible," or
    standards-compliant are not made unless the controls have been
    implemented, verified, and appropriately reviewed.

## 10. Build and release verification

Before merging or presenting a feature:

1.  Review the diff for accidental changes, debug code, secrets, and
    unrelated refactors.
2.  Run the existing type-check/build/test/lint scripts that are
    relevant.
3.  Run focused tests for the changed behavior.
4.  Run the broader regression suite available in the repository.
5.  Start the application and manually exercise the changed path.
6.  If the backend is involved, test against the agreed backend
    environment.
7.  Verify the production build, not just the development server.
8.  Record any checks that could not be run and why.
9.  Confirm the documentation matches the implemented behavior.
10. Ask before committing, pushing, deploying, or changing shared
    infrastructure.

A release checklist should include rollback/recovery considerations for
backend or database migrations.

## 11. Defect reporting template

For each defect, record:

-   **Title:** concise description.
-   **Requirement/route:** related requirement, page, or endpoint.
-   **Environment:** OS/browser, app version/commit, backend version if
    relevant.
-   **Preconditions:** data and permissions needed.
-   **Steps to reproduce:** minimal ordered steps.
-   **Expected result:** behavior defined by the approved contract.
-   **Actual result:** observed behavior.
-   **Evidence:** sanitized screenshot, logs, request/response, or test
    output.
-   **Severity:** impact-based assessment.
-   **Regression test:** the test that will prevent recurrence.
-   **Status:** open, in progress, fixed, retested, or blocked.

Never include passwords, session tokens, private keys, or unnecessary
personal data in a defect report.

## 12. Antigravity implementation loop

Use this loop for each bounded task:

1.  **Inspect:** read the relevant code, requirement, and tests.
2.  **Plan:** identify the smallest safe change and the checks needed.
3.  **Implement:** change only what is necessary.
4.  **Test:** run focused checks and capture actual output.
5.  **Review:** inspect the diff and look for edge cases, accessibility,
    security, and design mismatches.
6.  **Fix:** address verified issues without introducing unrelated
    refactors.
7.  **Retest:** rerun the failed checks and relevant regression tests.
8.  **Report:** summarize files changed, commands run, pass/fail
    results, and unresolved issues.

Stop and report a blocker when required backend behavior, credentials,
external services, or product decisions are unavailable. Do not claim
agents, tests, tools, or checks ran unless they actually did.

## 13. Definition of done

-   [ ] The change maps to an approved requirement or documented
    decision.
-   [ ] Existing repository conventions and test tools were inspected
    first.
-   [ ] Relevant unit/component/API tests pass, where configured.
-   [ ] Type checks and production build pass, where configured.
-   [ ] Loading, empty, error, and success states are covered where
    applicable.
-   [ ] Responsive and keyboard behavior were checked for UI changes.
-   [ ] No fake success or unsupported feature claims were introduced.
-   [ ] Security/privacy checks relevant to the change were completed.
-   [ ] Regression checks were run and results recorded.
-   [ ] Documentation and screenshots reflect actual behavior.
-   [ ] Remaining limitations and unrun checks are explicitly listed.
-   [ ] No commit, push, or deployment occurred without authorization.

------------------------------------------------------------------------

## 14. Related project documents

Keep this document aligned with:

-   `PROJECT_REQUIREMENTS.md` --- approved scope and acceptance
    criteria.
-   `DESIGN.md` --- visual and interaction expectations.
-   `ARCHITECTURE.md` --- component and service boundaries.
-   `DATABASE.md` --- proposed data model and persistence constraints.
-   `API.md` --- approved API contract and integration behavior.

**End of Testing Strategy**
