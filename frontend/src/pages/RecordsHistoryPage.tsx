import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { TestRecord } from '../types/testRecord';
import { RecentRecordsTable } from '../components/dashboard/RecentRecordsTable';
import { StatutoryNotice } from '../components/common/StatutoryNotice';
import { RecordDetailModal } from '../components/common/RecordDetailModal';

interface RecordsHistoryPageProps {
  records: TestRecord[];
}

export const RecordsHistoryPage: React.FC<RecordsHistoryPageProps> = ({ records }) => {
  const [selectedRecord, setSelectedRecord] = useState<TestRecord | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="text-body-sm">
        <Link to="/" style={{ color: 'var(--secondary)', textDecoration: 'none' }}>Dashboard</Link>
        <span style={{ color: 'var(--outline-variant)' }}>/</span>
        <span style={{ color: 'var(--on-surface-variant)' }}>Test Records & History</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 className="text-headline-md" style={{ color: 'var(--primary)' }}>
            Test Records & History
          </h1>
          <span className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>
            Chronological field screening logs and evidence dispatch ledger
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span className="badge-demo font-tabular">{records.length} Total Records</span>
          <Link to="/new-test" className="btn btn-primary btn-sm">
            + New Test
          </Link>
        </div>
      </div>

      <StatutoryNotice />

      <RecentRecordsTable
        records={records}
        onViewRecord={(rec) => setSelectedRecord(rec)}
      />

      <RecordDetailModal
        record={selectedRecord}
        onClose={() => setSelectedRecord(null)}
      />
    </div>
  );
};
