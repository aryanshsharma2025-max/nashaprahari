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
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="np-landing-logo-badge">
              <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
                shield
              </span>
            </div>
            <div>
              <span className="text-title-md" style={{ color: 'var(--primary)', fontWeight: 800, letterSpacing: '-0.02em', display: 'block' }}>
                NashaPrahari
              </span>
              <span className="text-label-sm" style={{ color: 'var(--on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Field Operations Companion
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {session ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="text-body-sm" style={{ color: 'var(--on-surface-variant)', display: 'none' }}>
                  Signed in as <strong>{session.officerName}</strong>
                </span>
                <Link to="/dashboard" className="btn btn-primary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span>Open Console</span>
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
                </Link>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>lock</span>
                <span>Officer Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="np-landing-hero">
        <div className="np-landing-container">
          <div className="np-landing-hero-content">
            <div className="np-landing-hero-badge">
              <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--secondary)' }}>
                biotech
              </span>
              <span>Digital Field Companion for Drug-Testing Operations</span>
            </div>

            <h1 className="np-landing-hero-title">
              Standardized Field Narcotics Testing & Chain-of-Custody Tracking
            </h1>

            <p className="np-landing-hero-desc">
              Designed for law enforcement officers, mobile inspection squads, and border checkposts.
              NashaPrahari streamlines presumptive colorimetric chemical screening, serializes tamper-evident
              evidence packaging, and guarantees reliable offline recordkeeping in remote field environments.
            </p>

            <div className="np-landing-cta-row">
              {session ? (
                <Link to="/dashboard" className="btn btn-primary np-landing-hero-btn">
                  <span>Resume Officer Session ({session.officerName})</span>
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
                </Link>
              ) : (
                <Link to="/login" className="btn btn-primary np-landing-hero-btn">
                  <span>Officer Portal Sign In</span>
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
                </Link>
              )}
              <a href="#capabilities" className="btn btn-outline np-landing-hero-btn">
                <span>View System Capabilities</span>
              </a>
            </div>

            {/* Prototype Transparency Notice */}
            <div className="np-landing-scope-box">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--secondary)' }}>
                  info
                </span>
                <strong style={{ color: 'var(--primary)', fontSize: '13px' }}>
                  Smart India Hackathon Prototype Notice
                </strong>
                <span className="badge-demo">Demo & Evaluation</span>
              </div>
              <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)', margin: 0, lineHeight: 1.5 }}>
                This is an active evaluation prototype. Field screening results are presumptive under Section 50 of the NDPS Act and require formal laboratory confirmation. Central backend services (FastAPI/PostgreSQL) are in active development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities Section */}
      <section id="capabilities" className="np-landing-section">
        <div className="np-landing-container">
          <div className="np-section-header">
            <span className="text-label-sm" style={{ color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
              Operational Modules
            </span>
            <h2 className="text-headline-md" style={{ color: 'var(--primary)', margin: '6px 0 10px' }}>
              Built for High-Stress Field Procedures
            </h2>
            <p className="text-body-md" style={{ color: 'var(--on-surface-variant)', maxWidth: '640px', margin: '0 auto', lineHeight: 1.5 }}>
              Eliminating paper bottlenecks and procedural ambiguity through four focused digital workflows.
            </p>
          </div>

          <div className="np-capability-grid">
            {/* Capability 1 */}
            <div className="np-capability-card">
              <div className="np-capability-icon-wrap icon-blue">
                <span className="material-symbols-outlined" style={{ fontSize: '26px' }}>
                  science
                </span>
              </div>
              <h3 className="np-capability-title">Field Reagent Screening</h3>
              <p className="np-capability-text">
                Multi-step chemical screening workflow for approved reagent test kits (Narcotics Kit A, Opioids B, Synthetics C, Cannabinoids D). Captures color reaction, kit lot number, and specimen identifiers with zero guesswork.
              </p>
              <div className="np-capability-tag">Standardized Field Workflow</div>
            </div>

            {/* Capability 2 */}
            <div className="np-capability-card">
              <div className="np-capability-icon-wrap icon-teal">
                <span className="material-symbols-outlined" style={{ fontSize: '26px' }}>
                  inventory_2
                </span>
              </div>
              <h3 className="np-capability-title">Tamper-Proof Chain of Custody</h3>
              <p className="np-capability-text">
                Automatically issues serialized tamper bag IDs (TB-XXXX) upon test completion. Enforces officer identity attribution, dispatch logging, and vault staging to preserve evidentiary integrity for judicial proceedings.
              </p>
              <div className="np-capability-tag">NDPS Evidence Compliance</div>
            </div>

            {/* Capability 3 */}
            <div className="np-capability-card">
              <div className="np-capability-icon-wrap icon-amber">
                <span className="material-symbols-outlined" style={{ fontSize: '26px' }}>
                  cloud_off
                </span>
              </div>
              <h3 className="np-capability-title">Offline-First Resilience</h3>
              <p className="np-capability-text">
                Uninterrupted operations at remote border posts and highway checkpoints with zero cellular coverage. Records are queued locally in browser storage and seamlessly batch-uploaded once connection is re-established.
              </p>
              <div className="np-capability-tag">Local Vault Queuing</div>
            </div>

            {/* Capability 4 */}
            <div className="np-capability-card">
              <div className="np-capability-icon-wrap icon-purple">
                <span className="material-symbols-outlined" style={{ fontSize: '26px' }}>
                  menu_book
                </span>
              </div>
              <h3 className="np-capability-title">Field Protocols & SOP Guidance</h3>
              <p className="np-capability-text">
                Immediate on-device reference for chemical handling precautions, personal protective equipment (PPE) requirements, kit shelf-life verification, and hazardous material spill disposal protocols.
              </p>
              <div className="np-capability-tag">Safety & Legal SOPs</div>
            </div>
          </div>
        </div>
      </section>

      {/* Target User Groups */}
      <section className="np-landing-section np-bg-contrast">
        <div className="np-landing-container">
          <div className="np-section-header">
            <span className="text-label-sm" style={{ color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
              Deployment Scope
            </span>
            <h2 className="text-headline-md" style={{ color: 'var(--primary)', margin: '6px 0 10px' }}>
              Serving Field Inspection Stakeholders
            </h2>
          </div>

          <div className="np-stakeholder-grid">
            <div className="np-stakeholder-item">
              <span className="material-symbols-outlined" style={{ fontSize: '22px', color: 'var(--primary)' }}>local_police</span>
              <div>
                <strong style={{ color: 'var(--primary)', display: 'block', fontSize: '15px' }}>State Police Patrols & Checkposts</strong>
                <span className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>
                  Interceptors and highway patrol units conducting random vehicle and parcel inspections.
                </span>
              </div>
            </div>

            <div className="np-stakeholder-item">
              <span className="material-symbols-outlined" style={{ fontSize: '22px', color: 'var(--primary)' }}>policy</span>
              <div>
                <strong style={{ color: 'var(--primary)', display: 'block', fontSize: '15px' }}>Narcotics Control & Excise Teams</strong>
                <span className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>
                  Specialized enforcement officers executing interdiction operations and seizure procedures.
                </span>
              </div>
            </div>

            <div className="np-stakeholder-item">
              <span className="material-symbols-outlined" style={{ fontSize: '22px', color: 'var(--primary)' }}>security</span>
              <div>
                <strong style={{ color: 'var(--primary)', display: 'block', fontSize: '15px' }}>Border & Port Customs Inspectors</strong>
                <span className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>
                  Entry port screening units verifying suspicious substances and sealing evidence for forensic dispatch.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Bar */}
      <section className="np-landing-cta-banner">
        <div className="np-landing-container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h3 className="text-title-lg" style={{ color: '#ffffff', margin: '0 0 4px' }}>
                Ready to Access the Field Console?
              </h3>
              <p className="text-body-sm" style={{ color: '#d1dced', margin: 0 }}>
                Log in with your assigned officer badge number or explore in demonstration mode.
              </p>
            </div>
            <Link to="/login" className="btn btn-primary" style={{ backgroundColor: '#ffffff', color: 'var(--primary)', fontWeight: 700, padding: '12px 24px', fontSize: '14px' }}>
              <span>Access Officer Terminal</span>
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
              <span className="text-title-sm" style={{ color: 'var(--primary)', fontWeight: 700 }}>
                NashaPrahari
              </span>
              <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)', margin: '4px 0 0', maxWidth: '420px', lineHeight: 1.45 }}>
                National digital field companion for drug-testing operations and evidence chain-of-custody tracking. Smart India Hackathon Prototype.
              </p>
            </div>

            <div style={{ fontSize: '12px', color: 'var(--on-surface-variant)', lineHeight: 1.5, maxWidth: '480px' }}>
              <strong style={{ color: 'var(--primary)', display: 'block', marginBottom: '2px' }}>
                Legal & Evidentiary Disclaimer:
              </strong>
              Outputs generated by field colorimetric tests represent preliminary presumptive screening only. Formal forensic prosecution requires laboratory confirmation (GC-MS / HPLC) by an accredited laboratory under the NDPS Act.
            </div>
          </div>

          <div className="np-footer-bottom">
            <span>© 2026 NashaPrahari Project · Field Operations Demonstration Version</span>
            <div style={{ display: 'flex', gap: '16px' }}>
              <Link to="/login" style={{ color: 'var(--secondary)', textDecoration: 'none', fontWeight: 600 }}>
                Officer Login
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
