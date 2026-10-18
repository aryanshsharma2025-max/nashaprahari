import React from 'react';
import type { OperationalMetrics } from '../../types/testRecord';

interface MetricCardsProps {
  metrics: OperationalMetrics;
}

export const MetricCards: React.FC<MetricCardsProps> = ({ metrics }) => {
  return (
    <section className="np-metrics-grid" aria-label="Operational Metrics Summary">
      {/* Card 1: Today's Tests */}
      <div className="np-metric-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span className="text-label-md" style={{ color: 'var(--on-surface-variant)' }}>
            Today's Tests
          </span>
          <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--primary)' }}>
            assignment
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '8px' }}>
          <span className="text-headline-lg font-tabular" style={{ color: 'var(--primary)' }}>
            {metrics.todayTestsLogged}
          </span>
          <span className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>
            Logged
          </span>
        </div>
        <div className="np-metric-progress-bg">
          <div
            className="np-metric-progress-fill"
            style={{ width: '100%', backgroundColor: 'var(--primary-container)' }}
          ></div>
        </div>
      </div>

      {/* Card 2: Synced to Ledger (Simulated) */}
      <div className="np-metric-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span className="text-label-md" style={{ color: 'var(--on-surface-variant)' }}>
            Synced to Ledger <span className="text-label-sm" style={{ fontSize: '11px', opacity: 0.8 }}>(Simulated)</span>
          </span>
          <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--secondary)' }}>
            cloud_done
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '8px' }}>
          <span className="text-headline-lg font-tabular" style={{ color: 'var(--secondary)' }}>
            {metrics.syncedCount}
          </span>
          <span className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>
            Uploaded
          </span>
        </div>
        <div className="np-metric-progress-bg">
          <div
            className="np-metric-progress-fill"
            style={{
              width: `${metrics.todayTestsLogged > 0 ? (metrics.syncedCount / metrics.todayTestsLogged) * 100 : 0}%`,
              backgroundColor: 'var(--secondary)',
            }}
          ></div>
        </div>
      </div>

      {/* Card 3: Queued Offline */}
      <div className="np-metric-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span className="text-label-md" style={{ color: 'var(--on-surface-variant)' }}>
            Queued Offline
          </span>
          <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--on-surface-variant)' }}>
            cloud_queue
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '8px' }}>
          <span className="text-headline-lg font-tabular" style={{ color: 'var(--on-surface)' }}>
            {metrics.pendingCount}
          </span>
          <span className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>
            Pending · Awaiting link
          </span>
        </div>
        <div className="np-metric-progress-bg">
          <div
            className="np-metric-progress-fill"
            style={{
              width: `${metrics.todayTestsLogged > 0 ? (metrics.pendingCount / metrics.todayTestsLogged) * 100 : 0}%`,
              backgroundColor: 'var(--outline)',
            }}
          ></div>
        </div>
      </div>

      {/* Card 4: Available Kits */}
      <div className="np-metric-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span className="text-label-md" style={{ color: 'var(--on-surface-variant)' }}>
            Available Kits
          </span>
          <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--primary-container)' }}>
            inventory_2
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '8px' }}>
          <span className="text-headline-lg font-tabular" style={{ color: 'var(--primary)' }}>
            {metrics.availableKits}
          </span>
          <span className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>
            Remaining
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px' }} className="text-body-sm">
          <span className="font-code" style={{ color: 'var(--on-surface-variant)' }}>{metrics.activeLot}</span>
          <span style={{ color: 'var(--secondary)', fontWeight: 600 }}>Active</span>
        </div>
      </div>
    </section>
  );
};
