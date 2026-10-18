# NashaPrahari — Comprehensive Repository Audit & Technical Baseline

**Document ID:** NP-AUDIT-001  
**Audit Date:** 17 October 2026 (Local Time: 23:15 IST)  
**Auditor:** Senior Software Architect & Repository Auditor  
**Repository Branch:** `main` (tracking `origin/main`, behind by 1 commit)  
**Operating Environment:** Windows 11 (x64), Node.js `v24.19.0`, npm `11.17.0`  
**Target Project:** NashaPrahari — Digital Field Companion for Drug-Testing Operations (Smart India Hackathon SIH26231)

---

## 1. Executive Summary

This read-only audit provides a comprehensive, evidence-based assessment of the NashaPrahari codebase, verifying the repository structure, actual dependencies, implemented features, Stitch design alignment, documentation accuracy, and technical risks.

### High-Level Verdict
- **Frontend Foundation (Phase 1):** Fully implemented, robust, and functional. Uses React 19 + TypeScript 6 + Vite 8 with a dual-shell responsive architecture (Desktop fixed sidebar + header on `>1024px`; Handheld top bar + bottom nav on `<1024px`).
- **Build & Quality Gate:** `npm run build` (`tsc -b && vite build`) passes in ~225ms with 0 type errors. `npm run lint` (`oxlint`) passes in 58ms across 24 source files with 0 warnings and 0 errors.
- **Backend & Database:** **Completely absent from this repository.** There is no `backend/`, `server/`, or `api/` directory. All operational and session data currently relies on transparent, strongly typed client-side demonstration data (`src/data/mockData.ts`).
- **Automated Testing:** **No automated test runner or test suites exist.** `package.json` contains no `"test"` script, and no testing libraries (`vitest`, `jest`, `@testing-library/react`) are installed.
- **Statutory Integrity:** Strictly enforced. All screening results are visibly badged as "Presumptive Screening Only — Requires Confirmatory GC-MS/HPLC Laboratory Analysis" across all views, and all mock figures are clearly tagged as "(Simulated)" or "Demonstration Data".

---

## 2. Repository Structure

```text
NashaPrahari/
├── .git/                                # Git version control directory (main branch)
├── Design/                              # Raw Google Stitch design exports (Reference only)
│   ├── stitch_nashaprahari_field_testing_companion/
│   │   ├── code.html                    # Mobile shell (shell-type="mobile_tab", 390px viewport)
│   │   ├── DESIGN.md                    # Design tokens (Field Operations Core, 8px grid, Inter)
│   │   └── screen.png                   # Mobile design preview render (210 KB)
│   └── stitch_nashaprahari_field_testing_companion (1)/
│       ├── code.html                    # Desktop dashboard (shell-type="web_dashboard", 1440px)
│       ├── DESIGN.md                    # Desktop design tokens & component specifications
│       └── screen.png                   # Desktop design preview render (496 KB)
├── frontend/                            # Active React + TypeScript frontend application
│   ├── dist/                            # Production build output (generated via vite build)
│   │   ├── assets/
│   │   │   ├── index-C9pBzupL.css       # Bundled stylesheet (13.66 kB, gzip: 3.07 kB)
│   │   │   └── index-BIpaUhA2.js        # Bundled JavaScript (344.78 kB, gzip: 96.62 kB)
│   │   └── index.html                   # Bundled HTML shell (0.93 kB)
│   ├── docs/                            # Canonical project documentation suite
│   │   ├── AGENTS.md                    # AI coding agent operating guidelines & DoD
│   │   ├── API.md                       # Proposed FastAPI integration contract & endpoints
│   │   ├── ARCHITECTURE.md              # System boundaries, data flow & component design
│   │   ├── DATABASE.md                  # Proposed logical schema & PostgreSQL models
│   │   ├── DEPLOYMENT.md                # Environment guide & release process
│   │   ├── DESIGN.md                    # Design system & UI/UX specifications
│   │   ├── PROJECT_REQUIREMENTS.md      # PRD, SIH26231 requirements & Phase 1-5 scope
│   │   ├── README.md                    # Project documentation index & quick start
│   │   ├── REPOSITORY_AUDIT.md          # This audit document
│   │   ├── SECURITY.md                  # Threat model, evidence custody & compliance
│   │   └── TESTING.md                   # Verification strategy, checklists & test matrix
│   ├── public/                          # Public static assets
│   ├── src/                             # Application source code
│   │   ├── assets/                      # Static icons and logos (hero.png, react.svg, vite.svg)
│   │   ├── components/                  # Reusable UI component library
│   │   │   ├── common/
│   │   │   │   ├── RecordDetailModal.tsx # Full-screen modal drawer for record inspection
│   │   │   │   ├── StatusBadge.tsx      # Semantic badge (Presumptive Result & Sync Status)
│   │   │   │   └── StatutoryNotice.tsx  # Forensic legal disclaimer banner
│   │   │   ├── dashboard/
│   │   │   │   ├── MetricCards.tsx      # 4 operational metrics (Logged, Synced, Pending, Kits)
│   │   │   │   ├── OfficerHero.tsx      # Desktop command bar & mobile hero card
│   │   │   │   ├── ProtocolsCard.tsx    # SOP quick viewer with interactive modal
│   │   │   │   ├── RecentRecordsTable.tsx # Tabular/Card ledger with search & filters
│   │   │   │   └── TerminalStatusCard.tsx # Device health, telemetry & barcode emulator
│   │   │   └── layout/
│   │   │       ├── AppShell.tsx         # Responsive wrapper & notification toast manager
│   │   │       ├── DesktopHeader.tsx    # Fixed top header for desktop console (64px)
│   │   │       ├── DesktopSidebar.tsx   # Fixed left console sidebar (288px / w-72)
│   │   │       ├── MobileBottomNav.tsx  # Sticky 4-tab bottom navigation bar
│   │   │       └── MobileHeader.tsx     # Compact handheld header with safe-area insets
│   │   ├── data/
│   │   │   └── mockData.ts              # 14 realistic field records & officer session state
│   │   ├── pages/                       # Application route pages
│   │   │   ├── DashboardPage.tsx        # Main command dashboard (`/`)
│   │   │   ├── EvidenceLockerPage.tsx   # Tamper-proof bag registry (`/evidence-locker`)
│   │   │   ├── HelpProtocolsPage.tsx    # Field manuals & emergency helpline (`/help-protocols`)
│   │   │   ├── NewTestPage.tsx          # Step 1 of 5 field screening wizard (`/new-test`)
│   │   │   ├── RecordsHistoryPage.tsx   # Chronological ledger view (`/records`)
│   │   │   └── SyncQueuePage.tsx        # Offline sync queue monitor (`/sync-queue`)
│   │   ├── types/
│   │   │   └── testRecord.ts            # Strict domain types & TypeScript interfaces
│   │   ├── App.css                      # Application layout, utility classes & responsive rules
│   │   ├── App.tsx                      # Root component, router & reactive state store
│   │   ├── index.css                    # Design token CSS variables, typography & reset
│   │   └── main.tsx                     # React 19 entry point (`createRoot`)
│   ├── .oxlintrc.json                   # Oxlint rules configuration (116 rules active)
│   ├── index.html                       # HTML entry point with Inter & Material Symbols fonts
│   ├── package.json                     # Package dependencies and npm scripts
│   ├── package-lock.json                # Locked dependency tree
│   ├── tsconfig.app.json                # TypeScript compiler config for frontend application
│   ├── tsconfig.json                    # Solution tsconfig referencing app & node
│   ├── tsconfig.node.json               # TypeScript compiler config for Vite tooling
│   └── vite.config.ts                   # Vite bundler configuration
└── README.md                            # Root workspace README
```

---

## 3. Technology Stack Verified from Source Files

| Category | Technology | Version Verified in Code | Notes & Purpose |
|---|---|---|---|
| **Runtime Environment** | Node.js | `v24.19.0` (Active) | Validated via `node -v` |
| **Package Manager** | npm | `11.17.0` (Active) | Validated via `npm -v` |
| **UI Framework** | React | `19.2.8` (Installed: `19.3.1`) | React 19 with JSX transform |
| **DOM Renderer** | React DOM | `19.2.8` (Installed: `19.3.1`) | Concurrent root rendering |
| **Routing** | React Router DOM | `^7.18.4` | Client-side routing with `BrowserRouter`, `Routes`, `Route` |
| **Language** | TypeScript | `~6.0.2` (Installed: `6.0.3`) | Strict compiler options: `verbatimModuleSyntax`, `noUnusedLocals` |
| **Bundler / Dev Server** | Vite | `^8.3.0` (Installed: `8.3.4`) | High-speed Rolldown/Oxc build pipeline |
| **Vite React Plugin** | `@vitejs/plugin-react` | `^6.1.1` | Fast HMR & React compiler support |
| **Linter** | Oxlint (`oxc`) | `^1.81.0` | Ultra-fast Rust-based linter (58ms runtime) |
| **Typography** | Inter | Google Fonts (400, 500, 600, 700) | Loaded in `index.html`, specified in `DESIGN.md` |
| **Iconography** | Material Symbols Outlined | Google Fonts (opsz: 20-48, wght: 100-700) | System-wide glyphs |
| **Styling Architecture** | Pure CSS Tokens | Custom CSS in `index.css` & `App.css` | Zero external framework runtime overhead; exact Stitch tokens |
| **Backend Service** | Python / FastAPI | **NOT INSTALLED** | Documented in `API.md` and `ARCHITECTURE.md`; not in repo |
| **Database** | PostgreSQL | **NOT INSTALLED** | Documented in `DATABASE.md`; not in repo |
| **Testing Harness** | Vitest / Jest | **NOT INSTALLED** | Outlined in `TESTING.md`; no test runner or specs in repo |

---

## 4. Implementation Status Matrix

### 4.1 Implemented & Verified Capabilities
- [x] **Dual-Shell Responsive Layout (`AppShell.tsx`):**
  - Desktop view (`>=1024px`): Fixed 288px sidebar with console navigation, active route styling, system diagnostics, and 64px command header.
  - Mobile view (`<1024px`): Handheld header with safe-area insets (`pt-safe`), connectivity status pill, and 4-tab bottom navigation (`pb-safe`) with 48px touch targets.
- [x] **Officer Field Dashboard (`DashboardPage.tsx`):**
  - Officer identity and sector context (`Insp. A. Rathore #84920`, North Zone Command).
  - 4 Operational Metric Cards (Today's Tests Logged, Synced to Ledger, Queued Offline, Reagent Kits Available).
  - High-visibility `StatutoryNotice` banner regarding presumptive screening versus confirmatory GC-MS/HPLC analysis.
  - Recent Test Records Table with dynamic multi-term search, category filter (All, Presumptive Positive, Presumptive Negative, Inconclusive), and 5-item pagination.
  - Terminal Status Card (Storage 99.4%, Battery 88%, Active Shift timing, and functional barcode scan simulator).
  - Quick Protocols SOP Card with 3 actionable SOP modals (Evidence Handling, Lab Helpline, Kit Calibration).
- [x] **New Test Entry Workflow (`NewTestPage.tsx`):**
  - Step 1 of 5 field testing wizard (Officer ID, Substance Physical Appearance, Suspect/Case Reference, Reagent Kit Lot #).
  - Input field label accessibility (`id` and `htmlFor` attributes linked).
  - Real form validation preventing empty submissions.
  - Simulated local queue insertion updating the top-level reactive record store and metrics.
  - Clear documentation of Step 2–5 boundaries (colorimetric analysis, camera feed, and chemical reaction stages reserved for Phase 2).
- [x] **Test Records & History Ledger (`RecordsHistoryPage.tsx`):**
  - Full chronological ledger with record counts, "+ New Test" CTA, and `<StatutoryNotice />`.
  - Reuse of [`RecentRecordsTable`](file:///D:/3RD%20SEM/PROJECTS/Projects/NashaPrahari/frontend/src/components/dashboard/RecentRecordsTable.tsx) with search and filtering.
- [x] **Offline Sync Queue (`SyncQueuePage.tsx`):**
  - Segregated lists for pending offline queue items and synchronized records.
  - "Sync All Pending" button with spinner state and honest notification banner disclaiming local demonstration simulation.
  - Cross-route `<StatutoryNotice />` compliance.
- [x] **Evidence Locker & Chain of Custody (`EvidenceLockerPage.tsx`):**
  - Tamper-proof physical evidence bag registry (`BAG-NP-7701`, `BAG-NP-7703`).
  - Serialized barcode references, sealing timestamps, custody officer names, and vault dispatch statuses.
  - Standardized semantic result tags via [`StatusBadge`](file:///D:/3RD%20SEM/PROJECTS/Projects/NashaPrahari/frontend/src/components/common/StatusBadge.tsx).
- [x] **Help & Field Protocols (`HelpProtocolsPage.tsx`):**
  - Full SOP manuals for Evidence Handling (SOP-SEC-04), Lab Dispatch Hotline (FSL-TOLLFREE), and Kit Expiry & Calibration (QC-CAL-12).
- [x] **Accessibility & Navigation:**
  - Dialog dismissals via `Escape` key listeners and backdrop click handlers (`RecordDetailModal.tsx`, `ProtocolsCard.tsx`).
  - WCAG SC 1.4.4 zoom accessibility enabled (`viewport-fit=cover`, removing `user-scalable=no`).
  - High-contrast badges meeting WCAG AA requirements (4.5:1 ratio).

### 4.2 Partially Implemented / Simulated Capabilities
- [~] **Offline Sync Engine:** A simulated in-memory timeout updates `syncStatus` from `'pending'` to `'synced'` in React state. No IndexedDB persistence or background service worker is currently connected.
- [~] **Barcode Scanner:** Barcode scanning in [`TerminalStatusCard`](file:///D:/3RD%20SEM/PROJECTS/Projects/NashaPrahari/frontend/src/components/dashboard/TerminalStatusCard.tsx) and [`NewTestPage`](file:///D:/3RD%20SEM/PROJECTS/Projects/NashaPrahari/frontend/src/pages/NewTestPage.tsx) allows manual string entry or instant random barcode generation; live camera optical barcode decoding is not yet integrated.
- [~] **Field Test Wizard:** Only Step 1 (Metadata & Substance Observation) is functional; Steps 2–5 (Camera Capture, Reagent Pouch Colorimetry, Presumptive Matching, Digital Sign-off) are documented placeholders.

### 4.3 Missing Capabilities (Phase 2+ Scope)
- [ ] **Automated Test Harness:** Vitest, Jest, or Playwright configuration and test files.
- [ ] **Client Persistence Layer:** IndexedDB / Dexie.js for retaining records across browser reloads.
- [ ] **Backend Service:** FastAPI server, REST API endpoints, and authentication middleware.
- [ ] **Database & Migrations:** PostgreSQL database, SQLAlchemy models, and Alembic migrations.
- [ ] **Colorimetric Computer Vision / ML:** Client or server ML inference model for reagent pouch color change detection.
- [ ] **Cryptographic Signing:** Hardware token / WebCrypto API for tamper bag hashing and chain-of-custody signatures.

---

## 5. Documentation-versus-Code Discrepancies

| Document & Section | Documented Claim / Expectation | Actual Codebase Reality | Discrepancy Level | Recommendation |
|---|---|---|---|---|
| **Location of Docs** (`README.md`, `AGENTS.md`) | Documents expected under `docs/` at repository root | Documents reside in `frontend/docs/` | Minor / Organizational | Keep in `frontend/docs/` or mirror/symlink to root `docs/` |
| **Backend Directory** (`ARCHITECTURE.md §7`) | Proposes `backend/app/...` (main.py, api, schemas, models) | No `backend/` directory exists in repository | Expected for Phase 1 | Clarify in `ARCHITECTURE.md` that backend is developed in partner repo |
| **Database & ORM** (`DATABASE.md §4`) | Proposes PostgreSQL schema and migrations | No database files, ORM models, or connection strings exist | Expected for Phase 1 | Maintain document as planned target architecture |
| **API Endpoints** (`API.md §4`) | Documents 14 REST endpoints under `/api/v1/*` | No HTTP fetch calls exist; frontend uses `mockData.ts` in-memory | Expected for Phase 1 | Create `src/services/apiClient.ts` scaffold when backend is available |
| **Automated Testing** (`TESTING.md §3-§5`) | Specifies static, unit, component, integration, and E2E tests | No `test` script in `package.json`; 0 test files exist | Critical Gap | Install Vitest + React Testing Library as next immediate priority |
| **Hardware Telemetry** (`DESIGN.md §8`) | Visual mockups display Battery %, Storage %, Cellular Signal | Rendered values are hardcoded mock states | Known Limitation | Explicitly labeled as simulated telemetry in UI |

---

## 6. Build and Test Verification

Both available automated checks defined in `frontend/package.json` were executed directly in the project directory.

### Check 1: Static Typecheck & Production Build
- **Command:** `npm run build` (`tsc -b && vite build`)
- **Working Directory:** `D:\3RD SEM\PROJECTS\Projects\NashaPrahari\frontend`
- **Exit Code:** `0` (Success)
- **Execution Time:** **254ms**
- **Output Artifacts:**
  - `dist/index.html` (0.93 kB, gzip: 0.50 kB)
  - `dist/assets/index-C9pBzupL.css` (13.66 kB, gzip: 3.07 kB)
  - `dist/assets/index-BIpaUhA2.js` (344.78 kB, gzip: 96.62 kB)
- **Verification:** 0 TypeScript compiler errors. No bundle warnings.

### Check 2: Linter
- **Command:** `npm run lint` (`oxlint`)
- **Working Directory:** `D:\3RD SEM\PROJECTS\Projects\NashaPrahari\frontend`
- **Exit Code:** `0` (Success)
- **Execution Time:** **58ms**
- **Results:** Found 0 warnings and 0 errors across 24 files with 116 active rules.

### Check 3: Automated Test Suite
- **Command:** `npm test`
- **Exit Code:** Failed — `npm error Missing script: "test"`
- **Finding:** No test runner is configured in `package.json`.

---

## 7. Stitch Design Review & Comparison

The project's `Design/` directory contains two Google Stitch exports:
1. `stitch_nashaprahari_field_testing_companion/` (`mobile_tab` — 390px viewport)
2. `stitch_nashaprahari_field_testing_companion (1)/` (`web_dashboard` — 1440px viewport)

### Alignment Matrix
| Stitch Design Component | Mobile Design (`mobile_tab`) | Desktop Design (`web_dashboard`) | Implemented in Frontend? | Notes on Fidelity & Enhancements |
|---|---|---|---|---|
| **Console Sidebar** | Not in mobile design | 288px (`w-72`) fixed left sidebar | **Yes** ([`DesktopSidebar.tsx`](file:///D:/3RD%20SEM/PROJECTS/Projects/NashaPrahari/frontend/src/components/layout/DesktopSidebar.tsx)) | 100% match: 6 navigation links, active highlight, diagnostics pill. |
| **Top Command Header** | Compact 64px bar with online pill | 64px header with Zone command info | **Yes** ([`DesktopHeader.tsx`](file:///D:/3RD%20SEM/PROJECTS/Projects/NashaPrahari/frontend/src/components/layout/DesktopHeader.tsx), [`MobileHeader.tsx`](file:///D:/3RD%20SEM/PROJECTS/Projects/NashaPrahari/frontend/src/components/layout/MobileHeader.tsx)) | Desktop displays command title; mobile displays compact status + demo chip. |
| **Bottom Navigation** | 4-tab bar (Home, Test, Records, Sync) | Not in desktop design | **Yes** ([`MobileBottomNav.tsx`](file:///D:/3RD%20SEM/PROJECTS/Projects/NashaPrahari/frontend/src/components/layout/MobileBottomNav.tsx)) | Handheld `<1024px` renders sticky bottom bar with >=44px tap targets. |
| **Officer Hero / Banner** | Full-width shift & patrol card | Inline command bar with actions | **Yes** ([`OfficerHero.tsx`](file:///D:/3RD%20SEM/PROJECTS/Projects/NashaPrahari/frontend/src/components/dashboard/OfficerHero.tsx)) | Both mobile and desktop viewports render dedicated layout variants. |
| **Statutory Notice** | Not present in raw Stitch mockup | Not present in raw Stitch mockup | **Added** ([`StatutoryNotice.tsx`](file:///D:/3RD%20SEM/PROJECTS/Projects/NashaPrahari/frontend/src/components/common/StatutoryNotice.tsx)) | **Statutory Enhancement:** Mandated by SIH directive to prevent legal misinterpretation. |
| **Operational Metrics** | 2-column compact grid | 4-column dense cards with progress | **Yes** ([`MetricCards.tsx`](file:///D:/3RD%20SEM/PROJECTS/Projects/NashaPrahari/frontend/src/components/dashboard/MetricCards.tsx)) | Responsive grid: 1 col on mobile, 2 col on tablet, 4 col on desktop. |
| **Recent Records Table** | Vertical card list | High-density data table | **Yes** ([`RecentRecordsTable.tsx`](file:///D:/3RD%20SEM/PROJECTS/Projects/NashaPrahari/frontend/src/components/dashboard/RecentRecordsTable.tsx)) | Dual-mode: Card layout on mobile, tabular on desktop, with active search & filters. |
| **Terminal Status Card** | Bottom telemetry card | Side telemetry module | **Yes** ([`TerminalStatusCard.tsx`](file:///D:/3RD%20SEM/PROJECTS/Projects/NashaPrahari/frontend/src/components/dashboard/TerminalStatusCard.tsx)) | Shows battery, storage, shift timer, and kit barcode scanner simulator. |
| **Protocols Card** | SOP summary card | SOP collapsible / quick panel | **Yes** ([`ProtocolsCard.tsx`](file:///D:/3RD%20SEM/PROJECTS/Projects/NashaPrahari/frontend/src/components/dashboard/ProtocolsCard.tsx)) | Includes interactive detail modals with Escape key dismissal. |

---

## 8. Technical Risks & Vulnerabilities

| Risk ID | Severity | Description | Mitigation Strategy |
|---|---|---|---|
| **TR-001** | **High** | **Zero Automated Regression Testing:** Without Vitest or Jest, any future modifications to state or routing could introduce silent regressions undetected by the compiler. | Configure Vitest, jsdom, and `@testing-library/react` immediately. |
| **TR-002** | **Medium** | **Volatile In-Memory State:** Test records and pending sync items are stored in React component state. A browser refresh completely resets new records to mock baseline. | Introduce client-side IndexedDB persistence (`idb` or `dexie`) in Phase 2. |
| **TR-003** | **Medium** | **Unconnected Backend API Contract:** `API.md` outlines FastAPI endpoints, but no client service abstraction exists in `src/`. If backend development begins independently, payload schema drift may occur. | Implement a strongly typed `src/services/apiClient.ts` matching `API.md`. |
| **TR-004** | **Low** | **Git Out-of-Sync:** Current local branch is behind `origin/main` by 1 commit. | Fast-forward merge `origin/main` after team approval. |

---

## 9. Prioritized Implementation Roadmap

```text
┌────────────────────────────────────────────────────────────────────────┐
│ PHASE 1: Frontend Foundation & Design Integration (COMPLETED & AUDITED)│
│ • Dual-shell responsive layout (Desktop sidebar + Handheld navigation)  │
│ • Complete Dashboard, Records, Sync, Evidence, and Protocol screens    │
│ • Statutory disclaimer compliance and mock data isolation              │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│ PHASE 2: Verification Harness & Offline Persistence (IMMEDIATE NEXT)  │
│ • Setup Vitest + React Testing Library + happy-dom                     │
│ • Add unit tests for Metric calculations, filtering, and validation   │
│ • Add IndexedDB client persistence (offline queue surviving reload)    │
│ • Implement Step 2-5 of Field Test Screening Wizard                    │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│ PHASE 3: Backend API Service Integration                               │
│ • Initialize Python FastAPI backend (routers, schemas, repositories)   │
│ • Implement PostgreSQL database models & Alembic migrations            │
│ • Connect frontend `apiClient.ts` to `/api/v1/field-records`           │
│ • Role-based session authentication (Field Officer vs. FSL Analyst)   │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│ PHASE 4: Colorimetric ML Inference & Hardware Scanner                  │
│ • Device camera stream integration with calibration reference card     │
│ • Computer Vision colorimetric analysis for drug reagent pouches       │
│ • Optical barcode/QR scanner integration for serialized tamper bags    │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│ PHASE 5: Evidentiary Integrity & Cryptographic Custody                 │
│ • WebCrypto SHA-256 evidence hashing                                   │
│ • Digital signature capture for field officer chain-of-custody         │
│ • Service Worker background synchronization with conflict resolution   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 10. Exact Files Requiring Changes for Phase 2

For the immediate next phase (Phase 2: Automated Testing Harness & Client Persistence), the following files will require modifications or creation:

1. **`frontend/package.json`**:
   - Add devDependencies: `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `happy-dom` or `jsdom`.
   - Add dependencies: `idb` or `dexie` (for IndexedDB offline storage).
   - Add script: `"test": "vitest run"`.
2. **`frontend/vite.config.ts`**:
   - Configure test environment (`test: { environment: 'happy-dom' }`).
3. **`frontend/src/services/storageService.ts`** *(New)*:
   - Implement IndexedDB repository for storing and retrieving field test records offline.
4. **`frontend/src/App.tsx`**:
   - Replace in-memory `useState` initializers with asynchronous hydration from `storageService`.
5. **`frontend/src/pages/NewTestPage.tsx`**:
   - Expand Step 1 into the multi-step screening wizard (reagent selection, reaction observation, presumptive result classification).
6. **`frontend/src/__tests__/metricCalculations.test.ts`** *(New)*:
   - Unit tests verifying operational metric sums, kit decrements, and search/filter algorithms.

---

## 11. Auditor's Recommended Single Next Action

> [!IMPORTANT]
> **Single Highest-Priority Next Action:**  
> **Install and configure the automated testing harness (`vitest` + `@testing-library/react`) in `frontend/` and add automated unit tests for state metrics, record filtering, and form validation.**
>
> *Rationale:* Currently, the codebase has 0 automated tests despite having comprehensive documentation in `TESTING.md`. Establishing the test runner is the critical engineering prerequisite before introducing client persistence or expanding the 5-step test wizard, ensuring that the existing Phase 1 foundation is protected against regressions.
