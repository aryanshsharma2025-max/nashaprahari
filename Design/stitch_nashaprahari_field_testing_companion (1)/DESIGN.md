---
name: Field Operations Core
colors:
  surface: '#f7f9fc'
  surface-dim: '#d8dadd'
  surface-bright: '#f7f9fc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f7'
  surface-container: '#eceef1'
  surface-container-high: '#e6e8eb'
  surface-container-highest: '#e0e3e6'
  on-surface: '#191c1e'
  on-surface-variant: '#43474d'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f4'
  outline: '#74777e'
  outline-variant: '#c4c6ce'
  surface-tint: '#4a607c'
  primary: '#00162e'
  on-primary: '#ffffff'
  primary-container: '#142b45'
  on-primary-container: '#7d93b2'
  inverse-primary: '#b2c8e9'
  secondary: '#006a63'
  on-secondary: '#ffffff'
  secondary-container: '#99efe5'
  on-secondary-container: '#006f67'
  tertiary: '#051629'
  on-tertiary: '#ffffff'
  tertiary-container: '#1b2b3f'
  on-tertiary-container: '#8292ab'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d3e4ff'
  primary-fixed-dim: '#b2c8e9'
  on-primary-fixed: '#031c36'
  on-primary-fixed-variant: '#334863'
  secondary-fixed: '#9cf2e8'
  secondary-fixed-dim: '#80d5cb'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#00504a'
  tertiary-fixed: '#d3e4fe'
  tertiary-fixed-dim: '#b7c8e1'
  on-tertiary-fixed: '#0b1c30'
  on-tertiary-fixed-variant: '#38485d'
  background: '#f7f9fc'
  on-background: '#191c1e'
  surface-variant: '#e0e3e6'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  title-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.05em
  code-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system delivers a rigorous, mission-critical operational interface built for field personnel, compliance officers, and public sector administrators. The aesthetic rejects decorative trends, ephemeral micro-interactions, and visual ambiguity in favor of absolute clarity, uncompromised legibility under direct sunlight, and unambiguous data density.

Drawing from modern utilitarianism and institutional design movements, the system prioritizes predictability, high-contrast separation, and structural resilience. The emotional tone is authoritative, sober, and dependable—conveying the unyielding rigor of official documentation while accommodating fast-paced, high-stress field conditions.

## Colors

The palette establishes an immediate operational hierarchy, pairing deep authoritative blues with functional accents and dedicated status channels.

- **Primary Canvas & Surfaces**: The base canvas is `#F5F7FA` (Off-white), ensuring a softer background that reduces glare during outdoor operation. Structural cards, panels, and data tables rest on `#FFFFFF` (Crisp White) to maximize contrast against text and interactive elements.
- **Primary Command**: `#142B45` (Deep Navy) anchors headers, primary action buttons, key data values, and structural framing.
- **Secondary / Accent**: `#0F766E` (Teal) serves strictly for verified interactive paths, active tabs, secondary button outlines, and primary system callouts without visual distraction.
- **Text & Outlines**: Primary reading text uses `#0F172A` (Slate 900) for sharp readability. Secondary labels, timestamps, metadata keys, and helper text use `#64748B` (Slate 500). All container boundaries and structural segmentations use a crisp 1px rule of `#E2E8F0` (Slate 200).
- **Utilitarian Status Semantics**:
  - **Success / Synced / Completed**: `#059669` (Emerald)
  - **Warning / Pending Sync / Offline / Inconclusive**: `#D97706` (Amber)
  - **Critical / Sync Error / Failed / Positive Caution**: `#DC2626` (Rose)

Status colors must never be rendered as light decorative washes without a solid glyph or text equivalent. Every alert or state badge retains a solid or high-contrast border and legible label text.

## Typography

The type system is powered exclusively by Inter, utilizing precise font weights (400, 500, 600, 700) to construct clear information density.

- **Tabular Numerals**: Form fields, serial records, test kit identifiers, dates, timestamps, GPS coordinates, and quantitative entries must enforce tabular numeric display (`font-feature-settings: 'tnum' on, 'cv05' on`).
- **Hierarchy and Restraint**: Header scales are kept disciplined and compact to avoid wasting vertical real estate in handheld data-entry workflows. All uppercase section tags leverage `label-sm` or `label-md` with strict tracking for instant scanning.

## Layout & Spacing

Layouts adhere to an 8px base grid rhythm (with a 4px sub-grid for fine-grained alignments such as form control padding and icon margins).

- **Grid Architecture**:
  - **Mobile (< 768px)**: 4-column layout with 16px (`1rem`) outer margins and 16px gutters. Actions pin to full-width or dual sticky bars.
  - **Tablet (768px - 1024px)**: 8-column layout with 24px margins and 16px gutters. Form panels split cleanly into primary data input and lateral contextual verification panes.
  - **Desktop (> 1024px)**: 12-column layout bounded by a maximum readable width of 1440px with 32px (`2rem`) margins and 24px (`1.5rem`) gutters.
- **Field Ergonomics**: Despite compact visual padding in data tables (8px vertical cell padding), every primary mobile tap target must maintain a physical footprint of at least 44x44px.

## Elevation & Depth

This system avoids expressive glassmorphic blurs, colored glows, and atmospheric drop-shadows. Elevation is achieved through structural layering and razor-sharp containment:

- **Level 0 (Base Canvas)**: `#F5F7FA`. Neutral foundation for background views and sidebars.
- **Level 1 (Card / Surface)**: `#FFFFFF` with a mandatory border (`1px solid #E2E8F0`). Flat elevation with a minimal structural shadow: `0 1px 2px 0 rgba(15, 23, 42, 0.05)`.
- **Level 2 (Popovers / Dropdowns / Inspection Menus)**: `#FFFFFF` with a `1px solid #CBD5E1` border and a directional contact shadow: `0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.04)`.
- **Level 3 (Modal / Critical Confirmation Drawer)**: `#FFFFFF` with a `1px solid #94A3B8` border and strict focus-shielding backdrop (`rgba(15, 23, 42, 0.65)` scrim): `0 10px 15px -3px rgba(15, 23, 42, 0.1), 0 4px 6px -4px rgba(15, 23, 42, 0.05)`.

## Shapes

The design system enforces a soft, structured corner philosophy (`roundedness: 1`, 4px / `0.25rem` standard). 

- **Inputs, Buttons, and Table Rows**: Standard radius of 4px (`0.25rem`). This provides crisp, architectural cohesion while avoiding harsh pointed apexes.
- **Cards, Modules, and Modals**: Rounded to 8px (`0.5rem`, `rounded-lg`).
- **Status Badges & Indicator Pills**: May use full pill radii (`9999px`) only when indicating terminal status states, maintaining clean separation from rectangular form controls and buttons.

## Components

### Buttons
- **Primary**: Solid `#142B45` fill, `#FFFFFF` text, 4px border radius. Minimum height 44px on mobile, 36px on dense desktop tables. Hover: `#1E3A5F`. Active: `#0F1D30`.
- **Secondary**: Crisp white background, `1px solid #CBD5E1` border, `#142B45` text. Hover: `#F8FAFC` background with `#94A3B8` border.
- **Accent Action**: Solid `#0F766E` fill, `#FFFFFF` text. Used exclusively for positive submission steps (e.g., "Submit Sample Report", "Verify Test Strip").
- **Destructive**: Crisp white or `#FEF2F2` background, `1px solid #FCA5A5` border, `#DC2626` text.

### Form Inputs & Selectors
- Standard height: 44px on mobile touch devices, 36px on desktop operational consoles.
- Background: `#FFFFFF`. Border: `1px solid #CBD5E1`.
- Focus state: `1px solid #0F766E` with an unmistakable `0 0 0 2px rgba(15, 118, 110, 0.2)` ring. Never remove the outline.
- Read-only & Disabled: Background `#F1F5F9`, text `#94A3B8`, border `1px solid #E2E8F0`. Tabular figures enforced on test values and reference codes.

### Status Indicators & Badges
- Constructed with high-contrast text and a solid 1px border.
- **Synced / Completed**: Background `#ECFDF5`, border `#A7F3D0`, text `#065F46`, paired with an emerald checkmark glyph.
- **Pending Sync / Inconclusive**: Background `#FFFBEB`, border `#FDE68A`, text `#92400E`, paired with an amber clock or pause glyph.
- **Failed / Flagged / Positive**: Background `#FEF2F2`, border `#FECACA`, text `#991B1B`, paired with a rose warning glyph.

### Cards & Data Panels
- Background: `#FFFFFF`. Border: `1px solid #E2E8F0`.
- Section headers within cards must feature a bottom divider (`1px solid #E2E8F0`) with 12px vertical padding, separating meta-controls from tabular data.

### Checkboxes & Radio Controls
- Minimum touch frame: 44x44px wrapper with an internal 18x18px indicator.
- Checked state: Fill `#142B45` with white checkmark / center dot.
- Unchecked state: Border `1.5px solid #94A3B8`, background `#FFFFFF`.

### Data Tables
- Header row: `#F8FAFC` background, `1px solid #E2E8F0` top and bottom borders, `label-md` uppercase typography in `#64748B`.
- Row height: 48px standard (38px compact mode for high-density desktop logs). Hover: `#F1F5F9`.
- Column alignments: Text left-aligned; numerical scores, IDs, and timestamps right-aligned or left-aligned with strict tabular font settings.