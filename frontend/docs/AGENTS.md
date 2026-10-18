# NashaPrahari Agent Instructions

**Document ID:** NP-AGENTS-001\
**Version:** 0.1 --- Draft / Proposed\
**Status:** Repository-level guidance; adapt after inspecting the actual
repository\
**Project:** NashaPrahari --- Field Testing Companion

> **Purpose:** This file is intended to be the central operating guide
> for AI coding agents working on NashaPrahari. It establishes how
> agents should inspect, plan, implement, verify, and report changes. It
> does not grant permission to perform destructive operations, commit,
> push, deploy, or access production systems.

------------------------------------------------------------------------

## 1. Project context

NashaPrahari is being developed as a field-testing companion for the
Smart India Hackathon project. The current plan identifies:

-   Frontend: React + TypeScript + Vite.
-   Backend: Python + FastAPI, coordinated with a teammate.
-   Database: PostgreSQL, planned.
-   Frontend directory: `frontend/`.
-   Design references: exports in `Design/`, including Stitch-generated
    mockups.

**These are planning details, not proof of the current repository
state.** Inspect the actual codebase before making assumptions. The
backend may live in a separate repository. Confirm official SIH
problem-statement requirements and team decisions before treating them
as binding product requirements.

The application should communicate clearly and credibly as a
field-operations tool. Avoid generic AI-SaaS styling, unsupported
security claims, fabricated metrics, and interactions that imply work
succeeded when it did not.

## 2. Read the project documents first

Before making a significant change, inspect the relevant documents in
`docs/`:

1.  `PROJECT_REQUIREMENTS.md` --- scope, functional requirements,
    acceptance criteria, open questions.
2.  `DESIGN.md` --- visual direction, components, responsive behavior,
    interaction rules.
3.  `ARCHITECTURE.md` --- frontend/backend responsibilities and system
    boundaries.
4.  `DATABASE.md` --- proposed entities and persistence decisions.
5.  `API.md` --- proposed API conventions and integration contract.
6.  `TESTING.md` --- testing strategy and definition of done.
7.  `SECURITY.md` --- threat model and security boundaries.
8.  `DEPLOYMENT.md` --- environment and release guidance.

The documents are drafts unless a section is explicitly approved by the
project owner. If a document conflicts with the actual code, approved
team decision, or official problem statement, do not silently choose
one. Explain the conflict and ask for the needed decision or document it
as a blocker.

Do not claim a document was read unless it was actually available and
inspected.

## 3. Core operating rules

### 3.1 Inspect before editing

-   Inspect the repository tree, relevant files, package scripts,
    configuration, and current Git status.
-   Search for existing components, API clients, schemas, helpers,
    tests, and design tokens before creating new ones.
-   Extend existing patterns where sensible; avoid duplicate
    implementations.
-   Read surrounding code before changing a file.
-   Preserve unrelated user work and local modifications.
-   Do not assume that a feature is missing merely because it is not in
    the first file inspected.

### 3.2 Requirements before implementation

-   Identify the requirement or approved issue the task addresses.
-   Define observable acceptance criteria before coding.
-   Keep the change focused on the requested scope.
-   If an essential product decision is unresolved, stop at that
    boundary and report the exact question.
-   Do not add features simply because they seem useful or appear in a
    visual mockup.
-   Keep proposed behavior clearly separate from implemented behavior.

### 3.3 Truthful behavior and status

-   A button must perform its advertised action or be clearly
    disabled/unavailable.
-   Never display success before the operation has actually succeeded.
-   Never invent API endpoints, backend responses, users, permissions,
    laboratory results, device telemetry, or server metrics.
-   Do not silently replace a failed live API call with mock data.
-   If demo mode is approved, label demo content clearly and isolate it
    from live data.
-   Distinguish **saved locally**, **queued**, **sent**, **server
    accepted**, **screening result**, and **laboratory-confirmed**
    states where applicable.
-   "Synchronized" does not mean "scientifically verified."
-   Do not claim encryption, tamper-proof evidence, legal admissibility,
    compliance, or secure enclaves without implemented controls, tests,
    and appropriate review.

### 3.4 Design and usability

-   Use the Stitch exports as visual references, not as proof that their
    displayed features exist.
-   Follow `DESIGN.md` and the existing design system where available.
-   Prefer clear hierarchy, readable typography, restrained colors, and
    purposeful whitespace.
-   Prioritize responsive behavior and accessibility.
-   Avoid decorative gradients, glassmorphism, random charts, excessive
    cards, unnecessary animations, and fabricated dashboard metrics.
-   Use real icons/assets already in the project when suitable; do not
    introduce large dependencies for trivial UI elements without a
    reason.
-   Make loading, empty, error, disabled, and success states explicit.

------------------------------------------------------------------------

## Anti-Patterns: Avoid Generic AI-Generated UI

NashaPrahari must not use the following as default design choices:

1. Harsh or decorative gradients.
2. Unnecessary Lucide icons or icon-heavy interfaces.
3. Pure white backgrounds everywhere without meaningful visual hierarchy.
4. Rainbow or inconsistent color palettes.
5. Excessive decorative drop shadows.
6. Repetitive three-feature-card layouts.
7. Emojis as interface decoration or substitutes for professional icons.
8. Glassmorphism or liquid-glass effects.
9. Excessive em dashes in user-facing copy.
10. Generic Inter, Geist, or Space Grotesk typography chosen without a design reason.
11. Decorative colored left-border stripes on every card.
12. Fake testimonials or fabricated trust signals.
13. Bento grids used merely because they are trendy.
14. Fake terminal windows or developer-themed decorations.
15. Empty marketing slogans and formulaic copy such as Its not X, its Y.
16. Repetitive checkmark bullets.
17. Unnecessary pricing-tier layouts.
18. Fake product demonstrations or simulated functionality presented as real.
19. Excessively rounded cards and controls.
20. Purple-and-black styling used as a generic AI aesthetic.
21. Skeleton loaders when they are unnecessary or inconsistent with actual loading behavior.
22. Decorative radial orbs.
23. Decorative dot grids.
24. Sparkle icons used to signal AI or sophistication without a real purpose.
25. Unnecessary animated arrows.
26. Missing required Terms of Service or equivalent legal information.
27. Missing required privacy information or a privacy policy where applicable.
28. Unnecessary hover animations.
29. Neon colors without a functional reason.
30. Generic pastel palettes without a deliberate product-specific design rationale.

## Required design direction

NashaPrahari is a practical field-operations application for police officers and government officials, not a generic AI SaaS landing page.

- Prioritize task completion, clarity, speed, readability, accessibility, and data integrity.
- Use a restrained, consistent color system appropriate for public-sector field operations.
- Prefer simple layouts, clear labels, practical forms, and obvious primary actions.
- Use decorative elements only when they improve comprehension or usability.
- Keep the home screen focused on New Field Test, Find a Record, Pending Uploads, and Help & Protocols.
- Make mobile field use a first-class requirement.
- Do not sacrifice accessibility or touch usability merely to avoid rounded corners, icons, shadows, or other items in the list.
- Never fabricate operational data, testimonials, security claims, laboratory confirmation, or successful synchronization.
- Follow the approved NashaPrahari design references and existing project documentation.

Before introducing a new visual pattern, ask whether it helps the officer complete a real task. If it does not, leave it out.

------------------------------------------------------------------------

## 4. Agent roles and delegation

When multi-agent tools are available, delegate bounded tasks with clear
file ownership. If multi-agent execution is not available, perform the
work sequentially and state that delegation was not used. Never claim
that agents ran when they did not.

Possible roles:

-   **Planner/Coordinator:** inspects scope, identifies dependencies,
    sets acceptance criteria, coordinates decisions, and integrates
    results.
-   **Frontend Implementer:** implements approved UI and frontend
    behavior.
-   **Backend/API Reviewer:** reviews FastAPI routes, request/response
    schemas, authorization, and integration assumptions when backend
    access is available.
-   **Test/QA Reviewer:** independently checks acceptance criteria, edge
    cases, accessibility, regression risk, and actual test output.
-   **Security Reviewer:** examines secrets, permissions, sensitive
    data, unsafe assumptions, and unsupported security claims.
-   **Design Reviewer:** compares the implementation with the approved
    design reference and checks responsive behavior.

### Delegation rules

-   Assign each agent a specific goal, expected output, and owned files
    or directories.
-   Avoid having multiple agents edit the same files simultaneously.
-   Ask reviewers to report findings and evidence, not to rewrite the
    whole project without approval.
-   Integrate changes only after reviewing diffs and resolving
    conflicts.
-   A reviewer's assertion is not a substitute for running tests.
-   Do not delegate access to production secrets or sensitive data
    unnecessarily.

## 5. Required implementation loop

For each bounded feature, use the following cycle:

1.  **Inspect:** review requirements, existing code, tests,
    dependencies, and repository status.
2.  **Plan:** list the smallest safe changes and the acceptance
    criteria.
3.  **Implement:** modify only the necessary files.
4.  **Verify:** run relevant type checks, tests, lint, build, or manual
    checks supported by the repository.
5.  **Review:** inspect the diff for regressions, security problems,
    accessibility issues, design mismatches, and unsupported claims.
6.  **Fix:** correct verified problems without unrelated refactoring.
7.  **Retest:** rerun failed checks and relevant regression tests.
8.  **Report:** list changed files, commands actually run, outcomes,
    limitations, and any decisions needed.

Repeat the loop when a concrete failure or unmet acceptance criterion
remains. Do not run endless loops without a defined test or improvement
target. Stop when acceptance criteria pass, a necessary dependency is
unavailable, or further changes require a product decision.

## 6. Frontend-specific rules

-   Follow the existing React, TypeScript, Vite, and routing patterns
    after verifying them.
-   Use TypeScript types for API contracts and component props where
    appropriate.
-   Keep API calls in the shared API/service layer if one exists.
-   Do not put secrets in `VITE_` variables; client-side environment
    variables are public.
-   Avoid unnecessary global state, dependencies, or broad rewrites.
-   Keep components focused and reusable when reuse is real, not forced.
-   Prevent duplicate submissions where appropriate.
-   Handle loading, empty, error, and permission-denied states.
-   Check narrow and wide viewports after layout changes.
-   Ensure keyboard focus, labels, contrast, and semantic structure are
    reasonable.
-   Do not add a mock fallback that masks live backend failures.

## 7. Backend, API, and database rules

When backend files are accessible:

-   Inspect the actual FastAPI entry point, routers, Pydantic schemas,
    dependency setup, migration tool, and tests.
-   Use the approved OpenAPI schema as the API source of truth once it
    exists.
-   Validate inputs on the backend.
-   Enforce authentication and resource-level authorization on protected
    operations.
-   Use safe database access and transactions where needed.
-   Avoid destructive migrations and preserve existing data.
-   Do not create parallel schemas, duplicate endpoints, or a second
    migration system without approval.
-   Do not assume an endpoint listed in `API.md` exists; it may be only
    a proposal.
-   If the backend is maintained by a teammate in a separate repository,
    provide the agreed contract or a precise integration request instead
    of inventing their implementation.

## 8. Security and privacy rules

-   Never reveal, print, commit, or hard-code credentials, tokens, keys,
    or connection strings.
-   Do not include sensitive personal information or real case evidence
    in test data, prompts, screenshots, or logs.
-   Use synthetic demo data.
-   Treat browser input, local state, client IDs, timestamps, and
    coordinates as untrusted.
-   Never rely on frontend-only permission checks.
-   Avoid logging full payloads when they may contain sensitive data.
-   Do not add analytics or external services that transmit data without
    approval.
-   Treat evidence upload, local/offline storage, synchronization, and
    audit trails as security-sensitive features requiring explicit
    design.
-   Ask before changing authentication, access control, retention,
    encryption, or deployment settings.
-   Do not claim legal or standards compliance without evidence and
    qualified review.

## 9. File and repository hygiene

-   Keep project documentation in `docs/` if that is the agreed
    structure.
-   Use clear, consistent filenames and follow existing naming
    conventions.
-   Do not create duplicate docs or components without checking for
    existing versions.
-   Do not overwrite user-created files just to match a proposed
    structure.
-   Keep generated files, caches, build outputs, local environment
    files, and secrets out of Git as appropriate.
-   Do not delete dependencies, lockfiles, migrations, assets, or
    configuration to "clean up" without understanding their purpose.
-   Do not perform broad formatting or refactoring unrelated to the
    task.
-   Do not commit, push, create releases, deploy, or change shared
    infrastructure unless explicitly authorized.

## 10. Commands and tool usage

Before running a command:

-   Confirm the working directory.
-   Inspect package scripts and repository instructions.
-   Understand whether the command changes files, deletes data, contacts
    external services, or modifies shared state.
-   Prefer the least destructive command that answers the question.
-   Ask before destructive or irreversible operations.
-   Never claim command success without observing the actual result.

After running checks, report the actual command and outcome. If a check
could not run because a dependency, service, credential, or environment
is missing, state that explicitly instead of treating it as passed.

## 11. Definition of done

A task is complete only when all applicable conditions are met:

-   [ ] The change maps to an approved requirement or documented
    decision.
-   [ ] Existing code and conventions were inspected first.
-   [ ] The change is focused and does not overwrite unrelated work.
-   [ ] Acceptance criteria are met by observable behavior.
-   [ ] Relevant checks were run and their real results recorded.
-   [ ] Failure, empty, loading, and permission states are handled where
    applicable.
-   [ ] Responsive and keyboard behavior were checked for UI changes.
-   [ ] No fake success, fabricated data, or unsupported capability
    claims were introduced.
-   [ ] Security and privacy implications were reviewed.
-   [ ] Documentation is updated when behavior or contracts change.
-   [ ] Known limitations and unrun checks are disclosed.
-   [ ] No commit, push, deployment, or production change occurred
    without authorization.

## 12. Required final report format

After a task, provide a concise report with these headings:

### Summary

What changed and why.

### Files changed

List the files actually changed.

### Verification

List commands actually run and whether each passed or failed. Include
relevant manual checks.

### Limitations

List unimplemented behavior, unavailable services, unrun tests, and
assumptions.

### Decisions needed

List any product or backend decisions that block safe completion. Write
"None" only if there are none.

Do not claim a task is fully complete if important acceptance criteria
remain unmet.

## 13. First-run instructions for an agent

When first introduced to this repository:

1.  Inspect the full top-level structure, Git status, and `frontend/`.
2.  Identify whether the eight supporting documents are present and read
    the relevant ones.
3.  Inspect package scripts, dependencies, routes, existing pages,
    design assets, and tests.
4.  Run baseline checks where safe and record actual output.
5.  Summarize the current implementation state without modifying files.
6.  List discrepancies between repository reality, docs, and the Stitch
    mockups.
7.  Propose a prioritized implementation plan and identify blockers.
8.  Wait for the user's approval before high-impact changes, destructive
    operations, or deployment.

**End of Agent Instructions**
