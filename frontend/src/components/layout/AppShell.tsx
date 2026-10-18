import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
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
  onLogout?: () => void;
}

export const AppShell: React.FC<AppShellProps> = ({
  session,
  pendingSyncCount,
  onSync,
  isSyncing,
  syncNotification,
  onDismissNotification,
  onLogout,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="np-shell">
      {/* Desktop Navigation & Header */}
      <DesktopSidebar
        pendingSyncCount={pendingSyncCount}
        onLogout={onLogout}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <DesktopHeader
        session={session}
        pendingSyncCount={pendingSyncCount}
        onSync={onSync}
        isSyncing={isSyncing}
        onLogout={onLogout}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
      />

      {/* Mobile Top Header */}
      <MobileHeader
        session={session}
        pendingSyncCount={pendingSyncCount}
        onLogout={onLogout}
      />

      {/* Main Content Area */}
      <main className="np-main-viewport">
        <div className="np-content-wrapper">
          {/* Sync notification banner */}
          <AnimatePresence>
            {syncNotification && (
              <motion.div
                className="np-toast-banner"
                role="status"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              >
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
              </motion.div>
            )}
          </AnimatePresence>

          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav pendingSyncCount={pendingSyncCount} />
    </div>
  );
};
