import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { useIsMobile } from '../common/useIsMobile';

interface HomeActionCardsProps {
  pendingSyncCount: number;
  totalRecordsCount: number;
}

export const HomeActionCards: React.FC<HomeActionCardsProps> = ({
  pendingSyncCount,
  totalRecordsCount,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();

  return (
    <section className="np-home-actions-section" aria-label="Primary Field Actions">
      {/* 1. DOMINANT PRIMARY ACTION: New Field Test (Refined Navy Surface + Saffron Accents) */}
      <motion.div
        whileHover={shouldReduceMotion || isMobile ? undefined : { y: -2, scale: 1.004 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
        transition={{ duration: 0.15 }}
      >
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
              <div className="np-dominant-tag-wrap">
                <span className="np-dominant-tag">PRIMARY TASK</span>
                <span className="np-dominant-badge">Field Screening</span>
              </div>
              <h2 className="np-dominant-title">NEW FIELD TEST</h2>
              <span className="np-dominant-subtitle">
                Initiate presumptive chemical reagent test with custody logging
              </span>
            </div>
          </div>

          <div className="np-dominant-action-btn">
            <span>Start Test</span>
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
              arrow_forward
            </span>
          </div>
        </Link>
      </motion.div>

      {/* THREE SECONDARY ACTIONS (Clean Utility Tiles with Consistent Containers & Subtle Depth) */}
      <div className="np-secondary-actions-grid" role="group" aria-label="Secondary Field Actions">
        {/* 2. Find a Record */}
        <motion.div
          whileHover={shouldReduceMotion || isMobile ? undefined : { y: -2 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
          transition={{ duration: 0.12 }}
        >
          <Link
            to="/records"
            className="np-action-tile"
            aria-label={`Find a Record — ${totalRecordsCount} records`}
          >
            <div className="np-action-tile-icon icon-search" aria-hidden="true">
              <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
                search
              </span>
            </div>
            <div className="np-action-tile-info">
              <h3 className="np-action-tile-title">FIND A RECORD</h3>
              <span className="np-action-tile-badge font-tabular">{totalRecordsCount} Records Logged</span>
            </div>
            <span className="material-symbols-outlined np-action-tile-arrow" aria-hidden="true">
              chevron_right
            </span>
          </Link>
        </motion.div>

        {/* 3. Pending Uploads */}
        <motion.div
          whileHover={shouldReduceMotion || isMobile ? undefined : { y: -2 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
          transition={{ duration: 0.12 }}
        >
          <Link
            to="/sync-queue"
            className="np-action-tile"
            aria-label={`Pending Uploads — ${pendingSyncCount} awaiting upload`}
          >
            <div className="np-action-tile-icon icon-upload" aria-hidden="true">
              <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
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
                {pendingSyncCount > 0 ? `${pendingSyncCount} Awaiting Sync` : 'All Synced Locally'}
              </span>
            </div>
            <span className="material-symbols-outlined np-action-tile-arrow" aria-hidden="true">
              chevron_right
            </span>
          </Link>
        </motion.div>

        {/* 4. Help & Protocols */}
        <motion.div
          whileHover={shouldReduceMotion || isMobile ? undefined : { y: -2 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
          transition={{ duration: 0.12 }}
        >
          <Link
            to="/help-protocols"
            className="np-action-tile"
            aria-label="Help and Field Protocols"
          >
            <div className="np-action-tile-icon icon-protocols" aria-hidden="true">
              <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
                menu_book
              </span>
            </div>
            <div className="np-action-tile-info">
              <h3 className="np-action-tile-title">HELP & PROTOCOLS</h3>
              <span className="np-action-tile-badge">Field SOPs & Legal Guide</span>
            </div>
            <span className="material-symbols-outlined np-action-tile-arrow" aria-hidden="true">
              chevron_right
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
