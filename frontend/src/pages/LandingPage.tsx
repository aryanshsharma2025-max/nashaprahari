import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import type { OfficerSession } from '../types/testRecord';
import { IndiaOutlineMap } from '../components/common/IndiaOutlineMap';

interface LandingPageProps {
  session: OfficerSession | null;
}

export const LandingPage: React.FC<LandingPageProps> = ({ session }) => {
  const shouldReduceMotion = useReducedMotion();

  // Staggered entrance variants for hero content
  const heroContainerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const heroItemVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: 'easeOut' as const },
    },
  };

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
              <span
                style={{
                  color: '#ffffff',
                  fontWeight: 850,
                  fontSize: '18px',
                  letterSpacing: '-0.02em',
                  display: 'block',
                  lineHeight: 1.2,
                }}
              >
                NashaPrahari
              </span>
              <span
                style={{
                  color: 'rgba(255,255,255,0.82)',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontWeight: 600,
                }}
              >
                Field Operations Companion
              </span>
            </div>
          </div>

          <div>
            {session ? (
              <Link
                to="/dashboard"
                className="btn btn-sm"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#ffffff',
                  color: '#0D2B4E',
                  fontWeight: 700,
                  border: 'none',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                }}
              >
                <span>Open Dashboard</span>
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                  arrow_forward
                </span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="btn btn-sm"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#ffffff',
                  color: '#0D2B4E',
                  fontWeight: 700,
                  border: 'none',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                  lock
                </span>
                <span>Officer Login</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Local CC BY-SA photograph and a restrained India outline establish the public-service context. */}
      <section className="np-landing-hero">
        <div className="np-landing-hero-photo" aria-hidden="true" />
        {/* Subtle Decorative Mainland India Outline */}
        <motion.div
          className="np-landing-hero-india-wrap"
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.94, x: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 0.32, scale: 1, x: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.7, ease: 'easeOut' }}
        >
          <IndiaOutlineMap
            className="np-landing-hero-india-svg"
            strokeColor="#ffffff"
            strokeWidth={2.2}
            opacity={1}
          />
        </motion.div>

        {/* Traditional Geometric Jaali Line Motif Accent */}
        <div className="np-landing-hero-motif-band" aria-hidden="true">
          <svg width="320" height="12" viewBox="0 0 320 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-jaali-pattern" width="16" height="12" patternUnits="userSpaceOnUse">
                <path d="M8 0 L16 6 L8 12 L0 6 Z" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="0.8" />
                <circle cx="8" cy="6" r="1.5" fill="rgba(255,255,255,0.25)" />
              </pattern>
            </defs>
            <rect width="320" height="12" fill="url(#hero-jaali-pattern)" />
          </svg>
        </div>

        <div className="np-landing-container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            className="np-landing-hero-content"
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Operational Pre-Title */}
            <motion.div variants={heroItemVariants} className="np-hero-pretitle">
              <span className="np-hero-pretitle-dot" aria-hidden="true" />
              <span>PRESUMPTIVE FIELD SCREENING &amp; EVIDENCE LOGGING</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1 variants={heroItemVariants} className="np-landing-hero-title">
              Field Testing &amp; Chain-of-Custody Companion
            </motion.h1>

            {/* Description */}
            <motion.p variants={heroItemVariants} className="np-landing-hero-desc">
              Standardized chemical reagent screening, serialized tamper-bag logging, and offline recordkeeping for field enforcement officers.
            </motion.p>

            {/* Single Prominent Officer CTA Button */}
            <motion.div variants={heroItemVariants} className="np-landing-cta-row">
              {session ? (
                <motion.div
                  whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.01 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                >
                  <Link to="/dashboard" className="btn btn-landing-primary np-landing-hero-btn">
                    <span>Resume Officer Session ({session.officerName})</span>
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                      arrow_forward
                    </span>
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.01 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                >
                  <Link to="/login" className="btn btn-landing-primary np-landing-hero-btn">
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                      lock
                    </span>
                    <span>Officer Sign In</span>
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                      arrow_forward
                    </span>
                  </Link>
                </motion.div>
              )}
            </motion.div>

            {/* Presumptive Screening Operational Notice */}
            <motion.div variants={heroItemVariants} className="np-landing-scope-box">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#0D2B4E' }}>
                  shield
                </span>
                <strong style={{ color: '#0D2B4E', fontSize: '13px', fontWeight: 800 }}>
                  Presumptive Screening Standard
                </strong>
                <span className="badge-demo font-tabular" style={{ fontSize: '11px' }}>
                  Forensic Notice
                </span>
              </div>
              <p style={{ color: '#14304A', fontSize: '12.5px', margin: 0, lineHeight: 1.45 }}>
                Field reagent test outputs provide preliminary presumptive screening only. Formal evidentiary
                proceedings require custody sealing and confirmatory laboratory analysis (GC-MS / HPLC).
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Compact Field Operations Suite Section (Replaces the 4 bulky cards) */}
      <section id="capabilities" className="np-field-suite-section">
        {/* Subtle Tricolour Bridge Detail connecting from the Saffron Hero */}
        <div className="np-tricolour-hairline np-suite-tricolour-top" aria-hidden="true" />

        <div className="np-landing-container">
          <motion.div
            className="np-suite-header"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.32, ease: 'easeOut' }}
          >
            <div className="np-suite-tag">
              <span className="np-suite-tag-dot" aria-hidden="true" />
              <span>UNIFIED FIELD WORKFLOW</span>
            </div>
            <h2 className="np-suite-title">Built for Field Operations</h2>
            <p className="np-suite-subtitle">Four practical tools. One streamlined field workflow.</p>
          </motion.div>

          {/* Compact Feature Strip with 4 Connected Workflow Items */}
          <motion.div
            className="np-suite-strip"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.35, delay: shouldReduceMotion ? 0 : 0.08, ease: 'easeOut' }}
          >
            {/* Capability 1 */}
            <div className="np-suite-item">
              <div className="np-suite-item-header">
                <div className="np-suite-icon-box icon-blue" aria-hidden="true">
                  <span className="material-symbols-outlined">science</span>
                </div>
                <span className="np-suite-step-num font-tabular">01</span>
              </div>
              <div className="np-suite-item-body">
                <h3 className="np-suite-item-title">Field Reagent Screening</h3>
                <p className="np-suite-item-desc">
                  Guided presumptive chemical tests (Kits A–D) with instant colour-reaction matching.
                </p>
              </div>
            </div>

            {/* Separator / Step Connector for Desktop */}
            <div className="np-suite-separator" aria-hidden="true" />

            {/* Capability 2 */}
            <div className="np-suite-item">
              <div className="np-suite-item-header">
                <div className="np-suite-icon-box icon-teal" aria-hidden="true">
                  <span className="material-symbols-outlined">inventory_2</span>
                </div>
                <span className="np-suite-step-num font-tabular">02</span>
              </div>
              <div className="np-suite-item-body">
                <h3 className="np-suite-item-title">Tamper Bag &amp; Custody Logging</h3>
                <p className="np-suite-item-desc">
                  Serialized evidence bag (TB-XXXX) tagging with officer attribution and seizure memos.
                </p>
              </div>
            </div>

            {/* Separator / Step Connector for Desktop */}
            <div className="np-suite-separator" aria-hidden="true" />

            {/* Capability 3 */}
            <div className="np-suite-item">
              <div className="np-suite-item-header">
                <div className="np-suite-icon-box icon-amber" aria-hidden="true">
                  <span className="material-symbols-outlined">cloud_off</span>
                </div>
                <span className="np-suite-step-num font-tabular">03</span>
              </div>
              <div className="np-suite-item-body">
                <h3 className="np-suite-item-title">Offline-First Recordkeeping</h3>
                <p className="np-suite-item-desc">
                  Full duty operation in low-coverage highway zones with local queue batch sync.
                </p>
              </div>
            </div>

            {/* Separator / Step Connector for Desktop */}
            <div className="np-suite-separator" aria-hidden="true" />

            {/* Capability 4 */}
            <div className="np-suite-item">
              <div className="np-suite-item-header">
                <div className="np-suite-icon-box icon-purple" aria-hidden="true">
                  <span className="material-symbols-outlined">menu_book</span>
                </div>
                <span className="np-suite-step-num font-tabular">04</span>
              </div>
              <div className="np-suite-item-body">
                <h3 className="np-suite-item-title">Field SOPs &amp; Protocols</h3>
                <p className="np-suite-item-desc">
                  Immediate on-device chemical precautions, PPE directives, and emergency spill guidelines.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>



      {/* Public Footer */}
      <footer className="np-landing-footer">
        <div className="np-landing-container">
          <div className="np-footer-content">
            <div>
              <span style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '15px' }}>NashaPrahari</span>
              <p
                className="text-body-sm"
                style={{ color: 'var(--on-surface-variant)', margin: '4px 0 0', maxWidth: '420px', lineHeight: 1.45 }}
              >
                Digital field companion for preliminary drug-testing operations, seizure documentation, and evidence chain-of-custody tracking.
              </p>
            </div>

            <div style={{ fontSize: '12px', color: 'var(--on-surface-variant)', lineHeight: 1.5, maxWidth: '460px' }}>
              <strong style={{ color: 'var(--primary)', display: 'block', marginBottom: '2px' }}>
                Screening notice:
              </strong>
              Field screening outputs are presumptive and require confirmatory laboratory analysis when formal
              confirmation is needed.
            </div>
          </div>

          <div className="np-footer-bottom">
            <span>© 2026 NashaPrahari · Narcotics Field Testing & Recordkeeping System</span>
            <div>
              <Link
                to="/login"
                style={{ color: 'var(--secondary)', textDecoration: 'none', fontWeight: 600, fontSize: '13px' }}
              >
                Officer Sign In →
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
