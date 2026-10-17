import React from 'react';
import { Link } from 'react-router-dom';
import { StatutoryNotice } from '../components/common/StatutoryNotice';

export const HelpProtocolsPage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '960px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="text-body-sm">
        <Link to="/" style={{ color: 'var(--secondary)', textDecoration: 'none' }}>Dashboard</Link>
        <span style={{ color: 'var(--outline-variant)' }}>/</span>
        <span style={{ color: 'var(--on-surface-variant)' }}>Help & Protocols</span>
      </div>

      <div>
        <h1 className="text-headline-md" style={{ color: 'var(--primary)' }}>
          Help & Field Protocols
        </h1>
        <span className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>
          Standard Operating Procedures (SOP v2.4), laboratory helpline, and calibration manuals
        </span>
      </div>

      <StatutoryNotice />

      {/* Emergency Contact & Laboratory Hotline */}
      <div className="np-panel" style={{ padding: '20px', borderLeft: '4px solid var(--secondary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '24px', color: 'var(--secondary)' }}>
            phone_in_talk
          </span>
          <h2 className="text-title-md" style={{ color: 'var(--primary)' }}>
            Central Forensic Laboratory Helpline
          </h2>
        </div>
        <p className="text-body-md" style={{ color: 'var(--on-surface-variant)', marginBottom: '14px' }}>
          Direct toll-free escalation for field narcotics detection officers, chain of custody verification, and fast-track GC-MS confirmation dispatch.
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <a href="tel:1800200889" className="btn btn-teal">
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>call</span>
            <span>Dial Helpline: 1800-200-889</span>
          </a>
          <div style={{ padding: '8px 12px', background: 'var(--surface-container-low)', borderRadius: '4px' }}>
            <span className="text-body-sm font-code">Zonal Toxicology Lab: +91-11-2680-4920</span>
          </div>
        </div>
      </div>

      {/* SOP 1: Evidence Handling */}
      <div className="np-panel" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '22px', color: 'var(--primary)' }}>
            verified_user
          </span>
          <div>
            <h2 className="text-title-md">SOP-SEC-04: Evidence Handling & Tamper Sealing</h2>
            <span className="text-label-sm" style={{ color: 'var(--on-surface-variant)' }}>Mandatory Field Protocol under NDPS Act Standards</span>
          </div>
        </div>
        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--on-surface-variant)' }} className="text-body-md">
          <li><strong>Gloves & Safety:</strong> Nitrile gloves must be worn before opening any field chemical kit or handling suspect substances.</li>
          <li><strong>Sample Dosage:</strong> Take only 10–20 milligrams of powder or 1 drop of liquid. Overloading causes false-negative or dark precipitation artifacts.</li>
          <li><strong>Sealing:</strong> Once testing is concluded, immediately place the ampoule pouch inside a serialized tamper-evident envelope.</li>
          <li><strong>Officer Endorsement:</strong> Sign across the security seal tape with date, time, and case identifier.</li>
          <li><strong>Chain of Custody:</strong> Every transfer between field officers, zonal vault, and the laboratory must be logged in the electronic custody register.</li>
        </ul>
      </div>

      {/* SOP 2: Reagent Kit Calibration */}
      <div className="np-panel" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '22px', color: 'var(--primary)' }}>
            fact_check
          </span>
          <div>
            <h2 className="text-title-md">QC-CAL-12: Kit Quality Control & Expiry Checks</h2>
            <span className="text-label-sm" style={{ color: 'var(--on-surface-variant)' }}>Field Reagent Integrity Standards</span>
          </div>
        </div>
        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--on-surface-variant)' }} className="text-body-md">
          <li><strong>Lot Verification:</strong> Check that the active lot number (e.g. <code>#NP-9042</code>) matches the serial batch on the carton.</li>
          <li><strong>Storage Environment:</strong> Chemical test tubes must remain below 30°C in the thermal field case. Do not leave kits exposed to windshield solar radiation.</li>
          <li><strong>Pre-Shift Blank Check:</strong> Run one negative control ampoule with distilled water at the start of each duty shift to verify reagent baseline integrity.</li>
          <li><strong>Inconclusive Disposal:</strong> Any ampoule exhibiting spontaneous discoloration prior to breaking the glass seal must be flagged as contaminated and discarded.</li>
        </ul>
      </div>
    </div>
  );
};
