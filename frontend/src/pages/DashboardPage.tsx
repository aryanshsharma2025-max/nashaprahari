import React, { useState } from 'react';
import type { OfficerSession, OperationalMetrics, TestRecord } from '../types/testRecord';
import { OfficerStatusHeader } from '../components/dashboard/OfficerStatusHeader';
import { HomeActionCards } from '../components/dashboard/HomeActionCards';
import { RecentRecordsShortList } from '../components/dashboard/RecentRecordsShortList';
import { RecordDetailModal } from '../components/common/RecordDetailModal';

interface DashboardPageProps {
  session: OfficerSession;
  metrics: OperationalMetrics;
  records: TestRecord[];
  onSync: () => void;
  isSyncing: boolean;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  session,
  metrics,
  records,
  onSync,
  isSyncing,
}) => {
  const [selectedRecord, setSelectedRecord] = useState<TestRecord | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* 1. Officer Context & Essential Connectivity */}
      <OfficerStatusHeader
        session={session}
        pendingSyncCount={metrics.pendingCount}
        onSync={onSync}
        isSyncing={isSyncing}
      />

      {/* 2. Four Main Duty Actions (Dominant New Field Test + 3 Utility Tiles) */}
      <HomeActionCards
        pendingSyncCount={metrics.pendingCount}
        totalRecordsCount={records.length}
      />

      {/* 3. Short Recent-Records List */}
      <RecentRecordsShortList
        records={records}
        onViewRecord={(rec) => setSelectedRecord(rec)}
        maxItems={4}
        layoutIdPrefix="dashboard-record"
      />

      {/* 4. Minimal Sub-Footer Session Disclaimers */}
      <footer
        style={{
          marginTop: '4px',
          paddingTop: '12px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px',
          color: 'var(--on-surface-variant)',
          fontSize: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--outline)' }}></span>
          <span>Field Evaluation Prototype (SIH 2026) · Local Storage Active</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} className="font-code">
          <span>Terminal: {session.terminalSessionId}</span>
        </div>
      </footer>

      {/* Record Inspection Modal with shared element animation */}
      <RecordDetailModal
        record={selectedRecord}
        onClose={() => setSelectedRecord(null)}
        layoutIdPrefix="dashboard-record"
      />
    </div>
  );
};
