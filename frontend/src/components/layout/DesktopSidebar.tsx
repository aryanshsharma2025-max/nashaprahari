import React from 'react';
import { NavLink, Link } from 'react-router-dom';

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
            <span className="text-title-md" style={{ color: 'var(--primary)', lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 800 }}>
              NashaPrahari
            </span>
            <span className="text-label-sm" style={{ color: 'var(--on-surface-variant)', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Field Operations
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="np-sidebar-nav">
          <span className="np-nav-section-title">Field Operations</span>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <NavLink
              to="/dashboard"
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
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>add_circle</span>
                <span>New Field Test</span>
              </div>
            </NavLink>

            <NavLink
              to="/records"
              className={({ isActive }) => `np-nav-item ${isActive ? 'active' : ''}`}
            >
              <div className="np-nav-item-left">
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>assignment</span>
                <span>Records Ledger</span>
              </div>
            </NavLink>

            <NavLink
              to="/sync-queue"
              className={({ isActive }) => `np-nav-item ${isActive ? 'active' : ''}`}
            >
              <div className="np-nav-item-left">
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>cloud_upload</span>
                <span>Pending Uploads</span>
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
                <span>Field Protocols</span>
              </div>
            </NavLink>
          </nav>
        </div>
      </div>

      {/* Understated Clean Sub-Footer */}
      <div className="np-sidebar-footer">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span className="badge-demo">Demo Mode</span>
          <span className="font-code" style={{ fontSize: '11px', color: 'var(--on-surface-variant)' }}>SIH 2026</span>
        </div>
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--on-surface-variant)',
            textDecoration: 'none',
            fontSize: '12px',
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>open_in_new</span>
          <span>View Public Portal</span>
        </Link>
      </div>
    </aside>
  );
};
