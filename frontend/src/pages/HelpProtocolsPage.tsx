import React from 'react';
import { Link } from 'react-router-dom';

export const HelpProtocolsPage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '900px', margin: '0 auto' }}>
      {/* Breadcrumb Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="text-body-sm">
        <Link to="/dashboard" style={{ color: 'var(--secondary)', textDecoration: 'none', fontWeight: 500 }}>
          Home Dashboard
        </Link>
        <span style={{ color: 'var(--outline-variant)' }}>/</span>
        <span style={{ color: 'var(--on-surface-variant)' }}>Help & Protocols</span>
      </div>

      {/* Screen Title */}
      <div>
        <h1 className="text-headline-md" style={{ color: 'var(--primary)', margin: 0 }}>
          Field Protocols & Safety SOPs
        </h1>
        <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)', margin: '4px 0 0' }}>
          Standard field reference instructions for chemical reagent testing, evidence sealing, and officer safety
        </p>
      </div>

      {/* Demonstration Content Notice */}
      <div style={{ padding: '14px 18px', backgroundColor: 'var(--surface-container-low)', border: '1px solid var(--border-subtle)', borderRadius: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--secondary)' }}>
            info
          </span>
          <strong style={{ color: 'var(--primary)', fontSize: '14px' }}>
            Demonstration Reference Guide
          </strong>
          <span className="badge-demo">Reference Standard</span>
        </div>
        <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)', margin: 0, lineHeight: 1.5 }}>
          This reference manual reflects standard presumptive field testing procedures compiled for Smart India Hackathon evaluation. During live field operations, officers must strictly follow official State Police Manuals and NDPS statutory circulars.
        </p>
      </div>

      {/* Protocol 1: Chemical Reagent Testing Procedure */}
      <div className="np-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="np-capability-icon-wrap icon-blue">
            <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>
              science
            </span>
          </div>
          <div>
            <h2 className="text-title-md" style={{ color: 'var(--primary)', margin: 0 }}>
              1. Chemical Reagent Testing Protocol
            </h2>
            <span className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>
              Sampling, Ampoule Crushing & Reaction Observation
            </span>
          </div>
        </div>

        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--on-surface)', lineHeight: 1.5 }} className="text-body-md">
          <li>
            <strong>Sample Dosage:</strong> Place only 10–20 milligrams of powder (approx. tip of a micro-spatula) or 1 drop of liquid into the test ampoule pouch. Overloading the sample causes dark charring or ambiguous false-negative masks.
          </li>
          <li>
            <strong>Sequential Crushing:</strong> Break the glass reagent ampoules in strict alphabetical sequence (Ampoule 1 first, agitate gently, then Ampoule 2).
          </li>
          <li>
            <strong>Observation Window:</strong> Evaluate the resulting color precipitate between 30 and 60 seconds after agitation under clean white lighting. Color changes occurring after 2 minutes are atmospheric oxidation artifacts and must not be recorded as positive.
          </li>
          <li>
            <strong>Retest Protocol:</strong> If the reaction color is muddy, ambiguous, or unlisted in the kit chart, record as <em>Inconclusive / Retest</em> and repeat testing using a secondary kit from an alternate lot.
          </li>
        </ul>
      </div>

      {/* Protocol 2: Tamper-Evident Bag Sealing & Custody */}
      <div className="np-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="np-capability-icon-wrap icon-teal">
            <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>
              inventory_2
            </span>
          </div>
          <div>
            <h2 className="text-title-md" style={{ color: 'var(--primary)', margin: 0 }}>
              2. Tamper-Evident Bag Sealing & Custody Handover
            </h2>
            <span className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>
              Physical Evidence Integrity & Judicial Admissibility
            </span>
          </div>
        </div>

        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--on-surface)', lineHeight: 1.5 }} className="text-body-md">
          <li>
            <strong>Immediate Packaging:</strong> Immediately upon test conclusion, place the spent chemical tube and the seized contraband specimen package inside a serialized tamper-evident envelope.
          </li>
          <li>
            <strong>Seal Verification:</strong> Peel the adhesive backing and press firmly across the void-evident indicator. Ensure the serial bag number (e.g. <code>TB-2026-XXXX</code>) is logged into NashaPrahari.
          </li>
          <li>
            <strong>Dual Officer Endorsement:</strong> The operating officer and witnessing supervisor must sign and date directly across the tape boundary with indelible marker.
          </li>
          <li>
            <strong>Vault Staging:</strong> Deposit the sealed envelope in the station evidence vault until courier dispatch to the authorized Forensic Science Laboratory (FSL).
          </li>
        </ul>
      </div>

      {/* Protocol 3: Officer Safety & Spill Containment */}
      <div className="np-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="np-capability-icon-wrap icon-amber">
            <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>
              health_and_safety
            </span>
          </div>
          <div>
            <h2 className="text-title-md" style={{ color: 'var(--primary)', margin: 0 }}>
              3. Officer Safety & Chemical First Aid
            </h2>
            <span className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>
              Handling Corrosive Reagents & Unknown Substance Precautions
            </span>
          </div>
        </div>

        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--on-surface)', lineHeight: 1.5 }} className="text-body-md">
          <li>
            <strong>Mandatory PPE:</strong> Nitrile examination gloves must be worn throughout sampling. Reagent ampoules contain strong mineral acids (concentrated hydrochloric and sulfuric acids).
          </li>
          <li>
            <strong>Never Inhale Fumes:</strong> Do not smell or taste unknown suspected narcotics under any operational circumstance. Keep tube opening angled away from face when breaking ampoules.
          </li>
          <li>
            <strong>Skin Contact Protocol:</strong> In event of pouch puncture or acid spill, flush affected skin immediately with copious cold water for a minimum of 15 minutes.
          </li>
          <li>
            <strong>Defective Kit Quarantine:</strong> Any ampoule exhibiting spontaneous discoloration or leakage prior to breaking must be quarantined, flagged as expired/compromised, and discarded per hazardous chemical disposal guidelines.
          </li>
        </ul>
      </div>

      {/* Protocol 4: Legal & Statutory Framework */}
      <div className="np-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="np-capability-icon-wrap icon-purple">
            <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>
              policy
            </span>
          </div>
          <div>
            <h2 className="text-title-md" style={{ color: 'var(--primary)', margin: 0 }}>
              4. Statutory Framework (Section 50 NDPS Act)
            </h2>
            <span className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>
              Presumptive Field Screening vs. Confirmatory Prosecution
            </span>
          </div>
        </div>

        <div style={{ color: 'var(--on-surface)', lineHeight: 1.5 }} className="text-body-md">
          <p style={{ margin: '0 0 10px' }}>
            Under the <em>Narcotic Drugs and Psychotropic Substances (NDPS) Act, 1985</em>, field reagent tests serve exclusively as <strong>presumptive preliminary screening</strong> to substantiate reasonable ground for seizure and formal arrest.
          </p>
          <p style={{ margin: 0 }}>
            Presumptive test results are not a legal substitute for confirmatory laboratory spectroscopy. Formal court prosecution requires quantitative confirmatory reports (GC-MS / HPLC) issued by a government-notified Forensic Science Laboratory (FSL).
          </p>
        </div>
      </div>
    </div>
  );
};
