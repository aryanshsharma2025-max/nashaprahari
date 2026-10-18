import React from 'react';
import type { OfficerSession } from '../../types/testRecord';

interface DesktopHeaderProps {
  session: OfficerSession;
  pendingSyncCount: number;
  onSync: () => void;
  isSyncing: boolean;
  onLogout?: () => void;
  isSidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}

export const DesktopHeader: React.FC<DesktopHeaderProps> = ({
  session,
  pendingSyncCount,
  onSync,
  isSyncing,
  onLogout,
  isSidebarOpen = false,
  onToggleSidebar,
}) => {
  return (
    <header className="np-desktop-header">
      {/* Left: Menu trigger & Officer context */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {onToggleSidebar && (
          <button
            type="button"
            className={`btn btn-outline btn-sm np-sidebar-toggle-btn ${isSidebarOpen ? 'active' : ''}`}
            onClick={onToggleSidebar}
            aria-label={isSidebarOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isSidebarOpen}
            title="Toggle navigation menu (or hover left edge)"
            style={{ padding: '4px 10px', height: '34px', minHeight: '34px', gap: '6px' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
              {isSidebarOpen ? 'menu_open' : 'menu'}
            </span>
            <span style={{ fontWeight: 600, fontSize: '13px' }}>Menu</span>
          </button>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--primary)' }}>
            shield_person
          </span>
          <div style={{ fontSize: '14px' }}>
            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{session.officerName}</span>
            <span style={{ color: 'var(--text-muted)', marginLeft: '6px' }}>PNO #{session.officerBadge.replace(/^#/, '')}</span>
            <span style={{ color: 'var(--border)', margin: '0 6px' }}>·</span>
            <span style={{ color: 'var(--text-muted)' }}>{session.location}</span>
          </div>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              padding: '2px 7px',
              borderRadius: '3px',
              backgroundColor: 'var(--color-info-bg)',
              color: 'var(--color-info)',
              border: '1px solid #BFDBFE',
            }}
          >
            FIELD TERMINAL
          </span>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Connectivity indicator */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 10px',
            borderRadius: '4px',
            border: '1px solid var(--border)',
            fontSize: '12px',
            color: 'var(--text-secondary)',
            backgroundColor: 'var(--surface-section)',
          }}
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: '#1B7A45',
            }}
          />
          <span style={{ fontWeight: 600 }}>Online</span>
          {pendingSyncCount > 0 && (
            <>
              <span style={{ color: 'var(--border)' }}>·</span>
              <span style={{ color: 'var(--color-warning)', fontWeight: 700 }} className="font-tabular">
                {pendingSyncCount} pending
              </span>
            </>
          )}
        </div>

        <button
          type="button"
          className="btn btn-outline btn-sm"
          onClick={onSync}
          disabled={isSyncing || pendingSyncCount === 0}
          title={pendingSyncCount > 0 ? 'Upload pending records' : 'All synced'}
        >
          <span
            className={`material-symbols-outlined ${isSyncing ? 'animate-spin' : ''}`}
            style={{ fontSize: '16px' }}
          >
            sync
          </span>
          <span className="font-tabular">{isSyncing ? 'Syncing...' : `Sync (${pendingSyncCount})`}</span>
        </button>

        {onLogout && (
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={onLogout}
            title="Sign out"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>logout</span>
            <span>Sign Out</span>
          </button>
        )}
      </div>
    </header>
  );
};
