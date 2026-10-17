import React, { useState } from 'react';
import type { OfficerSession, OperationalMetrics, TestRecord } from '../types/testRecord';
import { OfficerHero } from '../components/dashboard/OfficerHero';
import { MetricCards } from '../components/dashboard/MetricCards';
import { StatutoryNotice } from '../components/common/StatutoryNotice';
import { RecentRecordsTable } from '../components/dashboard/RecentRecordsTable';
import { TerminalStatusCard } from '../components/dashboard/TerminalStatusCard';
import { ProtocolsCard } from '../components/dashboard/ProtocolsCard';
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
    <>
      {/* Officer Command & Shift Bar / Mobile Hero */}
      <OfficerHero
        session={session}
        pendingSyncCount={metrics.pendingCount}
        onSync={onSync}
        isSyncing={isSyncing}
      />

      {/* Mandatory Statutory Presumptive Legal Notice */}
      <StatutoryNotice icon="biotech" />

      {/* 4 Summary Operational Metric Cards */}
      <MetricCards metrics={metrics} />

      {/* Two-Column Responsive Content Grid (8 cols records, 4 cols widgets) */}
      <div className="np-dashboard-body">
        {/* Left Column: Recent Records (Table on Desktop, Cards on Mobile) */}
        <div>
          <RecentRecordsTable
            records={records}
            onViewRecord={(rec) => setSelectedRecord(rec)}
          />
        </div>

        {/* Right Column: Terminal Status & Field SOP Protocols */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <TerminalStatusCard
            session={session}
            pendingSyncCount={metrics.pendingCount}
          />
          <ProtocolsCard />
        </div>
      </div>

      {/* Sub-Footer Utilitarian Metadata */}
      <footer
        style={{
          marginTop: '16px',
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
          <span>Demonstration Environment — Sample Operational Records Only</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="font-code">
          <span>Terminal Session: {session.terminalSessionId}</span>
          <span style={{ color: 'var(--outline-variant)' }}>|</span>
          <span>Version: {session.appVersion}</span>
        </div>
      </footer>

      {/* Record Inspection Modal */}
      <RecordDetailModal
        record={selectedRecord}
        onClose={() => setSelectedRecord(null)}
      />
    </>
  );
};
