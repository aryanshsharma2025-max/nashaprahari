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
        aria-label="Start New Field Test — Step 1 of 5"
      >
        <div className="np-dominant-card-body">
          <div className="np-dominant-icon-badge" aria-hidden="true">
            <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>
              biotech
            </span>
          </div>
          <div className="np-dominant-text-block">
            <div className="np-dominant-badge-row">
              <span className="np-dominant-title">1. New Field Test</span>
              <span className="np-dominant-tag">Primary Duty Action</span>
            </div>
            <p className="np-dominant-desc">
              Record seized substance, run presumptive reagent chemical test & initiate chain-of-custody
            </p>
          </div>
        </div>
        <div className="np-dominant-action-btn">
          <span className="np-dominant-btn-label">Start Screening</span>
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
            arrow_forward
          </span>
        </div>
      </Link>

      {/* THREE SECONDARY ACTIONS GRID */}
      <div className="np-secondary-actions-grid" role="group" aria-label="Secondary Actions">
        {/* 2. Find a Record */}
        <Link
          to="/records"
          className="np-action-tile"
          aria-label={`Find a Record — Browse ${totalRecordsCount} records`}
        >
          <div className="np-action-tile-icon icon-search" aria-hidden="true">
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
              search
            </span>
          </div>
          <div className="np-action-tile-info">
            <div className="np-action-tile-header">
              <h3 className="text-title-sm np-action-tile-title">2. Find a Record</h3>
              <span className="badge-demo font-tabular">{totalRecordsCount} Records</span>
            </div>
            <p className="text-body-sm np-action-tile-desc">
              Search previous tests by Case ID, suspect, location, or date
            </p>
          </div>
          <span className="material-symbols-outlined np-action-tile-arrow" aria-hidden="true">
            chevron_right
          </span>
        </Link>

        {/* 3. Pending Uploads */}
        <Link
          to="/sync-queue"
          className="np-action-tile"
          aria-label={`Pending Uploads — ${pendingSyncCount} records awaiting sync`}
        >
          <div className="np-action-tile-icon icon-upload" aria-hidden="true">
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
              cloud_upload
            </span>
          </div>
          <div className="np-action-tile-info">
            <div className="np-action-tile-header">
              <h3 className="text-title-sm np-action-tile-title">3. Pending Uploads</h3>
              <span
                className={`badge-demo font-tabular ${pendingSyncCount > 0 ? 'badge-amber-accent' : 'badge-green-accent'}`}
              >
                {pendingSyncCount > 0 ? `${pendingSyncCount} Pending` : 'All Uploaded'}
              </span>
            </div>
            <p className="text-body-sm np-action-tile-desc">
              Review offline queue & synchronize local records with central ledger
            </p>
          </div>
          <span className="material-symbols-outlined np-action-tile-arrow" aria-hidden="true">
            chevron_right
          </span>
        </Link>

        {/* 4. Help & Protocols */}
        <Link
          to="/help-protocols"
          className="np-action-tile"
          aria-label="Help & Protocols — Standard Operating Procedures and Helpline"
        >
          <div className="np-action-tile-icon icon-protocols" aria-hidden="true">
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
              menu_book
            </span>
          </div>
          <div className="np-action-tile-info">
            <div className="np-action-tile-header">
              <h3 className="text-title-sm np-action-tile-title">4. Help & Protocols</h3>
              <span className="badge-demo font-code">SOP v2.4</span>
            </div>
            <p className="text-body-sm np-action-tile-desc">
              Evidence sealing guides, reagent shelf-life QC & FSL duty hotline
            </p>
          </div>
          <span className="material-symbols-outlined np-action-tile-arrow" aria-hidden="true">
            chevron_right
          </span>
        </Link>
      </div>
    </section>
  );
};
