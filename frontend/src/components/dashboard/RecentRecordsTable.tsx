import React, { useState, useMemo } from 'react';
import type { TestRecord } from '../../types/testRecord';
import { StatusBadge } from '../common/StatusBadge';
import { formatIndianDate, formatIndianTimestamp } from '../../utils/formatters';

interface RecentRecordsTableProps {
  records: TestRecord[];
  onViewRecord: (record: TestRecord) => void;
}

const ITEMS_PER_PAGE = 5;

export const RecentRecordsTable: React.FC<RecentRecordsTableProps> = ({
  records,
  onViewRecord,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterResult, setFilterResult] = useState<'all' | 'presumptive_positive' | 'presumptive_negative' | 'inconclusive'>('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter and search logic
  const filteredRecords = useMemo(() => {
    return records.filter((rec) => {
      // Result filter
      if (filterResult !== 'all' && rec.result !== filterResult) {
        return false;
      }
      // Text search
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesId = rec.id.toLowerCase().includes(query);
        const matchesLoc = rec.location.toLowerCase().includes(query) || rec.subLocation.toLowerCase().includes(query);
        const matchesLot = rec.lotNumber.toLowerCase().includes(query);
        const matchesKit = rec.testType.toLowerCase().includes(query);
        return matchesId || matchesLoc || matchesLot || matchesKit;
      }
      return true;
    });
  }, [records, searchQuery, filterResult]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / ITEMS_PER_PAGE));
  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredRecords.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredRecords, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="np-panel">
      {/* Header & Filter Bar */}
      <div className="np-panel-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h2 className="text-title-md" style={{ color: 'var(--on-surface)' }}>
            Recent Records
          </h2>
          <span className="badge-demo font-tabular">Records ({filteredRecords.length})</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', flex: 1, justifyContent: 'flex-end' }}>
          {/* Search Input */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '240px' }}>
            <span
              className="material-symbols-outlined"
              style={{
                position: 'absolute',
                left: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '18px',
                color: 'var(--on-surface-variant)',
              }}
            >
              search
            </span>
            <input
              type="text"
              className="np-search-input"
              placeholder="Search by record ID, lot..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              aria-label="Search records"
            />
          </div>

          {/* Filter Dropdown */}
          <select
            className="np-select"
            value={filterResult}
            onChange={(e) => {
              setFilterResult(e.target.value as 'all' | 'presumptive_positive' | 'presumptive_negative' | 'inconclusive');
              setCurrentPage(1);
            }}
            aria-label="Filter by result"
          >
            <option value="all">All Results ({records.length})</option>
            <option value="presumptive_positive">Presumptive Positive</option>
            <option value="presumptive_negative">Presumptive Negative</option>
            <option value="inconclusive">Inconclusive</option>
          </select>
        </div>
      </div>

      {/* =========================================================================
          DESKTOP DATA TABLE (Visible on >= 768px / screens with room)
          ========================================================================= */}
      <div className="np-table-container" style={{ display: 'none' }} id="np-desktop-table-wrapper">
        <table className="np-table" aria-label="Field Test Records Table">
          <thead>
            <tr>
              <th>Record ID</th>
              <th>Timestamp</th>
              <th>Location</th>
              <th>Test Type & Reagent</th>
              <th>Presumptive Result</th>
              <th>Sync Status</th>
              <th style={{ textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRecords.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '32px', color: 'var(--on-surface-variant)' }}>
                  No matching records found.
                </td>
              </tr>
            ) : (
              paginatedRecords.map((rec) => (
                <tr key={rec.id}>
                  <td className="font-code" style={{ color: 'var(--primary)', fontWeight: 700 }}>
                    {rec.id}
                  </td>
                  <td className="font-tabular text-body-sm" style={{ color: 'var(--on-surface-variant)', whiteSpace: 'nowrap' }}>
                    <div>{formatIndianTimestamp(rec.timestamp)}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{formatIndianDate(rec.date)}</div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span className="text-body-sm" style={{ fontWeight: 500, color: 'var(--on-surface)' }}>
                        {rec.location}
                      </span>
                      <span className="text-label-sm" style={{ color: 'var(--on-surface-variant)' }}>
                        {rec.subLocation}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span className="text-body-sm" style={{ fontWeight: 500, color: 'var(--on-surface)' }}>
                        {rec.testType}
                      </span>
                      <span className="font-code text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>
                        {rec.lotNumber}
                      </span>
                    </div>
                  </td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    <StatusBadge type="result" result={rec.result} />
                  </td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    <StatusBadge type="sync" status={rec.syncStatus} />
                  </td>
                  <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                    <button
                      type="button"
                      className="btn btn-outline btn-sm font-tabular"
                      onClick={() => onViewRecord(rec)}
                      style={{ color: 'var(--primary)' }}
                    >
                      <span>View Details</span>
                      <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>chevron_right</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* =========================================================================
          MOBILE RECORD CARDS (Visible on mobile screens)
          ========================================================================= */}
      <div id="np-mobile-card-list" style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '12px' }}>
        {paginatedRecords.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '24px', color: 'var(--on-surface-variant)' }}>
            No matching records found.
          </div>
        ) : (
          paginatedRecords.map((rec) => (
            <article key={rec.id} className="np-record-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span className="font-code text-title-sm" style={{ color: 'var(--primary)' }}>{rec.id}</span>
                  <span className="text-body-sm font-tabular" style={{ color: 'var(--on-surface-variant)' }}>· {formatIndianTimestamp(rec.timestamp)} ({formatIndianDate(rec.date)})</span>
                </div>
                <StatusBadge type="sync" status={rec.syncStatus} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', color: 'var(--on-surface-variant)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} className="text-body-sm">
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>location_on</span>
                  <span style={{ color: 'var(--on-surface)', fontWeight: 500 }}>{rec.location} · {rec.subLocation}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} className="text-body-sm">
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>science</span>
                  <span>{rec.testType} · {rec.lotNumber}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '6px', borderTop: '1px solid var(--border-subtle)', marginTop: '4px' }}>
                <StatusBadge type="result" result={rec.result} />
                <button
                  type="button"
                  className="btn btn-outline btn-sm font-tabular"
                  onClick={() => onViewRecord(rec)}
                  style={{ minHeight: '36px' }}
                >
                  <span>View Details</span>
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
                </button>
              </div>
            </article>
          ))
        )}
      </div>

      <style>{`
        @media (min-width: 768px) {
          #np-desktop-table-wrapper {
            display: block !important;
          }
          #np-mobile-card-list {
            display: none !important;
          }
        }
      `}</style>

      {/* Table Footer & Pagination */}
      <div
        style={{
          padding: '12px 16px',
          backgroundColor: 'var(--surface-container-low)',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px',
        }}
        className="text-body-sm font-tabular"
      >
        <span style={{ color: 'var(--on-surface-variant)' }}>
          Showing {paginatedRecords.length} of {filteredRecords.length} records (Page {currentPage} of {totalPages})
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              type="button"
              className={`btn btn-sm ${currentPage === page ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => handlePageChange(page)}
              style={{ minWidth: '32px', padding: '4px 8px' }}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
