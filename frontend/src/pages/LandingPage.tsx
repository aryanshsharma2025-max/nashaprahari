import React from 'react';
import { Link } from 'react-router-dom';
import type { OfficerSession } from '../types/testRecord';

interface LandingPageProps {
  session: OfficerSession | null;
}

export const LandingPage: React.FC<LandingPageProps> = ({ session }) => {
  return (
    <div className="np-landing-page">
      {/* Public Top Navigation Bar */}
      <header className="np-landing-header">
        <div className="np-landing-header-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="np-landing-logo-badge">
              <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>
                shield
              </span>
            </div>
            <div>
              <span style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '18px', letterSpacing: '-0.02em', display: 'block', lineHeight: 1.2 }}>
                NashaPrahari
              </span>
              <span style={{ color: 'var(--on-surface-variant)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Field Operations Companion
              </span>
            </div>
          </div>

          <div>
            {session ? (
              <Link to="/dashboard" className="btn btn-primary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <span>Open Dashboard</span>
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
              </Link>
            ) : (
              <Link to="/login" className="btn btn-primary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>lock</span>
                <span>Officer Login</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="np-landing-hero">
        <div className="np-landing-container">
          <div className="np-landing-hero-content">
            <span className="np-landing-hero-tag">
              Smart India Hackathon Prototype (SIH 2026)
            </span>

            <h1 className="np-landing-hero-title">
              Digital Field Companion for Drug-Testing Operations
            </h1>

            <p className="np-landing-hero-desc">
              Designed for police officers, highway checkposts, and mobile inspection units.
              NashaPrahari standardizes presumptive chemical testing, logs serialized tamper-evident
              evidence packaging, and maintains reliable offline recordkeeping in the field.
            </p>

            <div className="np-landing-cta-row">
              {session ? (
                <Link to="/dashboard" className="btn btn-primary np-landing-hero-btn">
                  <span>Resume Officer Session ({session.officerName})</span>
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
                </Link>
              ) : (
                <Link to="/login" className="btn btn-primary np-landing-hero-btn">
                  <span>Officer Sign In</span>
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
                </Link>
              )}
              <a href="#capabilities" className="btn btn-outline np-landing-hero-btn">
                <span>View System Capabilities</span>
              </a>
            </div>

            {/* Prototype Notice */}
            <div className="np-landing-scope-box">
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--secondary)' }}>
                  info
                </span>
                <strong style={{ color: 'var(--primary)', fontSize: '13px' }}>
                  Demonstration Notice:
                </strong>
                <span className="badge-demo">Prototype</span>
              </div>
              <p style={{ color: 'var(--on-surface-variant)', fontSize: '12px', margin: 0, lineHeight: 1.45 }}>
                Field screening results are presumptive under Section 50 of the NDPS Act and require confirmatory laboratory analysis (GC-MS / HPLC). Central FastAPI and PostgreSQL backend services are currently in development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities Section */}
      <section id="capabilities" className="np-landing-section">
        <div className="np-landing-container">
          <div className="np-section-header">
            <h2 className="text-headline-sm" style={{ color: 'var(--primary)', margin: 0 }}>
              Principal Capabilities
            </h2>
            <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)', marginTop: '4px' }}>
              Four practical digital tools for officers operating in the field
            </p>
          </div>

          <div className="np-capability-grid">
            {/* Capability 1 */}
            <div className="np-capability-card">
              <div className="np-capability-icon-wrap icon-blue">
                <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
                  science
                </span>
              </div>
              <h3 className="np-capability-title">Field Reagent Screening</h3>
              <p className="np-capability-text">
                Guided workflow for approved reagent test kits (Narcotics Kit A, Opioids B, Synthetics C, Cannabinoids D). Captures color reaction, lot number, and specimen identifiers.
              </p>
            </div>

            {/* Capability 2 */}
            <div className="np-capability-card">
              <div className="np-capability-icon-wrap icon-teal">
                <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
                  inventory_2
                </span>
              </div>
              <h3 className="np-capability-title">Tamper Bag & Custody Logging</h3>
              <p className="np-capability-text">
                Issues serialized tamper-evident bag IDs (TB-XXXX) upon test completion. Enforces officer badge attribution and vault staging records for evidence integrity.
              </p>
            </div>

            {/* Capability 3 */}
            <div className="np-capability-card">
              <div className="np-capability-icon-wrap icon-amber">
                <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
                  cloud_off
                </span>
              </div>
              <h3 className="np-capability-title">Offline-First Recordkeeping</h3>
              <p className="np-capability-text">
                Operates without cellular network connectivity. Tests and evidence seals are queued locally on the device and can be batch-uploaded when online.
              </p>
            </div>

            {/* Capability 4 */}
            <div className="np-capability-card">
              <div className="np-capability-icon-wrap icon-purple">
                <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
                  menu_book
                </span>
              </div>
              <h3 className="np-capability-title">Field SOPs & Protocols</h3>
              <p className="np-capability-text">
                Instant on-device reference for chemical handling precautions, mandatory protective gear (PPE), kit shelf-life verification, and spill protocols.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How Authorized Officers Enter */}
      <section className="np-landing-section np-bg-contrast">
        <div className="np-landing-container">
          <div className="np-section-header">
            <h2 className="text-headline-sm" style={{ color: 'var(--primary)', margin: 0 }}>
              How Authorized Officers Enter
            </h2>
            <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)', marginTop: '4px' }}>
              Access to field duty functions requires officer credentials
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', maxWidth: '800px', margin: '0 auto' }}>
            <div className="np-panel" style={{ padding: '16px' }}>
              <strong style={{ color: 'var(--primary)', fontSize: '14px', display: 'block', marginBottom: '4px' }}>
                1. Select Officer Login
              </strong>
              <span className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>
                Tap the Officer Login button at the top of this page or in the navigation bar.
              </span>
            </div>

            <div className="np-panel" style={{ padding: '16px' }}>
              <strong style={{ color: 'var(--primary)', fontSize: '14px', display: 'block', marginBottom: '4px' }}>
                2. Enter Service Credentials
              </strong>
              <span className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>
                Enter your officer service ID / badge number and security PIN, or use the 1-click evaluation option.
              </span>
            </div>

            <div className="np-panel" style={{ padding: '16px' }}>
              <strong style={{ color: 'var(--primary)', fontSize: '14px', display: 'block', marginBottom: '4px' }}>
                3. Access Field Duty Dashboard
              </strong>
              <span className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>
                Perform field tests, search existing records, review pending uploads, and consult SOPs.
              </span>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Link to="/login" className="btn btn-primary" style={{ padding: '12px 28px' }}>
              <span>Proceed to Officer Login</span>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Public Footer */}
      <footer className="np-landing-footer">
        <div className="np-landing-container">
          <div className="np-footer-content">
            <div>
              <span style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '15px' }}>
                NashaPrahari
              </span>
              <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)', margin: '4px 0 0', maxWidth: '420px', lineHeight: 1.45 }}>
                Digital field companion for drug-testing operations and evidence chain-of-custody tracking. Smart India Hackathon Prototype (SIH 2026).
              </p>
            </div>

            <div style={{ fontSize: '12px', color: 'var(--on-surface-variant)', lineHeight: 1.5, maxWidth: '460px' }}>
              <strong style={{ color: 'var(--primary)', display: 'block', marginBottom: '2px' }}>
                Statutory Notice:
              </strong>
              Preliminary screening outputs are presumptive under Section 50 of the NDPS Act. Formal evidence requires confirmatory laboratory analysis (GC-MS / HPLC) by an authorized forensic laboratory.
            </div>
          </div>

          <div className="np-footer-bottom">
            <span>© 2026 NashaPrahari Project · Field Demonstration Version</span>
            <div>
              <Link to="/login" style={{ color: 'var(--secondary)', textDecoration: 'none', fontWeight: 600, fontSize: '13px' }}>
                Officer Sign In →
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
