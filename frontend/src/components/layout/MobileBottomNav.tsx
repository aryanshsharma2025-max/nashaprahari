import React from 'react';
import { NavLink } from 'react-router-dom';

interface MobileBottomNavProps {
  pendingSyncCount?: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ pendingSyncCount = 0 }) => {
  return (
    <nav className="np-mobile-bottom-nav pb-safe" aria-label="Mobile Bottom Navigation">
      <NavLink
        to="/dashboard"
        className={({ isActive }) => `np-tab-item ${isActive ? 'active' : ''}`}
        end
      >
        <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>
          grid_view
        </span>
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/new-test"
        className={({ isActive }) => `np-tab-item ${isActive ? 'active' : ''}`}
      >
        <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>
          add_circle
        </span>
        <span>New Test</span>
      </NavLink>

      <NavLink
        to="/records"
        className={({ isActive }) => `np-tab-item ${isActive ? 'active' : ''}`}
      >
        <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>
          assignment
        </span>
        <span>Records</span>
      </NavLink>

      <NavLink
        to="/sync-queue"
        className={({ isActive }) => `np-tab-item ${isActive ? 'active' : ''}`}
        style={{ position: 'relative' }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>
          cloud_upload
        </span>
        <span>Uploads</span>
        {pendingSyncCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '4px',
              right: '14px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#d97706',
            }}
          />
        )}
      </NavLink>

      <NavLink
        to="/help-protocols"
        className={({ isActive }) => `np-tab-item ${isActive ? 'active' : ''}`}
      >
        <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>
          menu_book
        </span>
        <span>Help/SOP</span>
      </NavLink>
    </nav>
  );
};
