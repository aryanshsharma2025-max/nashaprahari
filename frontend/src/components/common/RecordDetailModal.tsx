import React from 'react';
import type { TestRecord } from '../../types/testRecord';
import { StatusBadge } from './StatusBadge';

interface RecordDetailModalProps {
  record: TestRecord | null;
  onClose: () => void;
}

export const RecordDetailModal: React.FC<RecordDetailModalProps> = ({ record, onClose }) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!record) return null;

  return (
    <div className="np-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="np-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="np-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--primary-container)' }}>
              assignment
            </span>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="font-code text-title-md" style={{ color: 'var(--primary)' }}>
                  {record.id}
                </span>
                <span className="badge-demo">Demo Record</span>
              </div>
              <span className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>
                Recorded at {record.timestamp} · {record.date}
              </span>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={onClose}
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>close</span>
          </button>
        </div>

        <div className="np-modal-body">
          {/* Status Bar */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', padding: '12px', background: 'var(--surface-container-low)', borderRadius: '6px' }}>
            <div>
              <span className="text-label-sm" style={{ display: 'block', color: 'var(--on-surface-variant)', marginBottom: '4px' }}>
                Presumptive Result
              </span>
              <StatusBadge type="result" result={record.result} />
            </div>
            <div>
              <span className="text-label-sm" style={{ display: 'block', color: 'var(--on-surface-variant)', marginBottom: '4px' }}>
                Central Sync Status
              </span>
              <StatusBadge type="sync" status={record.syncStatus} />
            </div>
          </div>

          {/* Test & Reagent Metadata */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            <div>
              <span className="text-label-sm" style={{ color: 'var(--on-surface-variant)' }}>Field Test Location</span>
              <p className="text-body-md" style={{ fontWeight: 600, marginTop: '2px' }}>{record.location}</p>
              <span className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>{record.subLocation}</span>
            </div>
            <div>
              <span className="text-label-sm" style={{ color: 'var(--on-surface-variant)' }}>Kit & Reagent Lot</span>
              <p className="text-body-md" style={{ fontWeight: 600, marginTop: '2px' }}>{record.testType}</p>
              <span className="font-code text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>{record.lotNumber}</span>
            </div>
            <div>
              <span className="text-label-sm" style={{ color: 'var(--on-surface-variant)' }}>Reporting Officer</span>
              <p className="text-body-md" style={{ fontWeight: 600, marginTop: '2px' }}>{record.officerName}</p>
              <span className="font-code text-body-sm" style={{ color: 'var(--primary)' }}>{record.officerBadge}</span>
            </div>
            {record.suspectIdentifier && (
              <div>
                <span className="text-label-sm" style={{ color: 'var(--on-surface-variant)' }}>Specimen / Reference ID</span>
                <p className="text-body-md" style={{ fontWeight: 600, marginTop: '2px' }}>{record.suspectIdentifier}</p>
              </div>
            )}
          </div>

          {/* Field Chemical Reaction */}
          {record.reagentColorObserved && (
            <div style={{ padding: '12px', background: 'var(--surface-container-low)', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
              <span className="text-label-sm" style={{ color: 'var(--on-surface-variant)', display: 'block', marginBottom: '4px' }}>
                Observed Colorimetric Reaction
              </span>
              <p className="text-body-md" style={{ fontWeight: 500 }}>{record.reagentColorObserved}</p>
            </div>
          )}

          {/* Officer Field Notes */}
          {record.notes && (
            <div>
              <span className="text-label-sm" style={{ color: 'var(--on-surface-variant)', display: 'block', marginBottom: '4px' }}>
                Field Operational Notes
              </span>
              <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)', background: 'var(--surface-container-lowest)', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}>
                {record.notes}
              </p>
            </div>
          )}

          {/* Chain of Custody */}
          {record.chainOfCustody && (
            <div style={{ padding: '12px', background: 'var(--surface-container-high)', borderRadius: '6px', border: '1px solid var(--outline-variant)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--primary)' }}>
                  verified_user
                </span>
                <span className="text-label-md" style={{ color: 'var(--primary)' }}>
                  Chain of Custody & Evidence Sealing
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '8px' }} className="text-body-sm">
                <div>
                  <span style={{ color: 'var(--on-surface-variant)' }}>Tamper Bag ID: </span>
                  <span className="font-code" style={{ fontWeight: 600 }}>{record.chainOfCustody.tamperBagId}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--on-surface-variant)' }}>Sealed At: </span>
                  <span className="font-tabular">{record.chainOfCustody.sealedAt}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--on-surface-variant)' }}>Vault Status: </span>
                  <span>{record.chainOfCustody.dispatchStatus}</span>
                </div>
              </div>
            </div>
          )}

          {/* Statutory disclaimer */}
          <div style={{ padding: '8px 12px', background: 'var(--warning-bg)', border: '1px solid var(--warning-border)', borderRadius: '4px' }}>
            <span className="text-body-sm" style={{ color: 'var(--warning-text)' }}>
              <strong>Presumptive Field Screening Notice:</strong> This colorimetric result is preliminary. Admissibility under statutory drug enforcement frameworks requires certified laboratory confirmation.
            </span>
          </div>
        </div>

        <div className="np-modal-footer">
          <button type="button" className="btn btn-outline" onClick={onClose}>
            Close Record
          </button>
        </div>
      </div>
    </div>
  );
};
