import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import type { TestRecord } from '../types/testRecord';
import { StatusBadge } from '../components/common/StatusBadge';
import { RecordDetailModal } from '../components/common/RecordDetailModal';
import { useIsMobile } from '../components/common/useIsMobile';
import { formatIndianDate, formatIndianTimestamp } from '../utils/formatters';

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
  const isMobile = useIsMobile();
  const shouldReduceMotion = useReducedMotion();
  const transition = shouldReduceMotion || isMobile
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 380, damping: 34, mass: 0.8 };

  const [selectedRecord, setSelectedRecord] = useState<TestRecord | null>(null);

  const pendingRecords = records.filter((r) => r.syncStatus === 'pending');
  const syncedRecords = records.filter((r) => r.syncStatus === 'synced');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      {/* Breadcrumb Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="text-body-sm">
        <Link to="/dashboard" style={{ color: 'var(--secondary)', textDecoration: 'none', fontWeight: 500 }}>
          Home Dashboard
        </Link>
        <span style={{ color: 'var(--outline-variant)' }}>/</span>
        <span style={{ color: 'var(--on-surface-variant)' }}>Pending Uploads</span>
      </div>

      {/* Screen Title & Manual Sync Action */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 className="text-headline-md" style={{ color: 'var(--primary)', margin: 0 }}>
            Pending Uploads Queue
          </h1>
          <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)', margin: '4px 0 0' }}>
            Manage offline field records queued in local device storage awaiting batch upload
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={onSync}
          disabled={isSyncing || pendingRecords.length === 0}
          style={{ minHeight: '44px' }}
        >
          <span className={`material-symbols-outlined ${isSyncing ? 'animate-spin' : ''}`} style={{ fontSize: '18px' }}>
            sync
          </span>
          <span>{isSyncing ? 'Processing Queue...' : `Sync Local Queue (${pendingRecords.length})`}</span>
        </button>
      </div>

      {/* Offline Storage Status Banner */}
      <div style={{ padding: '10px 14px', backgroundColor: 'var(--surface-container-low)', border: '1px solid var(--border-subtle)', borderRadius: '2px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--secondary)' }}>
          storage
        </span>
        <span className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>
          Field records and custody seals are stored locally until synchronized.
        </span>
      </div>

      {/* Queue Metrics Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
        <div className="np-panel" style={{ padding: '16px' }}>
          <span className="text-label-sm" style={{ color: 'var(--on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Pending Uplink
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '4px' }}>
            <span className="font-tabular" style={{ fontSize: '26px', fontWeight: 800, color: pendingRecords.length > 0 ? '#d97706' : 'var(--primary)' }}>
              {pendingRecords.length}
            </span>
            <span className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>
              {pendingRecords.length === 1 ? 'record queued' : 'records queued'}
            </span>
          </div>
        </div>

        <div className="np-panel" style={{ padding: '16px' }}>
          <span className="text-label-sm" style={{ color: 'var(--on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Synchronized
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '4px' }}>
            <span className="font-tabular" style={{ fontSize: '26px', fontWeight: 800, color: '#047857' }}>
              {syncedRecords.length}
            </span>
            <span className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>
              records in ledger
            </span>
          </div>
        </div>

        <div className="np-panel" style={{ padding: '16px' }}>
          <span className="text-label-sm" style={{ color: 'var(--on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Queue Mode
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--secondary)' }} />
            <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary)' }}>
              Offline Resilient
            </span>
          </div>
        </div>
      </div>

      {/* 1. Pending Local Records Section */}
      <div className="np-panel">
        <div className="np-panel-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '20px', color: pendingRecords.length > 0 ? '#d97706' : 'var(--secondary)' }}>
              {pendingRecords.length > 0 ? 'hourglass_top' : 'check_circle'}
            </span>
            <h2 className="text-title-sm" style={{ color: 'var(--primary)', fontWeight: 700, margin: 0 }}>
              Awaiting Batch Sync ({pendingRecords.length})
            </h2>
          </div>
          {pendingRecords.length > 0 && (
            <span className="badge badge-amber-accent">Queued on Device</span>
          )}
        </div>

        {pendingRecords.length === 0 ? (
          <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--on-surface-variant)' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '36px', color: '#047857', display: 'block', margin: '0 auto 8px' }}>
              cloud_done
            </span>
            <strong style={{ color: 'var(--primary)', display: 'block', fontSize: '15px' }}>
              All Field Records Synchronized
            </strong>
            <p className="text-body-sm" style={{ margin: '4px 0 0' }}>
              No records currently waiting in offline device storage. New field tests will appear here.
            </p>
          </div>
        ) : (
          <div className="np-short-records-list">
            <AnimatePresence initial={false}>
              {pendingRecords.map((r) => (
                <motion.div
                  key={r.id}
                  layout={!isMobile}
                  layoutId={isMobile || shouldReduceMotion ? undefined : `sync-queue-${r.id}`}
                  className="np-short-record-row"
                  onClick={() => setSelectedRecord(r)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedRecord(r);
                    }
                  }}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0, overflow: 'hidden', padding: 0 }}
                  aria-label={`View pending record ${r.id}, ${r.testType}`}
                  transition={transition}
                >
                  <div className="np-short-record-left">
                    <div className="np-short-record-icon" style={{ backgroundColor: '#fffbeb', color: '#b45309' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                        schedule
                      </span>
                    </div>
                    <div className="np-short-record-info">
                      <div className="np-list-primary-line">
                        <span className="np-record-id">{r.id}</span>
                        <span className="np-record-sep">·</span>
                        <span className="np-record-title">{r.testType}</span>
                        {r.chainOfCustody?.tamperBagId && (
                          <span className="np-record-tag">{r.chainOfCustody.tamperBagId}</span>
                        )}
                      </div>
                      <div className="np-short-record-sub">
                        <span className="np-record-location">{r.location}</span>
                        {r.subLocation && <span className="np-record-meta">({r.subLocation})</span>}
                        <span className="np-record-sep">·</span>
                        <span className="np-record-meta">{formatIndianTimestamp(r.timestamp)} ({formatIndianDate(r.date)})</span>
                      </div>
                    </div>
                  </div>

                  <div className="np-short-record-right">
                    <div className="np-short-record-badges">
                      <StatusBadge type="result" result={r.result} />
                      <span className="badge badge-amber-accent">Pending Upload</span>
                    </div>
                    <span className="material-symbols-outlined np-record-chevron">chevron_right</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* 2. Synchronized Session Records Section */}
      {syncedRecords.length > 0 && (
        <div className="np-panel">
          <div className="np-panel-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#047857' }}>
                cloud_done
              </span>
              <h2 className="text-title-sm" style={{ color: 'var(--primary)', fontWeight: 700, margin: 0 }}>
                Synchronized Session Records ({syncedRecords.length})
              </h2>
            </div>
            <span className="badge badge-green-accent">Committed</span>
          </div>

          <div className="np-short-records-list">
            {syncedRecords.slice(0, 5).map((r) => (
              <motion.div
                key={r.id}
                layoutId={isMobile || shouldReduceMotion ? undefined : `sync-queue-${r.id}`}
                className="np-short-record-row"
                onClick={() => setSelectedRecord(r)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedRecord(r);
                  }
                }}
                aria-label={`View synced record ${r.id}, ${r.testType}`}
                transition={transition}
              >
                <div className="np-short-record-left">
                  <div className="np-short-record-icon" style={{ backgroundColor: '#f0fdf4', color: '#15803d' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                      done_all
                    </span>
                  </div>
                  <div className="np-short-record-info">
                    <div className="np-list-primary-line">
                      <span className="np-record-id">{r.id}</span>
                      <span className="np-record-sep">·</span>
                      <span className="np-record-title">{r.testType}</span>
                      {r.chainOfCustody?.tamperBagId && (
                        <span className="np-record-tag">{r.chainOfCustody.tamperBagId}</span>
                      )}
                    </div>
                    <div className="np-short-record-sub">
                      <span className="np-record-location">{r.location}</span>
                      {r.subLocation && <span className="np-record-meta">({r.subLocation})</span>}
                      <span className="np-record-sep">·</span>
                      <span className="np-record-meta">{formatIndianTimestamp(r.timestamp)} ({formatIndianDate(r.date)})</span>
                    </div>
                  </div>
                </div>

                <div className="np-short-record-right">
                  <div className="np-short-record-badges">
                    <StatusBadge type="result" result={r.result} />
                    <span className="badge badge-synced">Synced</span>
                  </div>
                  <span className="material-symbols-outlined np-record-chevron">chevron_right</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Record Inspection Modal with shared-element transition */}
      <RecordDetailModal
        record={selectedRecord}
        onClose={() => setSelectedRecord(null)}
        layoutIdPrefix="sync-queue"
      />
    </div>
  );
};
