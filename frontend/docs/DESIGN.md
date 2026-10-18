# NashaPrahari --- Design System and UI/UX Specification

**Document ID:** NP-DESIGN-001\
**Version:** 0.1\
**Status:** Draft --- based on available Stitch exports and project
context\
**Last updated:** 17 October 2026

> This document defines the intended visual and interaction direction.
> The Stitch exports are design references, not proof that any
> capability is implemented. Verify actual files in the `Design/`
> directory before making implementation decisions.

## 1. Purpose

Guide implementation agents in translating the Google Stitch designs
into a maintainable, responsive React interface while preserving the
product's field-operations identity.

## 2. Design Principles

1.  **Field-first:** prioritize the actions and information an operator
    needs during field work.
2.  **Evidence and status clarity:** record identity, presumptive
    result, and synchronization state must be distinguishable.
3.  **Credible and restrained:** use a practical public-sector
    operations visual language rather than generic AI/SaaS styling.
4.  **Responsive by design:** desktop and mobile layouts should be
    purposefully adapted, not simply scaled.
5.  **Honest UI:** never imply live telemetry, successful sync, security
    guarantees, or completed actions unless they are real and verified.
6.  **Accessible:** readable type, clear contrast, keyboard support, and
    usable controls.
7.  **Consistency:** repeated actions, status labels, spacing, and
    components should behave consistently across screens.

## 3. Design Source of Truth

-   Treat the extracted Stitch HTML exports in `Design/` as visual
    references.
-   Inspect both folders and compare their contents before choosing the
    reference for a screen.
-   Preserve the original exported files. Do not edit them as the main
    application implementation.
-   Rebuild the design using React components, TypeScript, and the
    current frontend architecture.
-   Do not paste a complete standalone HTML page into a single React
    component.
-   If the exports disagree, document the discrepancy and use the design
    that best fits the intended viewport; do not silently discard useful
    content.
-   Do not invent screens or interactions merely because a link or
    button appears in an export.

## 4. Visual Direction

### 4.1 Palette

The observed direction is restrained navy, white, slate, and teal. Use
existing colors from the exports when they can be reliably identified.
Avoid introducing unrelated colors without a clear semantic purpose.

Recommended semantic use: - **Navy:** primary navigation, high-priority
headings, strong structural elements. - **White:** main surfaces and
content areas. - **Slate / neutral grays:** secondary text, borders,
subdued surfaces, metadata. - **Teal:** primary action or restrained
positive/highlight states. - **Amber:** warning or pending states, only
when semantically appropriate. - **Red:** error or urgent destructive
state, not decorative emphasis.

Do not hardcode guessed color values as authoritative if the actual
exported styles can be inspected.

### 4.2 Typography

-   Inspect the Stitch exports for the actual font family and weights.
-   Maintain a clear hierarchy among page title, section title, body
    text, labels, and metadata.
-   Avoid excessively small text for important field information.
-   Use tabular numerals for aligned counts or identifiers where useful.
-   Ensure status text remains understandable without relying on color
    alone.

### 4.3 Shape and density

-   Prefer practical spacing, clear grouping, and restrained borders.
-   Use cards only when they establish meaningful grouping.
-   Avoid excessive rounding, glassmorphism, gradient backgrounds,
    decorative blobs, and gratuitous shadows.
-   Dense record tables may be appropriate on desktop; mobile should use
    a readable responsive table or a deliberate compact record layout.

## 5. Information Hierarchy

The dashboard should prioritize the following, subject to the verified
design and actual functionality:

1.  Page title and current interface context.
2.  Primary field-test action, only when it leads to a meaningful
    implemented workflow.
3.  Record summary values, clearly labelled as demo/mock when not
    connected to real data.
4.  Recent records and their statuses.
5.  Presumptive-screening caution.
6.  Secondary diagnostics or supporting information only when it is
    real, useful, and in scope.

Do not let decorative metrics or technical badges compete with the core
field workflow.

## 6. Component Guidance

Use reusable components where repetition and behavior justify them.
Potential components include:

-   Application shell and responsive navigation.
-   Page header.
-   Primary and secondary action buttons.
-   Summary metric.
-   Record list/table.
-   Record status indicator.
-   Demonstration-data notice.
-   Presumptive-screening notice.
-   Empty state.
-   Error state.
-   Loading indicator.
-   Confirmation dialog, only for actions that genuinely need
    confirmation.

Do not create abstractions for one-off elements without a clear benefit.
Follow the existing repository structure and naming conventions.

## 7. Interaction Rules

-   Buttons must perform their advertised action or clearly indicate why
    the action is unavailable.
-   Links must navigate to valid destinations. Avoid placeholder
    `href="#"` links presented as functional.
-   Active navigation must reflect the current route.
-   Forms must provide labels, validation, and actionable errors.
-   Loading indicators should appear only while real or intentionally
    simulated demo work is in progress; demo behavior must be labelled.
-   Never display a success notification for an operation that did not
    occur.
-   Do not simulate real synchronization, laboratory confirmation,
    evidence capture, authentication, or persistence.
-   If a feature is not implemented, prefer a clearly disabled control
    with an explanation or omit it from the current phase.

## 8. Data and Status Presentation

### 8.1 Demonstration data

Until connected to a real data source: - Label the interface and
relevant records as demonstration/sample data. - Keep sample data in an
identifiable module. - Use fictional identifiers and avoid real personal
or operational information. - Do not imply sample records describe
actual cases.

### 8.2 Status terminology

Use precise labels and document their meanings. In particular: -
**Pending sync** means data has not yet been confirmed as
synchronized. - **Synchronized** means the synchronization operation was
confirmed by the actual system; mock examples must be clearly marked as
demo. - **Presumptive positive / negative / inconclusive** are screening
outcomes, not definitive laboratory conclusions. - **Confirmed** must
only be used when a genuine, appropriately sourced confirmatory result
exists.

Do not conflate record synchronization with scientific validation or
authorization.

## 9. Responsive Behavior

### Desktop

-   Use available width to support clear navigation and efficient record
    review.
-   Keep primary actions easy to locate.
-   Use tables when they remain readable and useful.
-   Avoid oversized decorative headers that push operational information
    below the fold.

### Mobile

-   Prioritize the primary action, key record statuses, and essential
    context.
-   Use a compact navigation pattern that remains accessible.
-   Prevent horizontal overflow.
-   Ensure touch targets are sufficiently large and spaced.
-   Reflow record details rather than shrinking text until it becomes
    unreadable.
-   Do not hide important warnings or status distinctions solely to save
    space.

### Verification

Inspect at minimum: - A narrow mobile viewport. - A typical
tablet/intermediate width if tooling permits. - A desktop viewport.

Check for overflow, overlapping elements, inaccessible controls, broken
navigation, and inconsistent spacing.

## 10. Accessibility Requirements

-   Use semantic HTML elements for navigation, main content, headings,
    buttons, forms, and tables.
-   Provide accessible names for icon-only buttons.
-   Preserve visible keyboard focus.
-   Ensure all actions are keyboard accessible.
-   Use text or icons in addition to color for status distinctions.
-   Associate input labels and error messages with their fields.
-   Provide meaningful alt text for informative images; use empty alt
    text for purely decorative images.
-   Respect reduced-motion preferences if motion is introduced.
-   Avoid unnecessary animation in an operational interface.

## 11. Icons, Images, and Assets

-   Reuse appropriate exported assets when licensing and technical
    context permit.
-   Inspect asset paths and confirm that images load in the actual
    application.
-   Do not depend on a remote CDN for a critical asset if the
    application is expected to work without network access unless that
    dependency is explicitly accepted.
-   Use consistent iconography and accessible labels.
-   Do not use decorative imagery to imply equipment, certification, or
    system capability that is not present.

## 12. Claims That Must Not Be Copied Uncritically

The exported mockups may contain visual claims such as encrypted local
database, SHA-256 evidence ledger, secure enclave, calibrated imager,
GPS precision, server latency, compliance standards, or certified
hardware. Treat these as unverified mockup content.

Do not display such claims as facts unless the implementation exists,
the measurement or configuration is real, and the claim has been
reviewed. A polished visual design does not make an engineering or
compliance claim true.

Likewise, do not use real coordinates, real officer identity details, or
unverified hotline numbers from mockups as production information.

## 13. Design Implementation Workflow

1.  Inspect the relevant Stitch export and its supporting assets.
2.  Identify layout structure, typography, spacing, colors, and
    interaction intent.
3.  Map the design to existing routes and reusable components.
4.  Implement a small, coherent slice.
5.  Run the type check and production build.
6.  Inspect the rendered page at mobile and desktop sizes.
7.  Test all visible controls.
8.  Compare the implementation against the export.
9.  Fix visual and functional discrepancies.
10. Record deliberate differences and limitations.

Use loop engineering: repeat inspect → implement → run → verify → fix
until the acceptance criteria pass or a genuine blocker requires human
input.

## 14. Design Acceptance Checklist

-   [ ] Correct Stitch references identified and original exports
    preserved.
-   [ ] Desktop and mobile layouts have been considered.
-   [ ] Color and typography choices are grounded in the actual design
    reference.
-   [ ] Visual hierarchy prioritizes field workflow and record status.
-   [ ] No unnecessary generic AI/SaaS decorations.
-   [ ] No dead links or misleading controls.
-   [ ] Mock data is visibly labelled.
-   [ ] Unsupported security, telemetry, compliance, and certification
    claims are removed or explicitly marked as demo placeholders.
-   [ ] Accessibility basics are checked.
-   [ ] No horizontal overflow or major layout breakage at tested
    widths.
-   [ ] Build passes and visual inspection is documented where tooling
    permits.

## 15. Open Questions

-   Which of the two Stitch folders is the canonical mobile reference
    and which is the desktop reference?
-   Which exact fonts, icons, and assets should ship locally?
-   What minimum viewport sizes must be supported?
-   What design requirements are mandatory in the official SIH problem
    statement?
-   Which operational details are approved for display in a
    demonstration?

Resolve these by inspecting the actual exports and confirming with the
team; do not guess.

## 16. Related Documents

-   `PROJECT_REQUIREMENTS.md`
-   `ARCHITECTURE.md`
-   `IMPLEMENTATION.md`
-   `FEATURE_DEVELOPMENT.md`
-   `TESTING.md`
-   `DEBUGGING.md`

## 17. Status

**Draft v0.1.** This specification guides the current frontend
foundation. Update it when the design references or approved product
requirements change.
