import React from 'react';
import { Link } from 'react-router-dom';

interface HomeActionCardsProps {
  pendingSyncCount: number;
  totalRecordsCount: number;
}

export const HomeActionCards: React.FC<HomeActionCardsProps> = ({
  pendingSyncCount,
  totalRecordsCount,
}) => {
  return (
    <section className="np-home-actions-section" aria-label="Primary Field Actions">
      {/* 1. DOMINANT PRIMARY ACTION: New Field Test */}
      <Link
        to="/new-test"
        className="np-dominant-action-card"
        aria-label="Start New Field Test"
      >
        <div className="np-dominant-card-body">
          <div className="np-dominant-icon-badge" aria-hidden="true">
            <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>
              science
            </span>
          </div>
          <div className="np-dominant-text-block">
            <span className="np-dominant-tag">PRIMARY TASK</span>
            <h2 className="np-dominant-title">NEW FIELD TEST</h2>
            <span className="np-dominant-subtitle">Start presumptive chemical reagent screening</span>
          </div>
        </div>
        <div className="np-dominant-action-btn">
          <span>Start Test</span>
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
            arrow_forward
          </span>
        </div>
      </Link>

      {/* THREE SECONDARY ACTIONS (Clean Utility Tiles — No Paragraph Fluff) */}
      <div className="np-secondary-actions-grid" role="group" aria-label="Secondary Field Actions">
        {/* 2. Find a Record */}
        <Link
          to="/records"
          className="np-action-tile"
          aria-label={`Find a Record — ${totalRecordsCount} records`}
        >
          <div className="np-action-tile-icon icon-search" aria-hidden="true">
            <span className="material-symbols-outlined" style={{ fontSize: '26px' }}>
              search
            </span>
          </div>
          <div className="np-action-tile-info">
            <h3 className="np-action-tile-title">FIND A RECORD</h3>
            <span className="np-action-tile-badge font-tabular">{totalRecordsCount} Records</span>
          </div>
          <span className="material-symbols-outlined np-action-tile-arrow" aria-hidden="true">
            chevron_right
          </span>
        </Link>

        {/* 3. Pending Uploads */}
        <Link
          to="/sync-queue"
          className="np-action-tile"
          aria-label={`Pending Uploads — ${pendingSyncCount} awaiting upload`}
        >
          <div className="np-action-tile-icon icon-upload" aria-hidden="true">
            <span className="material-symbols-outlined" style={{ fontSize: '26px' }}>
              cloud_upload
            </span>
          </div>
          <div className="np-action-tile-info">
            <h3 className="np-action-tile-title">PENDING UPLOADS</h3>
            <span
              className={`np-action-tile-badge font-tabular ${
                pendingSyncCount > 0 ? 'badge-amber-accent' : 'badge-green-accent'
              }`}
            >
              {pendingSyncCount > 0 ? `${pendingSyncCount} Pending` : 'All Synced'}
            </span>
          </div>
          <span className="material-symbols-outlined np-action-tile-arrow" aria-hidden="true">
            chevron_right
          </span>
        </Link>

        {/* 4. Help & Protocols */}
        <Link
          to="/help-protocols"
          className="np-action-tile"
          aria-label="Help and Field Protocols"
        >
          <div className="np-action-tile-icon icon-protocols" aria-hidden="true">
            <span className="material-symbols-outlined" style={{ fontSize: '26px' }}>
              menu_book
            </span>
          </div>
          <div className="np-action-tile-info">
            <h3 className="np-action-tile-title">HELP & PROTOCOLS</h3>
            <span className="np-action-tile-badge">Field SOPs & Legal</span>
          </div>
          <span className="material-symbols-outlined np-action-tile-arrow" aria-hidden="true">
            chevron_right
          </span>
        </Link>
      </div>
    </section>
  );
};
