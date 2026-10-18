import React from 'react';
import type { OfficerSession } from '../../types/testRecord';
import { IndiaOutlineMap } from '../common/IndiaOutlineMap';

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
    <div className="np-officer-strip" aria-label="Active Officer Session">
      <div className="np-officer-strip-left">
        <span className="material-symbols-outlined np-officer-strip-icon" aria-hidden="true">
          shield_person
        </span>
        <div className="np-officer-strip-text">
          <div className="np-officer-strip-name">
            <span>Welcome <strong>{session.officerName}</strong></span>
            <span className="np-officer-strip-badge">PNO #{session.officerBadge.replace(/^#/, '')}</span>
          </div>
          <span className="np-officer-strip-sub">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <IndiaOutlineMap
                style={{ width: '13px', height: '15px', verticalAlign: '-1px', display: 'inline-block' }}
                strokeColor="currentColor"
                strokeWidth={2.4}
                opacity={0.7}
              />
              <span>{session.location}</span>
            </span>
            {' · '}
            <span>{session.shiftTiming || `${session.shift} (IST)`}</span>
            {' · '}
            <span>{session.sector}</span>
          </span>
        </div>
      </div>

      <div className="np-officer-strip-right">
        <div className="np-officer-strip-pill" title="Network status">
          <span
            className="np-officer-strip-dot"
            style={{ backgroundColor: session.connectionStatus !== 'offline' ? '#047857' : '#b91c1c' }}
          />
          <span className="font-tabular">
            {session.connectionStatus !== 'offline' ? 'Online' : 'Offline'}
          </span>
          {pendingSyncCount > 0 && (
            <span className="np-officer-strip-count font-tabular">
              {pendingSyncCount} queued
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={onSync}
          disabled={isSyncing || pendingSyncCount === 0}
          className="btn btn-outline btn-sm font-tabular np-officer-strip-sync"
          title={pendingSyncCount > 0 ? 'Upload pending field records' : 'All records synced'}
          aria-label="Synchronize pending records"
        >
          <span
            className={`material-symbols-outlined ${isSyncing ? 'animate-spin' : ''}`}
            style={{ fontSize: '16px' }}
          >
            sync
          </span>
          <span>{isSyncing ? 'Syncing...' : `Sync (${pendingSyncCount})`}</span>
        </button>
      </div>
    </div>
  );
};
