import React from 'react';
import { Link } from 'react-router-dom';
import type { OfficerSession } from '../../types/testRecord';

interface OfficerHeroProps {
  session: OfficerSession;
  pendingSyncCount: number;
  onSync: () => void;
  isSyncing: boolean;
}

export const OfficerHero: React.FC<OfficerHeroProps> = ({
  session,
  pendingSyncCount,
  onSync,
  isSyncing,
}) => {
  return (
    <>
      {/* =========================================================================
          DESKTOP COMMAND ACTION BAR (Hidden on mobile)
          ========================================================================= */}
      <div className="np-command-bar" style={{ display: 'none' }} id="np-desktop-bar">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <h1 className="text-headline-md" style={{ color: 'var(--primary)' }}>
              Officer Field Dashboard
            </h1>
            <span className="badge-demo">Field Console</span>
          </div>
          <p className="text-body-md" style={{ color: 'var(--on-surface-variant)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <span className="text-title-sm" style={{ color: 'var(--on-surface)' }}>{session.officerName}</span>
            <span className="font-code" style={{ color: 'var(--primary)', fontWeight: 600 }}>{session.officerBadge}</span>
            <span style={{ color: 'var(--outline-variant)' }}>·</span>
            <span>{session.location}</span>
            <span style={{ color: 'var(--outline-variant)' }}>·</span>
            <span style={{ color: 'var(--secondary)', fontWeight: 500 }}>{session.sector}</span>
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {/* Telemetry Indicator */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--surface-container-low)',
              border: '1px solid var(--border-subtle)',
              padding: '6px 10px',
              borderRadius: '4px',
            }}
            className="text-label-sm font-tabular"
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: 'var(--secondary)',
              }}
              className="animate-pulse"
            ></span>
            <span style={{ color: 'var(--on-surface)', fontWeight: 600 }}>Online (Cellular)</span>
            <span style={{ color: 'var(--outline-variant)' }}>·</span>
            <span style={{ color: 'var(--on-surface-variant)' }}>{pendingSyncCount} records awaiting sync</span>
          </div>

          {/* Sync Trigger */}
          <button
            type="button"
            className="btn btn-outline btn-sm font-tabular"
            onClick={onSync}
            disabled={isSyncing || pendingSyncCount === 0}
            title={pendingSyncCount > 0 ? "Synchronize pending records" : "All records synchronized"}
          >
            <span className={`material-symbols-outlined ${isSyncing ? 'animate-spin' : ''}`} style={{ fontSize: '16px' }}>
              sync
            </span>
            <span>{isSyncing ? 'Syncing...' : `Sync (${pendingSyncCount})`}</span>
          </button>

          {/* Primary Action CTA */}
          <Link to="/new-test" className="btn btn-primary">
            <span>+ Start New Field Test</span>
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
              arrow_forward
            </span>
          </Link>
        </div>
      </div>

      {/* Inline media query override for desktop display */}
      <style>{`
        @media (min-width: 1024px) {
          #np-desktop-bar {
            display: flex !important;
          }
          #np-mobile-hero-stack {
            display: none !important;
          }
        }
      `}</style>

      {/* =========================================================================
          MOBILE COMMAND STACK (Visible on mobile, hidden on desktop)
          ========================================================================= */}
      <div id="np-mobile-hero-stack" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Officer Shift Header Card */}
        <section
          style={{
            backgroundColor: 'var(--surface-container-lowest)',
            borderRadius: '10px',
            padding: '14px',
            boxShadow: '0 1px 2px rgba(15, 23, 42, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--primary-container)',
                  color: 'var(--on-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
                  shield_person
                </span>
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                  <span className="text-title-md" style={{ color: 'var(--primary)' }}>{session.officerName}</span>
                  <span className="badge-demo font-code">{session.officerBadge}</span>
                </div>
                <div className="text-body-sm" style={{ color: 'var(--on-surface-variant)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '15px', color: 'var(--secondary)' }}>pin_drop</span>
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{session.location}</span>
                </div>
              </div>
            </div>
            <div
              style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--secondary)', flexShrink: 0, marginTop: '4px' }}
              title="Active Shift Duty"
            ></div>
          </div>

          {/* Telemetry bar on mobile */}
          <div
            style={{
              backgroundColor: 'var(--surface-container-low)',
              borderRadius: '6px',
              padding: '10px 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--primary)' }}>cell_tower</span>
              <div style={{ minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span className="text-label-sm" style={{ color: 'var(--primary)', fontWeight: 600 }}>Online</span>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--secondary)' }}></span>
                </div>
                <span className="text-body-sm font-tabular" style={{ color: 'var(--on-surface-variant)' }}>
                  {pendingSyncCount} records awaiting sync
                </span>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-teal btn-sm font-tabular"
              onClick={onSync}
              disabled={isSyncing || pendingSyncCount === 0}
            >
              <span className={`material-symbols-outlined ${isSyncing ? 'animate-spin' : ''}`} style={{ fontSize: '16px' }}>
                sync
              </span>
              <span>{isSyncing ? 'Syncing...' : `Sync (${pendingSyncCount})`}</span>
            </button>
          </div>
        </section>

        {/* Dominant Action CTA Card on Mobile */}
        <Link to="/new-test" className="np-mobile-cta-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--on-primary)',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '26px' }}>
                biotech
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="text-headline-sm" style={{ color: 'var(--on-primary)', lineHeight: 1.1 }}>
                + Start New Field Test
              </span>
              <span className="text-body-sm" style={{ color: 'var(--on-primary-container)', marginTop: '2px' }}>
                Step 1 of 5: Case & Officer Details
              </span>
            </div>
          </div>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
              arrow_forward
            </span>
          </div>
        </Link>
      </div>
    </>
  );
};
