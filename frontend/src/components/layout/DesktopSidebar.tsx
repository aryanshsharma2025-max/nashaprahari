import React from 'react';
import { NavLink } from 'react-router-dom';

interface DesktopSidebarProps {
  pendingSyncCount: number;
}

export const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ pendingSyncCount }) => {
  return (
    <aside className="np-sidebar" aria-label="Console Navigation Sidebar">
      <div>
        {/* Brand Header */}
        <div className="np-sidebar-brand">
          <div className="np-brand-icon">
            <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>
              shield
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="text-title-md" style={{ color: 'var(--primary)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              NashaPrahari
            </span>
            <span className="text-label-sm" style={{ color: 'var(--on-surface-variant)', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Field Ops & Evidence
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="np-sidebar-nav">
          <span className="np-nav-section-title">Console Navigation</span>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <NavLink
              to="/"
              className={({ isActive }) => `np-nav-item ${isActive ? 'active' : ''}`}
              end
            >
              <div className="np-nav-item-left">
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>grid_view</span>
                <span>Dashboard</span>
              </div>
            </NavLink>

            <NavLink
              to="/new-test"
              className={({ isActive }) => `np-nav-item ${isActive ? 'active' : ''}`}
            >
              <div className="np-nav-item-left">
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>biotech</span>
                <span>New Test Workflow</span>
              </div>
            </NavLink>

            <NavLink
              to="/records"
              className={({ isActive }) => `np-nav-item ${isActive ? 'active' : ''}`}
            >
              <div className="np-nav-item-left">
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>history_edu</span>
                <span>Test Records & History</span>
              </div>
            </NavLink>

            <NavLink
              to="/sync-queue"
              className={({ isActive }) => `np-nav-item ${isActive ? 'active' : ''}`}
            >
              <div className="np-nav-item-left">
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>sync_alt</span>
                <span>Sync Queue</span>
              </div>
              {pendingSyncCount > 0 && (
                <span className="np-nav-pill font-tabular">{pendingSyncCount}</span>
              )}
            </NavLink>

            <NavLink
              to="/evidence-locker"
              className={({ isActive }) => `np-nav-item ${isActive ? 'active' : ''}`}
            >
              <div className="np-nav-item-left">
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>inventory_2</span>
                <span>Evidence Locker</span>
              </div>
            </NavLink>

            <NavLink
              to="/help-protocols"
              className={({ isActive }) => `np-nav-item ${isActive ? 'active' : ''}`}
            >
              <div className="np-nav-item-left">
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>menu_book</span>
                <span>Help & Protocols</span>
              </div>
            </NavLink>
          </nav>
        </div>
      </div>

      {/* Diagnostics Sub-Footer */}
      <div className="np-sidebar-footer">
        <div className="np-diag-row">
          <span>Diagnostics</span>
          <span className="font-code" style={{ textTransform: 'none' }}>v2.4.1-field</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }} className="text-body-sm">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--secondary)' }}></span>
            <span style={{ fontWeight: 500 }}>Operational Core</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--on-surface-variant)' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>storage</span>
            <span>Local Storage Active</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
