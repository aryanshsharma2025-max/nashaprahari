import React from 'react';
import { Link } from 'react-router-dom';
import type { TestRecord } from '../types/testRecord';
import { StatusBadge } from '../components/common/StatusBadge';

interface SyncQueuePageProps {
  records: TestRecord[];
  onSync: () => void;
  isSyncing: boolean;
}

export const SyncQueuePage: React.FC<SyncQueuePageProps> = ({
  records,
  onSync,
  isSyncing,
}) => {
  const pendingRecords = records.filter((r) => r.syncStatus === 'pending');
  const syncedRecords = records.filter((r) => r.syncStatus === 'synced');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="text-body-sm">
        <Link to="/" style={{ color: 'var(--secondary)', textDecoration: 'none' }}>Dashboard</Link>
        <span style={{ color: 'var(--outline-variant)' }}>/</span>
        <span style={{ color: 'var(--on-surface-variant)' }}>Sync Queue</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 className="text-headline-md" style={{ color: 'var(--primary)' }}>
            Offline Sync Queue
          </h1>
          <span className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>
            Local queue monitor and central ledger synchronization
          </span>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={onSync}
          disabled={isSyncing || pendingRecords.length === 0}
        >
          <span className={`material-symbols-outlined ${isSyncing ? 'animate-spin' : ''}`} style={{ fontSize: '18px' }}>
            sync
          </span>
          <span>{isSyncing ? 'Synchronizing...' : `Sync All Pending (${pendingRecords.length})`}</span>
        </button>
      </div>

      {/* Honest Backend Boundary Notice */}
      <div style={{ padding: '12px 16px', background: 'var(--surface-container-low)', border: '1px solid var(--border-subtle)', borderRadius: '6px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--secondary)' }}>cloud_queue</span>
          <span className="text-title-sm" style={{ color: 'var(--primary)' }}>Sync Engine Status (Demonstration Simulation)</span>
        </div>
        <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.5 }}>
          Local records are queued in device storage during offline field patrols. In this Phase 1 prototype, the sync engine simulates transmission to the central forensic repository. Production background service worker sync will link to the central server when the backend is deployed.
        </p>
      </div>

      {/* Pending Queue Section */}
      <div className="np-panel">
        <div className="np-panel-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--warning-text)' }}>hourglass_empty</span>
            <h2 className="text-title-md">Pending Local Records ({pendingRecords.length})</h2>
          </div>
          <span className="badge-demo">Awaiting Uplink</span>
        </div>

        {pendingRecords.length === 0 ? (
          <div style={{ padding: '32px', textAlign: 'center', color: 'var(--on-surface-variant)' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '32px', color: 'var(--secondary)', display: 'block', margin: '0 auto 8px' }}>
              cloud_done
            </span>
            <p className="text-body-md" style={{ fontWeight: 600 }}>All records are synchronized</p>
            <span className="text-body-sm">No items currently queued in offline storage.</span>
          </div>
        ) : (
          <div className="np-table-container">
            <table className="np-table">
              <thead>
                <tr>
                  <th>Record ID</th>
                  <th>Timestamp</th>
                  <th>Location</th>
                  <th>Kit & Lot</th>
                  <th>Presumptive Result</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {pendingRecords.map((r) => (
                  <tr key={r.id}>
                    <td className="font-code" style={{ color: 'var(--primary)', fontWeight: 700 }}>{r.id}</td>
                    <td className="font-tabular text-body-sm">{r.timestamp}</td>
                    <td className="text-body-sm">{r.location} · {r.subLocation}</td>
                    <td className="text-body-sm">{r.testType} ({r.lotNumber})</td>
                    <td><StatusBadge type="result" result={r.result} /></td>
                    <td><StatusBadge type="sync" status={r.syncStatus} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recently Synced Section */}
      <div className="np-panel">
        <div className="np-panel-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--secondary)' }}>cloud_done</span>
            <h2 className="text-title-md">Synchronized Records ({syncedRecords.length})</h2>
          </div>
          <span className="badge-demo">Verified Transmission</span>
        </div>
        <div className="np-table-container">
          <table className="np-table">
            <thead>
              <tr>
                <th>Record ID</th>
                <th>Timestamp</th>
                <th>Location</th>
                <th>Presumptive Result</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {syncedRecords.slice(0, 5).map((r) => (
                <tr key={r.id}>
                  <td className="font-code">{r.id}</td>
                  <td className="font-tabular text-body-sm">{r.timestamp}</td>
                  <td className="text-body-sm">{r.location}</td>
                  <td><StatusBadge type="result" result={r.result} /></td>
                  <td><StatusBadge type="sync" status={r.syncStatus} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
