import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import type { TestRecord } from '../../types/testRecord';
import { StatusBadge } from './StatusBadge';
import { useIsMobile } from './useIsMobile';
import { formatIndianDate, formatIndianTimestamp } from '../../utils/formatters';

interface RecordDetailModalProps {
  record: TestRecord | null;
  onClose: () => void;
  layoutIdPrefix?: string;
}

export const RecordDetailModal: React.FC<RecordDetailModalProps> = ({
  record,
  onClose,
  layoutIdPrefix = 'record',
}) => {
  const isMobile = useIsMobile();
  const shouldReduceMotion = useReducedMotion();
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Background scroll lock while modal is open
  useEffect(() => {
    if (record) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      // Auto-focus the close button for accessibility
      const timer = setTimeout(() => {
        closeBtnRef.current?.focus();
      }, 60);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [record]);

  // Keyboard accessibility: Escape to close
  useEffect(() => {
    if (!record) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [record, onClose]);

  // Desktop shared-element spring vs Mobile fast GPU easeOut (180ms)
  const desktopSpring = shouldReduceMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 380, damping: 34, mass: 0.8 };

  const mobileTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.18, ease: 'easeOut' as const };

  return (
    <AnimatePresence>
      {record && (
        <div
          className="np-modal-root"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`modal-title-${record.id}`}
        >
          {/* Subtle background overlay transition */}
          <motion.div
            className="np-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: 'easeOut' }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Centered / Mobile-sheet container */}
          <div className="np-modal-container" onClick={onClose}>
            <motion.div
              layoutId={isMobile || shouldReduceMotion ? undefined : `${layoutIdPrefix}-${record.id}`}
              initial={isMobile && !shouldReduceMotion ? { opacity: 0, y: 24 } : undefined}
              animate={isMobile ? { opacity: 1, y: 0 } : undefined}
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: isMobile ? 16 : 8, transition: { duration: 0.16, ease: 'easeOut' } }
              }
              className="np-modal-dialog"
              onClick={(e) => e.stopPropagation()}
              transition={isMobile ? mobileTransition : desktopSpring}
              style={{ willChange: 'transform, opacity' }}
            >
              {/* Header */}
              <div className="np-modal-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '22px' }}>
                    assignment
                  </span>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span
                        id={`modal-title-${record.id}`}
                        className="font-code text-title-md"
                        style={{ color: 'var(--primary)', fontWeight: 700 }}
                      >
                        {record.id}
                      </span>
                      <span className="badge-demo">Presumptive Entry</span>
                    </div>
                    <span className="text-body-sm" style={{ color: 'var(--text-secondary)' }}>
                      Recorded at {formatIndianTimestamp(record.timestamp)} · {formatIndianDate(record.date)}
                    </span>
                  </div>
                </div>

                <button
                  ref={closeBtnRef}
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={onClose}
                  aria-label="Close record details (Esc)"
                  title="Close (Esc)"
                  style={{ padding: '4px 8px', minHeight: '32px', height: '32px' }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>close</span>
                </button>
              </div>

              {/* Detail Content Body (static wrapper to prevent competing child animations) */}
              <div className="np-modal-body">
                {/* Status Bar */}
                <div
                  style={{
                    display: 'flex',
                    gap: '14px',
                    flexWrap: 'wrap',
                    padding: '12px 14px',
                    background: 'var(--surface-section)',
                    borderRadius: '2px',
                    border: '1px solid var(--border-light)',
                  }}
                >
                  <div>
                    <span
                      className="text-label-sm"
                      style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '4px' }}
                    >
                      Presumptive Result
                    </span>
                    <StatusBadge type="result" result={record.result} />
                  </div>
                  <div>
                    <span
                      className="text-label-sm"
                      style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '4px' }}
                    >
                      Sync Status
                    </span>
                    <StatusBadge type="sync" status={record.syncStatus} />
                  </div>
                </div>

                {/* Test & Reagent Metadata */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '14px',
                  }}
                >
                  <div>
                    <span className="text-label-sm" style={{ color: 'var(--text-muted)' }}>Field Test Location</span>
                    <p className="text-body-md" style={{ fontWeight: 600, marginTop: '2px', color: 'var(--text-primary)' }}>
                      {record.location}
                    </p>
                    <span className="text-body-sm" style={{ color: 'var(--text-secondary)' }}>
                      {record.subLocation}
                    </span>
                  </div>
                  <div>
                    <span className="text-label-sm" style={{ color: 'var(--text-muted)' }}>Kit & Reagent Lot</span>
                    <p className="text-body-md" style={{ fontWeight: 600, marginTop: '2px', color: 'var(--text-primary)' }}>
                      {record.testType}
                    </p>
                    <span className="font-code text-body-sm" style={{ color: 'var(--text-secondary)' }}>
                      {record.lotNumber}
                    </span>
                  </div>
                  <div>
                    <span className="text-label-sm" style={{ color: 'var(--text-muted)' }}>Reporting Officer</span>
                    <p className="text-body-md" style={{ fontWeight: 600, marginTop: '2px', color: 'var(--text-primary)' }}>
                      {record.officerName}
                    </p>
                    <span className="font-code text-body-sm" style={{ color: 'var(--primary)', fontWeight: 600 }}>
                      PNO #{record.officerBadge.replace(/^#/, '')}
                    </span>
                  </div>
                  {record.suspectIdentifier && (
                    <div>
                      <span className="text-label-sm" style={{ color: 'var(--text-muted)' }}>Specimen / Reference ID</span>
                      <p className="text-body-md" style={{ fontWeight: 600, marginTop: '2px', color: 'var(--text-primary)' }}>
                        {record.suspectIdentifier}
                      </p>
                    </div>
                  )}
                </div>

                {/* Field Chemical Reaction */}
                {record.reagentColorObserved && (
                  <div
                    style={{
                      padding: '12px 14px',
                      background: 'var(--surface-section)',
                      borderRadius: '2px',
                      border: '1px solid var(--border-light)',
                    }}
                  >
                    <span className="text-label-sm" style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                      Observed Colorimetric Reaction
                    </span>
                    <p className="text-body-md" style={{ fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
                      {record.reagentColorObserved}
                    </p>
                  </div>
                )}

                {/* Officer Field Notes */}
                {record.notes && (
                  <div>
                    <span className="text-label-sm" style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                      Field Operational Notes
                    </span>
                    <p
                      className="text-body-sm"
                      style={{
                        color: 'var(--text-secondary)',
                        background: 'var(--surface-white)',
                        padding: '10px 12px',
                        borderRadius: '2px',
                        border: '1px solid var(--border-light)',
                        margin: 0,
                      }}
                    >
                      {record.notes}
                    </p>
                  </div>
                )}

                {/* Chain of Custody */}
                {record.chainOfCustody && (
                  <div
                    style={{
                      padding: '12px 14px',
                      background: 'var(--surface-section)',
                      borderRadius: '2px',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--primary)' }}>
                        verified_user
                      </span>
                      <span className="text-label-md" style={{ color: 'var(--primary)', fontWeight: 700 }}>
                        Chain of Custody & Evidence Sealing
                      </span>
                    </div>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                        gap: '8px',
                      }}
                      className="text-body-sm"
                    >
                      <div>
                        <span style={{ color: 'var(--text-secondary)' }}>Tamper Bag / Malkhana Serial: </span>
                        <span className="font-code" style={{ fontWeight: 700, color: 'var(--primary)' }}>
                          {record.chainOfCustody.tamperBagId}
                        </span>
                      </div>
                      <div>
                        <span style={{ color: 'var(--text-secondary)' }}>Sealed At: </span>
                        <span className="font-tabular" style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                          {formatIndianTimestamp(record.chainOfCustody.sealedAt)}
                        </span>
                      </div>
                      <div>
                        <span style={{ color: 'var(--text-secondary)' }}>Malkhana Staging: </span>
                        <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                          {record.chainOfCustody.dispatchStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Statutory disclaimer */}
                <div
                  style={{
                    padding: '8px 12px',
                    background: 'var(--color-warning-bg)',
                    border: '1px solid var(--color-warning-border)',
                    borderRadius: '2px',
                  }}
                >
                  <span className="text-body-sm" style={{ color: 'var(--color-warning)' }}>
                    <strong>Presumptive Field Screening Notice:</strong> This colorimetric result is preliminary under Section 50 of the NDPS Act. Admissibility under statutory drug enforcement frameworks requires certified laboratory confirmation (GC-MS / HPLC).
                  </span>
                </div>
              </div>

              <div className="np-modal-footer">
                <button type="button" className="btn btn-outline btn-sm" onClick={onClose}>
                  <span>Close Record</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
