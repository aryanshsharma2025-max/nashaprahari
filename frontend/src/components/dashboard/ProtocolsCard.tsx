import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface ProtocolDetail {
  title: string;
  tag: string;
  content: string[];
}

const PROTOCOLS_MAP: Record<string, ProtocolDetail> = {
  evidence: {
    title: 'Evidence Handling & Tamper-Proof Sealing SOP',
    tag: 'SOP-SEC-04',
    content: [
      '1. Wear clean disposable nitrile gloves before handling chemical test envelopes.',
      '2. Collect minimal representative specimen (10–20 mg powder or 1 drop liquid). Do not overload reagent ampoules.',
      '3. Seal used test pouch in high-security serialized tamper-evident envelope immediately.',
      '4. Endorse tamper pouch with Officer Badge, Date, Case ID, and Suspect Vehicle/Identity.',
      '5. Maintain chain-of-custody transfer log before transferring to central forensic evidence locker.',
    ],
  },
  helpline: {
    title: 'Forensic Science Laboratory Helpline & Dispatch',
    tag: 'FSL-TOLLFREE',
    content: [
      'Toll-Free Dispatch Duty Hotline: 1800-200-889 (24/7 Field Escalation)',
      'Direct Zonal Lab Contact: +91-11-2680-4920 (Forensic Toxicology Desk)',
      'Notice: Confirmatory gas chromatography-mass spectrometry (GC-MS) or high-performance liquid chromatography (HPLC) must be scheduled within 72 hours of field presumptive positive seizure.',
    ],
  },
  calibration: {
    title: 'Reagent Kit Expiry & Calibration Guidelines',
    tag: 'QC-CAL-12',
    content: [
      '1. Verify Lot # against central kit database before morning shift deployment.',
      '2. Reagents must be stored below 30°C. Never deploy ampoules exposed to direct sunlight > 45°C.',
      '3. Perform negative control test on new lot batches using distilled standard prior to field screening.',
      '4. If reagent color turns turbid, discolored, or reacts prematurely, discard immediately as inconclusive.',
    ],
  },
};

export const ProtocolsCard: React.FC = () => {
  const [activeModal, setActiveModal] = useState<ProtocolDetail | null>(null);

  useEffect(() => {
    if (!activeModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal]);

  return (
    <>
      <div className="np-panel">
        <div className="np-panel-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--primary-container)' }}>
              menu_book
            </span>
            <h2 className="text-title-md" style={{ color: 'var(--on-surface)' }}>
              Quick Field Protocols
            </h2>
          </div>
          <span className="badge-demo font-code">SOP v2.4</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Protocol 1 */}
          <button
            type="button"
            onClick={() => setActiveModal(PROTOCOLS_MAP.evidence)}
            style={{
              padding: '14px 16px',
              border: 'none',
              borderBottom: '1px solid var(--border-subtle)',
              background: 'transparent',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '12px',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'background-color 0.15s ease',
            }}
            className="np-protocol-item"
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--primary)', marginTop: '2px' }}>
                verified_user
              </span>
              <div>
                <span className="text-title-sm" style={{ display: 'block', color: 'var(--on-surface)' }}>
                  Evidence Handling SOP
                </span>
                <span className="text-body-sm" style={{ color: 'var(--on-surface-variant)', marginTop: '2px', display: 'block' }}>
                  Tamper-proof bag sealing & chain of custody checklist
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--outline-variant)' }}>
              arrow_forward
            </span>
          </button>

          {/* Protocol 2 */}
          <button
            type="button"
            onClick={() => setActiveModal(PROTOCOLS_MAP.helpline)}
            style={{
              padding: '14px 16px',
              border: 'none',
              borderBottom: '1px solid var(--border-subtle)',
              background: 'transparent',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '12px',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'background-color 0.15s ease',
            }}
            className="np-protocol-item"
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--secondary)', marginTop: '2px' }}>
                phone_in_talk
              </span>
              <div>
                <span className="text-title-sm" style={{ display: 'block', color: 'var(--on-surface)' }}>
                  Laboratory Helpline
                </span>
                <span className="text-body-sm" style={{ color: 'var(--on-surface-variant)', marginTop: '2px', display: 'block' }}>
                  Confirmatory GC-MS/HPLC dispatch duty contact (1800-200-889)
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--outline-variant)' }}>
              call
            </span>
          </button>

          {/* Protocol 3 */}
          <button
            type="button"
            onClick={() => setActiveModal(PROTOCOLS_MAP.calibration)}
            style={{
              padding: '14px 16px',
              border: 'none',
              background: 'transparent',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '12px',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'background-color 0.15s ease',
            }}
            className="np-protocol-item"
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--primary)', marginTop: '2px' }}>
                fact_check
              </span>
              <div>
                <span className="text-title-sm" style={{ display: 'block', color: 'var(--on-surface)' }}>
                  Reagent Expiry & Calibration Check
                </span>
                <span className="text-body-sm" style={{ color: 'var(--on-surface-variant)', marginTop: '2px', display: 'block' }}>
                  Lot verification guidelines & temperature thresholds
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--outline-variant)' }}>
              arrow_forward
            </span>
          </button>
        </div>

        <div style={{ padding: '10px 16px', backgroundColor: 'var(--surface-container-low)', borderTop: '1px solid var(--border-subtle)', textAlign: 'right' }}>
          <Link to="/help-protocols" className="text-body-sm" style={{ color: 'var(--secondary)', fontWeight: 600, textDecoration: 'none' }}>
            View All Protocols & SOPs →
          </Link>
        </div>
      </div>

      <style>{`
        .np-protocol-item:hover {
          background-color: var(--surface-container-low) !important;
        }
      `}</style>

      {/* Protocol Detail Modal */}
      {activeModal && (
        <div className="np-modal-backdrop" onClick={() => setActiveModal(null)} role="dialog" aria-modal="true">
          <div className="np-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="np-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>menu_book</span>
                <div>
                  <h3 className="text-title-md">{activeModal.title}</h3>
                  <span className="badge-demo font-code">{activeModal.tag}</span>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => setActiveModal(null)}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>close</span>
              </button>
            </div>

            <div className="np-modal-body">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {activeModal.content.map((item, idx) => (
                  <p key={idx} className="text-body-md" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.5 }}>
                    {item}
                  </p>
                ))}
              </div>
              <div style={{ padding: '10px', background: 'var(--surface-container-low)', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}>
                <span className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>
                  Standard Operating Procedure issued under Zonal Field Enforcement Manual v2.4.
                </span>
              </div>
            </div>

            <div className="np-modal-footer">
              <button type="button" className="btn btn-outline" onClick={() => setActiveModal(null)}>
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
