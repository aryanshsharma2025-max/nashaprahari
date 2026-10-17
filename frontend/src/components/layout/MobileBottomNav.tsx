import React from 'react';
import { NavLink } from 'react-router-dom';

export const MobileBottomNav: React.FC = () => {
  return (
    <nav className="np-mobile-bottom-nav pb-safe" aria-label="Mobile Bottom Navigation">
      <NavLink
        to="/"
        className={({ isActive }) => `np-tab-item ${isActive ? 'active' : ''}`}
        end
      >
        <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>
          grid_view
        </span>
        <span>Dashboard</span>
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
