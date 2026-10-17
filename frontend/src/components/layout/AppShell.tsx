import React from 'react';
import { Outlet } from 'react-router-dom';
import type { OfficerSession } from '../../types/testRecord';
import { DesktopSidebar } from './DesktopSidebar';
import { DesktopHeader } from './DesktopHeader';
import { MobileHeader } from './MobileHeader';
import { MobileBottomNav } from './MobileBottomNav';

interface AppShellProps {
  session: OfficerSession;
  pendingSyncCount: number;
  onSync: () => void;
  isSyncing: boolean;
  syncNotification: string | null;
  onDismissNotification: () => void;
}

export const AppShell: React.FC<AppShellProps> = ({
  session,
  pendingSyncCount,
  onSync,
  isSyncing,
  syncNotification,
  onDismissNotification,
}) => {
  return (
    <div className="np-shell">
      {/* Desktop Navigation & Header */}
      <DesktopSidebar pendingSyncCount={pendingSyncCount} />
      <DesktopHeader
        session={session}
        pendingSyncCount={pendingSyncCount}
        onSync={onSync}
        isSyncing={isSyncing}
      />

      {/* Mobile Top Header */}
      <MobileHeader session={session} pendingSyncCount={pendingSyncCount} />

      {/* Main Content Area */}
      <main className="np-main-viewport">
        <div className="np-content-wrapper">
          {/* Sync notification banner */}
          {syncNotification && (
            <div className="np-toast-banner" role="status">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                  cloud_done
                </span>
                <span>{syncNotification}</span>
              </div>
              <button
                type="button"
                onClick={onDismissNotification}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                  padding: '2px',
                  display: 'flex',
                }}
                aria-label="Dismiss notification"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>close</span>
              </button>
            </div>
          )}

          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
};
