import React from 'react';
import { Link } from 'react-router-dom';
import type { TestRecord } from '../../types/testRecord';
import { StatusBadge } from '../common/StatusBadge';

interface RecentRecordsShortListProps {
  records: TestRecord[];
  onViewRecord: (record: TestRecord) => void;
  maxItems?: number;
}

export const RecentRecordsShortList: React.FC<RecentRecordsShortListProps> = ({
  records,
  onViewRecord,
  maxItems = 4,
}) => {
  const recentRecords = records.slice(0, maxItems);

  return (
    <section className="np-panel" aria-label="Recent Field Screenings">
      <div className="np-panel-header" style={{ padding: '14px 18px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 className="text-title-md" style={{ color: 'var(--on-surface)' }}>
              Recent Field Tests
            </h2>
            <span className="badge-demo font-tabular">Latest {recentRecords.length} of {records.length}</span>
          </div>
          <span className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>
            Presumptive test records · Tap any record for chain-of-custody details
          </span>
        </div>

        <Link to="/records" className="btn btn-outline btn-sm font-tabular">
          <span>View All Records ({records.length})</span>
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
            arrow_forward
          </span>
        </Link>
      </div>

      <div className="np-short-records-list" role="list">
        {recentRecords.length === 0 ? (
          <div style={{ padding: '32px 16px', textAlign: 'center' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '36px', color: 'var(--outline-variant)' }}>
              inbox
            </span>
            <p className="text-body-md" style={{ color: 'var(--on-surface-variant)', marginTop: '8px' }}>
              No field test records logged yet for this shift.
            </p>
            <Link to="/new-test" className="btn btn-primary btn-sm" style={{ marginTop: '12px' }}>
              + Start First Test
            </Link>
          </div>
        ) : (
          recentRecords.map((record) => (
            <div
              key={record.id}
              className="np-short-record-row"
              role="listitem"
              tabIndex={0}
              onClick={() => onViewRecord(record)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onViewRecord(record);
                }
              }}
              aria-label={`View record ${record.id}, ${record.testType}, ${record.result}`}
            >
              <div className="np-short-record-left">
                <div className="np-short-record-icon" aria-hidden="true">
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                    science
                  </span>
                </div>
                <div className="np-short-record-info">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span className="font-code text-title-sm np-record-id">
                      {record.id}
                    </span>
                    <span className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>
                      {record.timestamp}
                    </span>
                  </div>
                  <div className="text-body-sm" style={{ color: 'var(--primary)', fontWeight: 500, marginTop: '2px' }}>
                    {record.testType}
                  </div>
                  <div className="text-body-sm np-short-record-sub">
                    <span className="material-symbols-outlined" style={{ fontSize: '14px', color: 'var(--outline)' }}>
                      location_on
                    </span>
                    <span className="truncate">{record.location}</span>
                    {record.suspectIdentifier && (
                      <>
                        <span style={{ color: 'var(--outline-variant)' }}>·</span>
                        <span className="truncate">{record.suspectIdentifier}</span>
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
            </div>
          ))
        )}
      </div>

      <div
        style={{
          padding: '10px 18px',
          backgroundColor: 'var(--surface-container-low)',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px',
        }}
        className="text-body-sm"
      >
        <span style={{ color: 'var(--on-surface-variant)' }}>
          Showing 4 latest records. Filter and complete history available in ledger.
        </span>
        <Link to="/records" style={{ color: 'var(--secondary)', textDecoration: 'none', fontWeight: 600 }}>
          Open Full Records Ledger →
        </Link>
      </div>
    </section>
  );
};
