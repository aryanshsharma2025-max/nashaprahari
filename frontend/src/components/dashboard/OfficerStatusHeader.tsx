import React from 'react';
import type { OfficerSession } from '../../types/testRecord';

interface OfficerStatusHeaderProps {
  session: OfficerSession;
  pendingSyncCount: number;
  onSync: () => void;
  isSyncing: boolean;
}

export const OfficerStatusHeader: React.FC<OfficerStatusHeaderProps> = ({
  session,
  pendingSyncCount,
  onSync,
  isSyncing,
}) => {
  return (
    <section className="np-officer-status-card" aria-label="Officer Field Status">
      <div className="np-officer-info-group">
        <div className="np-officer-avatar" aria-hidden="true">
          <span className="material-symbols-outlined" style={{ fontSize: '26px' }}>
            shield_person
          </span>
        </div>
        <div className="np-officer-details">
          <div className="np-officer-name-row">
            <span className="text-title-md np-officer-name">{session.officerName}</span>
            <span className="badge-demo font-code" title="Officer Badge Number">
              {session.officerBadge}
            </span>
            <span className="badge-demo" title="Demonstration Mode">Demo</span>
          </div>
          <div className="text-body-sm np-officer-meta">
            <span className="material-symbols-outlined np-officer-meta-icon">pin_drop</span>
            <span className="np-officer-location">{session.location}</span>
            <span className="np-meta-divider">·</span>
            <span className="np-officer-shift">{session.shift} ({session.sector})</span>
          </div>
        </div>
      </div>

      {/* Connectivity & Fast Upload Action */}
      <div className="np-officer-sync-group">
        <div className="np-connection-pill font-tabular" title="Device Connectivity">
          <span
            className="np-status-dot animate-pulse"
            style={{ backgroundColor: session.connectionStatus !== 'offline' ? 'var(--secondary)' : 'var(--error)' }}
          ></span>
          <span className="np-connection-text">
            {session.connectionStatus !== 'offline' ? 'Online' : 'Offline'}
          </span>
          <span className="np-meta-divider">·</span>
          <span className="np-pending-count-text">
            {pendingSyncCount > 0 ? `${pendingSyncCount} Pending Upload${pendingSyncCount > 1 ? 's' : ''}` : 'All Uploaded'}
          </span>
        </div>

        <button
          type="button"
          className="btn btn-outline btn-sm font-tabular"
          onClick={onSync}
          disabled={isSyncing || pendingSyncCount === 0}
          title={pendingSyncCount > 0 ? 'Upload pending field records to central ledger' : 'No records awaiting upload'}
        >
          <span className={`material-symbols-outlined ${isSyncing ? 'animate-spin' : ''}`} style={{ fontSize: '16px' }}>
            sync
          </span>
          <span>{isSyncing ? 'Syncing...' : `Sync Now (${pendingSyncCount})`}</span>
        </button>
      </div>
    </section>
  );
};
