import React, { useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';

interface DesktopSidebarProps {
  pendingSyncCount: number;
  onLogout?: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  pendingSyncCount,
  onLogout,
  isOpen = false,
  onClose,
}) => {
  const sidebarRef = useRef<HTMLElement>(null);

  // Keyboard accessibility: Close menu on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleLinkClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Desktop narrow edge hint — visual cue indicating hover-reveal sidebar on the left */}
      <div className="np-sidebar-edge-hint" aria-hidden="true" title="Hover here to reveal navigation menu" />

      {/* Backdrop overlay only when explicitly open via keyboard toggle */}
      {isOpen && (
        <div
          className="np-sidebar-backdrop"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        ref={sidebarRef}
        className={`np-sidebar ${isOpen ? 'np-sidebar-open' : ''}`}
        aria-label="Application Navigation"
        aria-hidden={!isOpen ? undefined : false}
      >
        <div>
          {/* Brand header with Close button */}
          <div className="np-sidebar-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div className="np-brand-icon">
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>shield</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: '#fff', fontWeight: 800, fontSize: '15px', lineHeight: 1.1 }}>
                  NashaPrahari
                </span>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px', marginTop: '1px' }}>
                  Field Operations Terminal
                </span>
              </div>
            </div>

            {/* Keyboard-accessible Close button */}
            {onClose && (
              <button
                type="button"
                className="np-sidebar-close-btn"
                onClick={onClose}
                aria-label="Close navigation menu"
                title="Close menu (Esc)"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>close</span>
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className="np-sidebar-nav" aria-label="Main Navigation">
            <NavLink
              to="/dashboard"
              className={({ isActive }) => `np-nav-item ${isActive ? 'active' : ''}`}
              onClick={handleLinkClick}
              end
            >
              <div className="np-nav-item-left">
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>home</span>
                <span>Dashboard</span>
              </div>
            </NavLink>

            <NavLink
              to="/new-test"
              className={({ isActive }) => `np-nav-item ${isActive ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              <div className="np-nav-item-left">
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>science</span>
                <span>New Field Test</span>
              </div>
            </NavLink>

            <NavLink
              to="/records"
              className={({ isActive }) => `np-nav-item ${isActive ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              <div className="np-nav-item-left">
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>assignment</span>
                <span>Records</span>
              </div>
            </NavLink>

            <NavLink
              to="/sync-queue"
              className={({ isActive }) => `np-nav-item ${isActive ? 'active' : ''}`}
              onClick={handleLinkClick}
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
              onClick={handleLinkClick}
            >
              <div className="np-nav-item-left">
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>inventory_2</span>
                <span>Evidence & Malkhana</span>
              </div>
            </NavLink>

            <NavLink
              to="/help-protocols"
              className={({ isActive }) => `np-nav-item ${isActive ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              <div className="np-nav-item-left">
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>help_outline</span>
                <span>Help & Protocols</span>
              </div>
            </NavLink>
          </nav>
        </div>

        <div className="np-sidebar-footer">
          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              style={{
                background: 'none',
                border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: '5px',
                color: 'rgba(255,255,255,0.85)',
                cursor: 'pointer',
                width: '100%',
                padding: '8px',
                fontSize: '13px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                marginBottom: '8px',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>logout</span>
              <span>Sign Out</span>
            </button>
          )}
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>
            Field Operations Terminal v2.4
          </div>
          <Link
            to="/"
            onClick={handleLinkClick}
            style={{ display: 'block', color: 'rgba(255,255,255,0.6)', fontSize: '11px', textDecoration: 'none', marginTop: '2px' }}
          >
            ← Public Portal
          </Link>
        </div>
      </aside>
    </>
  );
};
