import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import type { TestRecord, PresumptiveResult } from '../types/testRecord';
import { StatusBadge } from '../components/common/StatusBadge';
import { RecordDetailModal } from '../components/common/RecordDetailModal';
import { useIsMobile } from '../components/common/useIsMobile';
import { formatIndianDate, formatIndianTimestamp } from '../utils/formatters';

interface RecordsHistoryPageProps {
  records: TestRecord[];
}

export const RecordsHistoryPage: React.FC<RecordsHistoryPageProps> = ({ records }) => {
  const isMobile = useIsMobile();
  const shouldReduceMotion = useReducedMotion();
  const transition = shouldReduceMotion || isMobile
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 380, damping: 34, mass: 0.8 };

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | PresumptiveResult | 'pending_sync'>('all');
  const [selectedRecord, setSelectedRecord] = useState<TestRecord | null>(null);

  // Filtered Records based on search query and status filter
  const filteredRecords = useMemo(() => {
    return records.filter((rec) => {
      // Filter tab
      if (filterType === 'pending_sync' && rec.syncStatus !== 'pending') {
        return false;
      }
      if (filterType !== 'all' && filterType !== 'pending_sync' && rec.result !== filterType) {
        return false;
      }

      // Search query across ID, location, vehicle reference, kit type, lot number
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchId = rec.id.toLowerCase().includes(q);
        const matchLoc = rec.location.toLowerCase().includes(q) || rec.subLocation.toLowerCase().includes(q);
        const matchKit = rec.testType.toLowerCase().includes(q) || rec.lotNumber.toLowerCase().includes(q);
        const matchRef = rec.suspectIdentifier ? rec.suspectIdentifier.toLowerCase().includes(q) : false;
        const matchTamper = rec.chainOfCustody?.tamperBagId ? rec.chainOfCustody.tamperBagId.toLowerCase().includes(q) : false;
        return matchId || matchLoc || matchKit || matchRef || matchTamper;
      }

      return true;
    });
  }, [records, searchQuery, filterType]);

  // Counts for filter pills
  const counts = useMemo(() => {
    return {
      all: records.length,
      positive: records.filter((r) => r.result === 'presumptive_positive').length,
      negative: records.filter((r) => r.result === 'presumptive_negative').length,
      inconclusive: records.filter((r) => r.result === 'inconclusive').length,
      pending: records.filter((r) => r.syncStatus === 'pending').length,
    };
  }, [records]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      {/* Breadcrumb Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="text-body-sm">
        <Link to="/dashboard" style={{ color: 'var(--secondary)', textDecoration: 'none', fontWeight: 500 }}>
          Home Dashboard
        </Link>
        <span style={{ color: 'var(--outline-variant)' }}>/</span>
        <span style={{ color: 'var(--on-surface-variant)' }}>Records Ledger</span>
      </div>

      {/* Screen Title & Fast Actions */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 className="text-headline-md" style={{ color: 'var(--primary)', margin: 0 }}>
            Field Records Ledger
          </h1>
          <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)', margin: '4px 0 0' }}>
            Search, filter, and inspect preliminary field screening records and custody manifests
          </p>
        </div>

        <Link to="/new-test" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add_circle</span>
          <span>Start New Test</span>
        </Link>
      </div>

      {/* Search-First Query Bar & Filter Chips */}
      <div className="np-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ position: 'relative', width: '100%' }}>
          <span
            className="material-symbols-outlined"
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--on-surface-variant)',
              fontSize: '20px',
            }}
          >
            search
          </span>
          <input
            type="text"
            className="np-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Record ID (e.g. NP-2026-0892), vehicle number, bag serial, or post..."
            style={{ paddingLeft: '40px', height: '46px', fontSize: '14px' }}
            aria-label="Search records ledger"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--on-surface-variant)',
                display: 'flex',
              }}
              aria-label="Clear search query"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>cancel</span>
            </button>
          )}
        </div>

        {/* Filter Chips */}
        <div className="np-filter-chip-group">
          <button
            type="button"
            className={`np-filter-chip ${filterType === 'all' ? 'active' : ''}`}
            onClick={() => setFilterType('all')}
          >
            <span>All Records</span>
            <span className="font-tabular font-code" style={{ fontSize: '11px', opacity: 0.85 }}>({counts.all})</span>
          </button>

          <button
            type="button"
            className={`np-filter-chip ${filterType === 'presumptive_positive' ? 'active' : ''}`}
            onClick={() => setFilterType('presumptive_positive')}
          >
            <span style={{ color: filterType === 'presumptive_positive' ? '#ffffff' : '#b91c1c' }}>●</span>
            <span>Positive</span>
            <span className="font-tabular font-code" style={{ fontSize: '11px', opacity: 0.85 }}>({counts.positive})</span>
          </button>

          <button
            type="button"
            className={`np-filter-chip ${filterType === 'presumptive_negative' ? 'active' : ''}`}
            onClick={() => setFilterType('presumptive_negative')}
          >
            <span style={{ color: filterType === 'presumptive_negative' ? '#ffffff' : '#047857' }}>●</span>
            <span>Negative</span>
            <span className="font-tabular font-code" style={{ fontSize: '11px', opacity: 0.85 }}>({counts.negative})</span>
          </button>

          <button
            type="button"
            className={`np-filter-chip ${filterType === 'inconclusive' ? 'active' : ''}`}
            onClick={() => setFilterType('inconclusive')}
          >
            <span style={{ color: filterType === 'inconclusive' ? '#ffffff' : '#475569' }}>●</span>
            <span>Inconclusive</span>
            <span className="font-tabular font-code" style={{ fontSize: '11px', opacity: 0.85 }}>({counts.inconclusive})</span>
          </button>

          <button
            type="button"
            className={`np-filter-chip ${filterType === 'pending_sync' ? 'active' : ''}`}
            onClick={() => setFilterType('pending_sync')}
          >
            <span style={{ color: filterType === 'pending_sync' ? '#ffffff' : '#d97706' }}>●</span>
            <span>Pending Upload</span>
            <span className="font-tabular font-code" style={{ fontSize: '11px', opacity: 0.85 }}>({counts.pending})</span>
          </button>
        </div>
      </div>

      {/* Results Count & View Container */}
      <div className="np-panel">
        <div className="np-panel-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="text-title-sm" style={{ color: 'var(--primary)', fontWeight: 700 }}>
              Showing {filteredRecords.length} {filteredRecords.length === 1 ? 'Record' : 'Records'}
            </span>
            {searchQuery && (
              <span className="badge-demo">Matching "{searchQuery}"</span>
            )}
          </div>
          <span className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>
            Tap any row to view complete custody envelope
          </span>
        </div>

        {filteredRecords.length === 0 ? (
          <div style={{ padding: '48px 20px', textAlign: 'center', color: 'var(--on-surface-variant)' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '40px', color: 'var(--outline-variant)', marginBottom: '8px', display: 'block' }}>
              folder_off
            </span>
            <strong style={{ display: 'block', color: 'var(--primary)', fontSize: '15px', marginBottom: '4px' }}>
              No records match your criteria
            </strong>
            <p className="text-body-sm" style={{ margin: 0 }}>
              Try searching with another keyword, clearing your filters, or recording a new test.
            </p>

            {/* Indian Jaali Lattice Motif for Empty State */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                margin: '14px auto 0',
                width: '100%',
                maxWidth: '220px',
                opacity: 0.16,
                color: 'var(--primary)',
                pointerEvents: 'none',
              }}
              aria-hidden="true"
            >
              <svg width="200" height="20" viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="np-jaali-empty" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M10 0 L20 10 L10 20 L0 10 Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
                    <path d="M0 0 L10 10 L20 0" fill="none" stroke="currentColor" strokeWidth="0.8" />
                    <path d="M0 20 L10 10 L20 20" fill="none" stroke="currentColor" strokeWidth="0.8" />
                    <circle cx="10" cy="10" r="2.2" fill="none" stroke="currentColor" strokeWidth="0.8" />
                  </pattern>
                </defs>
                <rect width="200" height="20" fill="url(#np-jaali-empty)" />
              </svg>
            </div>

            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={() => {
                setSearchQuery('');
                setFilterType('all');
              }}
              style={{ marginTop: '14px' }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            {/* Desktop View: Clear Data Table */}
            <div className="np-table-container" style={{ display: 'none' }}>
              <table className="np-table">
                <thead>
                  <tr>
                    <th>Record ID</th>
                    <th>Date / Time</th>
                    <th>Location & Lane</th>
                    <th>Reagent Kit & Lot</th>
                    <th>Presumptive Result</th>
                    <th>Sync Status</th>
                    <th style={{ textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((rec) => (
                    <tr
                      key={rec.id}
                      onClick={() => setSelectedRecord(rec)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td className="font-code" style={{ color: 'var(--primary)', fontWeight: 700 }}>
                        {rec.id}
                      </td>
                      <td className="font-tabular text-body-sm">
                        {formatIndianTimestamp(rec.timestamp)} <span style={{ color: 'var(--on-surface-variant)' }}>({formatIndianDate(rec.date)})</span>
                      </td>
                      <td className="text-body-sm">
                        <strong>{rec.location}</strong>
                        <div style={{ color: 'var(--on-surface-variant)', fontSize: '11px' }}>{rec.subLocation}</div>
                      </td>
                      <td className="text-body-sm">
                        <div>{rec.testType}</div>
                        <div className="font-code" style={{ fontSize: '11px', color: 'var(--on-surface-variant)' }}>{rec.lotNumber}</div>
                      </td>
                      <td>
                        <StatusBadge type="result" result={rec.result} />
                      </td>
                      <td>
                        <StatusBadge type="sync" status={rec.syncStatus} />
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          type="button"
                          className="btn btn-outline btn-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRecord(rec);
                          }}
                        >
                          <span>Inspect</span>
                          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>open_in_new</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Responsive Card Stream (Mobile & Tablet) */}
            <div className="np-short-records-list">
              {filteredRecords.map((rec) => (
                <motion.div
                  key={rec.id}
                  layoutId={isMobile || shouldReduceMotion ? undefined : `records-ledger-${rec.id}`}
                  className="np-short-record-row"
                  onClick={() => setSelectedRecord(rec)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedRecord(rec);
                    }
                  }}
                  aria-label={`View record ${rec.id}`}
                  transition={transition}
                >
                  <div className="np-short-record-left">
                    <div className="np-short-record-icon">
                      <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                        biotech
                      </span>
                    </div>
                    <div className="np-short-record-info">
                      <div className="np-list-primary-line">
                        <span className="np-record-id">{rec.id}</span>
                        <span className="np-record-sep">·</span>
                        <span className="np-record-title">{rec.testType}</span>
                        {rec.chainOfCustody?.tamperBagId && (
                          <span className="np-record-tag">{rec.chainOfCustody.tamperBagId}</span>
                        )}
                      </div>
                      <div className="np-short-record-sub">
                        <span className="np-record-location">{rec.location}</span>
                        {rec.subLocation && (
                          <span className="np-record-meta">({rec.subLocation})</span>
                        )}
                        <span className="np-record-sep">·</span>
                        <span className="np-record-meta">{formatIndianTimestamp(rec.timestamp)} ({formatIndianDate(rec.date)})</span>
                        {rec.suspectIdentifier && (
                          <>
                            <span className="np-record-sep">·</span>
                            <span className="np-record-ref">{rec.suspectIdentifier}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="np-short-record-right">
                    <div className="np-short-record-badges">
                      <StatusBadge type="result" result={rec.result} />
                      <StatusBadge type="sync" status={rec.syncStatus} />
                    </div>
                    <span className="material-symbols-outlined np-record-chevron">chevron_right</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Record Inspection Modal with shared-element transition */}
      <RecordDetailModal
        record={selectedRecord}
        onClose={() => setSelectedRecord(null)}
        layoutIdPrefix="records-ledger"
      />
    </div>
  );
};
