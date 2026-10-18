import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import type { TestRecord } from '../../types/testRecord';
import { StatusBadge } from '../common/StatusBadge';
import { useIsMobile } from '../common/useIsMobile';

interface RecentRecordsShortListProps {
  records: TestRecord[];
  onViewRecord: (record: TestRecord) => void;
  maxItems?: number;
  layoutIdPrefix?: string;
}

export const RecentRecordsShortList: React.FC<RecentRecordsShortListProps> = ({
  records,
  onViewRecord,
  maxItems = 4,
  layoutIdPrefix = 'dashboard-record',
}) => {
  const isMobile = useIsMobile();
  const recentRecords = records.slice(0, maxItems);
  const shouldReduceMotion = useReducedMotion();

  const transition = shouldReduceMotion || isMobile
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 380, damping: 34, mass: 0.8 };

  return (
    <section className="np-panel" aria-label="Recent Field Tests">
      <div className="np-panel-header" style={{ padding: '12px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h2 className="text-title-sm" style={{ color: 'var(--primary)', fontWeight: 700, margin: 0 }}>
            Recent Field Tests
          </h2>
          <span className="badge-demo font-tabular" style={{ fontSize: '11px' }}>
            Latest {recentRecords.length}
          </span>
        </div>

        <Link
          to="/records"
          className="btn btn-outline btn-sm font-tabular"
          style={{ height: '32px', minHeight: '32px', padding: '4px 10px', fontSize: '12px' }}
        >
          <span>View All ({records.length})</span>
          <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>
            arrow_forward
          </span>
        </Link>
      </div>

      <div className="np-short-records-list" role="list">
        {recentRecords.length === 0 ? (
          <div style={{ padding: '28px 16px', textAlign: 'center' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '32px', color: 'var(--outline-variant)' }}>
              inbox
            </span>
            <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)', margin: '6px 0 10px' }}>
              No field tests recorded yet for this operational shift.
            </p>
            <Link to="/new-test" className="btn btn-primary btn-sm">
              Start First Field Test
            </Link>
          </div>
        ) : (
          recentRecords.map((record) => (
            <motion.div
              key={record.id}
              layoutId={isMobile || shouldReduceMotion ? undefined : `${layoutIdPrefix}-${record.id}`}
              className="np-short-record-row"
              role="button"
              tabIndex={0}
              onClick={() => onViewRecord(record)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onViewRecord(record);
                }
              }}
              aria-label={`View record ${record.id}, ${record.testType}, ${record.result}`}
              transition={transition}
            >
              <div className="np-short-record-left">
                <div className="np-short-record-icon" aria-hidden="true">
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                    science
                  </span>
                </div>
                <div className="np-short-record-info">
                  <div className="np-list-primary-line">
                    <span className="np-record-id">{record.id}</span>
                    <span className="np-record-sep">·</span>
                    <span className="np-record-title">{record.testType}</span>
                    {record.chainOfCustody?.tamperBagId && (
                      <span className="np-record-tag">{record.chainOfCustody.tamperBagId}</span>
                    )}
                  </div>
                  <div className="np-short-record-sub">
                    <span className="np-record-location">{record.location}</span>
                    <span className="np-record-sep">·</span>
                    <span className="np-record-meta">{record.timestamp}</span>
                    {record.suspectIdentifier && (
                      <>
                        <span className="np-record-sep">·</span>
                        <span className="np-record-ref">{record.suspectIdentifier}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="np-short-record-right">
                <div className="np-short-record-badges">
                  <StatusBadge type="result" result={record.result} />
                  <StatusBadge type="sync" status={record.syncStatus} />
                </div>
                <span className="material-symbols-outlined np-record-chevron" aria-hidden="true">
                  chevron_right
                </span>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </section>
  );
};
