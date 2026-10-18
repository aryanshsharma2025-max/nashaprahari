import React from 'react';
import type { OfficerSession } from '../../types/testRecord';

interface MobileHeaderProps {
  session: OfficerSession;
  pendingSyncCount: number;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({ session, pendingSyncCount }) => {
  return (
    <header className="np-mobile-header pt-safe">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            backgroundColor: 'var(--primary-container)',
            color: 'var(--on-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
            verified_user
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span className="text-title-md" style={{ color: 'var(--primary)', lineHeight: 1.1 }}>
            NashaPrahari
          </span>
          <span className="text-label-sm" style={{ color: 'var(--on-surface-variant)', textTransform: 'uppercase' }}>
            Field Companion
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span className="badge-demo" style={{ fontSize: '11px', padding: '2px 6px' }}>Demo</span>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 10px',
            borderRadius: '9999px',
            backgroundColor: 'var(--secondary-container)',
            color: 'var(--on-secondary-container)',
          }}
          className="text-label-sm font-tabular"
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: 'var(--secondary)',
            }}
            className="animate-pulse"
          ></span>
          <span>Online · {pendingSyncCount} Pending</span>
        </div>

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
          title={session.officerName}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
            person
          </span>
        </div>
      </div>
    </header>
  );
};
