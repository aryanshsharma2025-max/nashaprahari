import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import type { TestRecord } from '../types/testRecord';
import { StatusBadge } from '../components/common/StatusBadge';
import { RecordDetailModal } from '../components/common/RecordDetailModal';
import { useIsMobile } from '../components/common/useIsMobile';

interface EvidenceLockerPageProps {
  records: TestRecord[];
}

export const EvidenceLockerPage: React.FC<EvidenceLockerPageProps> = ({ records }) => {
  const isMobile = useIsMobile();
  const shouldReduceMotion = useReducedMotion();
  const transition = shouldReduceMotion || isMobile
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 380, damping: 34, mass: 0.8 };

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'queued' | 'dispatched'>('all');
  const [selectedRecord, setSelectedRecord] = useState<TestRecord | null>(null);

  // Evidence parcels with chain of custody
  const custodyRecords = useMemo(() => {
    return records.filter((r) => r.chainOfCustody);
  }, [records]);

  // Filtered parcels
  const filteredParcels = useMemo(() => {
    return custodyRecords.filter((rec) => {
      const dispatch = rec.chainOfCustody?.dispatchStatus.toLowerCase() || '';

      if (statusFilter === 'queued' && !dispatch.includes('vault') && !dispatch.includes('queued')) {
        return false;
      }
      if (statusFilter === 'dispatched' && !dispatch.includes('dispatch') && !dispatch.includes('transit')) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchBag = rec.chainOfCustody?.tamperBagId.toLowerCase().includes(q) || false;
        const matchCase = rec.id.toLowerCase().includes(q);
        const matchOfficer = rec.officerName.toLowerCase().includes(q);
        const matchLoc = rec.location.toLowerCase().includes(q);
        return matchBag || matchCase || matchOfficer || matchLoc;
      }

      return true;
    });
  }, [custodyRecords, searchQuery, statusFilter]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      {/* Breadcrumb Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="text-body-sm">
        <Link to="/dashboard" style={{ color: 'var(--secondary)', textDecoration: 'none', fontWeight: 500 }}>
          Home Dashboard
        </Link>
        <span style={{ color: 'var(--outline-variant)' }}>/</span>
        <span style={{ color: 'var(--on-surface-variant)' }}>Evidence Locker</span>
      </div>

      {/* Screen Title */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 className="text-headline-md" style={{ color: 'var(--primary)', margin: 0 }}>
            Evidence Locker & Custody Registry
          </h1>
          <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)', margin: '4px 0 0' }}>
            Physical evidence parcel tracking and tamper-evident seal registry (Section 50 NDPS Act)
          </p>
        </div>

        <span className="badge-demo font-tabular font-code" style={{ padding: '6px 12px', fontSize: '12px' }}>
          {custodyRecords.length} Sealed Envelopes
        </span>
      </div>

      {/* Honest Physical Protocol Notice */}
      <div style={{ padding: '14px 18px', backgroundColor: 'var(--surface-container-low)', border: '1px solid var(--border-subtle)', borderRadius: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--primary)' }}>
            verified_user
          </span>
          <strong style={{ color: 'var(--primary)', fontSize: '14px' }}>
            Chain of Custody Standard Protocol
          </strong>
          <span className="badge-demo">NDPS Procedures</span>
        </div>
        <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)', margin: 0, lineHeight: 1.5 }}>
          Sealed tamper envelopes require dual-officer endorsement prior to formal handover for confirmatory GC-MS laboratory analysis. This demonstration registry records serial bag identifiers and staging status in the field vault.
        </p>
      </div>

      {/* Search & Filter Bar */}
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
            placeholder="Search by Tamper Bag Serial (e.g. TB-0892) or Case ID..."
            style={{ paddingLeft: '40px', height: '46px', fontSize: '14px' }}
            aria-label="Search evidence registry"
          />
        </div>

        {/* Filter Pills */}
        <div className="np-filter-chip-group">
          <button
            type="button"
            className={`np-filter-chip ${statusFilter === 'all' ? 'active' : ''}`}
            onClick={() => setStatusFilter('all')}
          >
            <span>All Parcels</span>
            <span className="font-tabular font-code" style={{ fontSize: '11px', opacity: 0.85 }}>({custodyRecords.length})</span>
          </button>

          <button
            type="button"
            className={`np-filter-chip ${statusFilter === 'queued' ? 'active' : ''}`}
            onClick={() => setStatusFilter('queued')}
          >
            <span>Queued in Field Vault</span>
          </button>

          <button
            type="button"
            className={`np-filter-chip ${statusFilter === 'dispatched' ? 'active' : ''}`}
            onClick={() => setStatusFilter('dispatched')}
          >
            <span>In Transit / Dispatched</span>
          </button>
        </div>
      </div>

      {/* Parcels List */}
      <div className="np-panel">
        <div className="np-panel-header">
          <span className="text-title-sm" style={{ color: 'var(--primary)', fontWeight: 700 }}>
            Logged Tamper Envelopes ({filteredParcels.length})
          </span>
          <span className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>
            Tap parcel to inspect chain-of-custody log
          </span>
        </div>

        {filteredParcels.length === 0 ? (
          <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--on-surface-variant)' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '36px', color: 'var(--outline-variant)', display: 'block', margin: '0 auto 8px' }}>
              inventory_2
            </span>
            <strong style={{ color: 'var(--primary)', display: 'block', fontSize: '15px' }}>
              No Sealed Envelopes Found
            </strong>
            <p className="text-body-sm" style={{ margin: '4px 0 0' }}>
              No evidence parcels match your current search or filter query.
            </p>
          </div>
        ) : (
          <div className="np-short-records-list">
            {filteredParcels.map((rec) => (
              <motion.div
                key={rec.id}
                layoutId={isMobile || shouldReduceMotion ? undefined : `evidence-locker-${rec.id}`}
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
                aria-label={`View evidence parcel ${rec.chainOfCustody?.tamperBagId}, Case ${rec.id}`}
                transition={transition}
              >
                <div className="np-short-record-left">
                  <div className="np-short-record-icon" style={{ backgroundColor: '#f1f5f9', color: 'var(--primary)' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                      lock
                    </span>
                  </div>
                  <div className="np-short-record-info">
                    <div className="np-list-primary-line">
                      <span className="np-record-id">{rec.chainOfCustody?.tamperBagId}</span>
                      <span className="np-record-sep">·</span>
                      <span className="np-record-title">Case #{rec.id}</span>
                      <span className="np-record-sep">·</span>
                      <span className="np-record-meta font-tabular">Sealed {rec.chainOfCustody?.sealedAt}</span>
                    </div>
                    <div className="np-short-record-sub">
                      <span className="np-record-location">Officer: {rec.chainOfCustody?.custodyOfficer}</span>
                      <span className="np-record-sep">·</span>
                      <span className="np-record-meta">{rec.location}</span>
                    </div>
                  </div>
                </div>

                <div className="np-short-record-right">
                  <div className="np-short-record-badges">
                    <StatusBadge type="result" result={rec.result} />
                    <span className="badge badge-demo font-tabular">
                      {rec.chainOfCustody?.dispatchStatus}
                    </span>
                  </div>
                  <span className="material-symbols-outlined np-record-chevron">chevron_right</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Record Inspection Modal with shared-element transition */}
      <RecordDetailModal
        record={selectedRecord}
        onClose={() => setSelectedRecord(null)}
        layoutIdPrefix="evidence-locker"
      />
    </div>
  );
};
