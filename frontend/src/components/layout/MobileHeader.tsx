import React from 'react';
import type { OfficerSession } from '../../types/testRecord';

interface MobileHeaderProps {
  session: OfficerSession;
  pendingSyncCount: number;
  onLogout?: () => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({ session, pendingSyncCount, onLogout }) => {
  return (
    <header className="np-mobile-header pt-safe">
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span className="material-symbols-outlined" style={{ fontSize: '22px', color: '#fff' }}>
          shield
        </span>
        <span style={{ color: '#fff', fontWeight: 800, fontSize: '16px', letterSpacing: '-0.01em' }}>
          NashaPrahari
        </span>
      </div>

      {/* Status + Sign out */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Pending indicator */}
        {pendingSyncCount > 0 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: 'rgba(249, 199, 79, 0.25)',
              padding: '3px 7px',
              borderRadius: '4px',
              fontSize: '11px',
              fontWeight: 700,
              color: '#FFF7CD',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>cloud_upload</span>
            <span className="font-tabular">{pendingSyncCount}</span>
          </div>
        )}
        {/* Officer badge */}
        <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '12px' }}>
          #{session.officerBadge}
        </span>
        {onLogout && (
          <button
            type="button"
            onClick={onLogout}
            aria-label="Sign out"
            style={{
              background: 'none',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '5px',
              padding: '4px 6px',
              display: 'flex',
              alignItems: 'center',
              color: 'rgba(255,255,255,0.85)',
              cursor: 'pointer',
              minWidth: '30px',
              minHeight: '30px',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>logout</span>
          </button>
        )}
      </div>
    </header>
  );
};
