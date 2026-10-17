import React from 'react';
import type { OfficerSession } from '../../types/testRecord';

interface DesktopHeaderProps {
  session: OfficerSession;
  pendingSyncCount: number;
  onSync: () => void;
  isSyncing: boolean;
}

export const DesktopHeader: React.FC<DesktopHeaderProps> = ({
  session,
  pendingSyncCount,
  onSync,
  isSyncing,
}) => {
  return (
    <header className="np-desktop-header">
      {/* Zone Command & Officer Identity */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="text-title-sm">
          <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--on-surface-variant)' }}>
            apartment
          </span>
          <span style={{ color: 'var(--on-surface)' }}>{session.zone}</span>
          <span style={{ color: 'var(--outline-variant)' }}>·</span>
          <span className="text-body-md" style={{ color: 'var(--on-surface-variant)' }}>
            {session.officerName}{' '}
            <span className="font-code" style={{ color: 'var(--primary)', fontWeight: 600 }}>
              {session.officerBadge}
            </span>
          </span>
        </div>
        <span className="badge-demo">Demo Mode</span>
      </div>

      {/* Connectivity & Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Telemetry pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'var(--surface-container)',
            border: '1px solid var(--border-subtle)',
            padding: '4px 10px',
            borderRadius: '4px',
          }}
          className="text-label-md"
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--secondary)',
            }}
            className="animate-pulse"
          ></span>
          <span style={{ color: 'var(--on-surface)', fontWeight: 600 }}>Online</span>
          <span style={{ color: 'var(--outline-variant)' }}>·</span>
          <span style={{ color: 'var(--on-surface-variant)', fontWeight: 500 }} className="font-tabular">
            {pendingSyncCount} Pending
          </span>
        </div>

        {/* Sync Action */}
        <button
          type="button"
          className="btn btn-outline btn-sm font-tabular"
          onClick={onSync}
          disabled={isSyncing || pendingSyncCount === 0}
          title={pendingSyncCount > 0 ? "Simulate sync to central ledger" : "All records synchronized"}
        >
          <span
            className={`material-symbols-outlined ${isSyncing ? 'animate-spin' : ''}`}
            style={{ fontSize: '16px' }}
          >
            sync
          </span>
          <span>{isSyncing ? 'Syncing...' : `Sync (${pendingSyncCount})`}</span>
        </button>

        <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border-subtle)' }}></div>

        {/* Officer Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--on-primary)',
            }}
            title={`${session.officerName} (${session.officerBadge})`}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
              person
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
