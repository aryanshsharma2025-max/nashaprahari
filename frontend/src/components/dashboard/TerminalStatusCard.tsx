import React, { useState } from 'react';
import type { OfficerSession } from '../../types/testRecord';

interface TerminalStatusCardProps {
  session: OfficerSession;
  pendingSyncCount: number;
}

export const TerminalStatusCard: React.FC<TerminalStatusCardProps> = ({
  session,
  pendingSyncCount,
}) => {
  const [scannerOpen, setScannerOpen] = useState(false);
  const [scannedLot, setScannedLot] = useState<string | null>(null);

  const handleSimulateScan = () => {
    setScannedLot('Scanned: Kit Lot #NP-9042 (Exp: 2027-08 · Preservative Sealed)');
  };

  return (
    <div className="np-panel">
      {/* Panel Header */}
      <div className="np-panel-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--primary-container)' }}>
            monitor_heart
          </span>
          <h2 className="text-title-md" style={{ color: 'var(--on-surface)' }}>
            Terminal Status
          </h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--secondary)' }}></span>
          <span className="text-label-sm" style={{ color: 'var(--secondary)', fontWeight: 600 }}>
            OPERATIONAL
          </span>
        </div>
      </div>

      {/* Panel Body */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Offline Storage */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            padding: '10px 12px',
            backgroundColor: 'var(--surface-container-low)',
            borderRadius: '6px',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--on-surface-variant)', marginTop: '2px' }}>
            storage
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, flex: 1 }}>
            <span className="text-title-sm" style={{ color: 'var(--on-surface)' }}>Offline Storage</span>
            <span className="text-body-sm font-tabular" style={{ color: 'var(--on-surface-variant)' }}>
              {pendingSyncCount} records locally awaiting sync
            </span>
            <span className="font-code text-body-sm font-tabular" style={{ color: 'var(--primary)', marginTop: '2px' }}>
              Storage: {session.storageAvailablePercent}% available
            </span>
          </div>
        </div>

        {/* Battery Health */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            padding: '10px 12px',
            backgroundColor: 'var(--surface-container-low)',
            borderRadius: '6px',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--secondary)', marginTop: '2px' }}>
            battery_5_bar
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="text-title-sm font-tabular" style={{ color: 'var(--on-surface)' }}>
                Battery: {session.batteryLevel}%
              </span>
              <span className="text-label-sm" style={{ color: 'var(--secondary)' }}>
                Optimal
              </span>
            </div>
            <span className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>
              {session.batteryStatus}
            </span>
          </div>
        </div>

        {/* Active Duty Shift */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            padding: '10px 12px',
            backgroundColor: 'var(--surface-container-low)',
            borderRadius: '6px',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--on-surface-variant)', marginTop: '2px' }}>
            badge
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, flex: 1 }}>
            <span className="text-title-sm" style={{ color: 'var(--on-surface)' }}>Active Duty Shift</span>
            <span className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>
              {session.officerName} · {session.shift}
            </span>
            <span className="font-code text-body-sm font-tabular" style={{ color: 'var(--on-surface-variant)', marginTop: '2px' }}>
              {session.shiftTiming} ({session.sector})
            </span>
          </div>
        </div>

        {/* Quick Barcode Scanner Utility */}
        <div
          style={{
            padding: '12px',
            backgroundColor: 'var(--surface-container)',
            borderRadius: '6px',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--on-surface-variant)' }}>
                qr_code_scanner
              </span>
              <span className="text-title-sm" style={{ color: 'var(--on-surface)' }}>
                Scan Kit Barcode
              </span>
            </div>
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={() => {
                setScannerOpen(!scannerOpen);
                setScannedLot(null);
              }}
            >
              {scannerOpen ? 'Close' : 'Open Scanner'}
            </button>
          </div>

          {scannerOpen && (
            <div style={{ padding: '10px', backgroundColor: 'var(--surface-container-lowest)', borderRadius: '4px', border: '1px dashed var(--outline-variant)', marginTop: '4px' }}>
              <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)', marginBottom: '8px' }}>
                Hardware barcode scanner emulator (Camera or optical wand input).
              </p>
              {scannedLot ? (
                <div style={{ padding: '8px', background: 'var(--success-bg)', border: '1px solid var(--success-border)', borderRadius: '4px' }}>
                  <span className="text-body-sm font-code" style={{ color: 'var(--success-text)' }}>{scannedLot}</span>
                </div>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={handleSimulateScan}
                  style={{ width: '100%' }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>barcode</span>
                  <span>Scan Active Kit (NP-9042)</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
