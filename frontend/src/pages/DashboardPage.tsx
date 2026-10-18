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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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

      {/* 4. Short Recent-Records List */}
      <RecentRecordsShortList
        records={records}
        onViewRecord={(rec) => setSelectedRecord(rec)}
        maxItems={4}
      />

      {/* 5. Minimal Sub-Footer Session Disclaimers */}
      <footer
        style={{
          marginTop: '8px',
          paddingTop: '16px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          color: 'var(--on-surface-variant)',
        }}
        className="text-body-sm"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--outline)' }}></span>
          <span>Field Demonstration Environment — Sample Records Only (SIH 2026)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="font-code">
          <span>Terminal: {session.terminalSessionId}</span>
          <span style={{ color: 'var(--outline-variant)' }}>|</span>
          <span>App: v{session.appVersion}</span>
        </div>
      </footer>

      {/* Record Inspection Modal */}
      <RecordDetailModal
        record={selectedRecord}
        onClose={() => setSelectedRecord(null)}
      />
    </div>
  );
};

