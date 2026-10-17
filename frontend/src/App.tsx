import { useState, useMemo } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import type { OfficerSession, OperationalMetrics, TestRecord } from './types/testRecord';
import { MOCK_OFFICER_SESSION, MOCK_TEST_RECORDS } from './data/mockData';
import { AppShell } from './components/layout/AppShell';
import { DashboardPage } from './pages/DashboardPage';
import { NewTestPage } from './pages/NewTestPage';
import { RecordsHistoryPage } from './pages/RecordsHistoryPage';
import { SyncQueuePage } from './pages/SyncQueuePage';
import { EvidenceLockerPage } from './pages/EvidenceLockerPage';
import { HelpProtocolsPage } from './pages/HelpProtocolsPage';
import './App.css';

export function App() {
  const [records, setRecords] = useState<TestRecord[]>(MOCK_TEST_RECORDS);
  const [session] = useState<OfficerSession>(MOCK_OFFICER_SESSION);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncNotification, setSyncNotification] = useState<string | null>(null);

  // Compute operational metrics dynamically based on records in state
  const metrics: OperationalMetrics = useMemo(() => {
    const total = records.length;
    const synced = records.filter((r) => r.syncStatus === 'synced').length;
    const pending = records.filter((r) => r.syncStatus === 'pending').length;
    // Available kits decrement with new tests logged beyond baseline
    const available = Math.max(0, 18 - Math.max(0, records.length - 14));
    return {
      todayTestsLogged: total,
      syncedCount: synced,
      pendingCount: pending,
      availableKits: available,
      activeLot: 'Lot #NP-9042',
    };
  }, [records]);

  // Meaningful manual sync action with transparent simulation feedback
  const handleSync = () => {
    if (isSyncing || metrics.pendingCount === 0) return;

    setIsSyncing(true);
    const countToSync = metrics.pendingCount;

    setTimeout(() => {
      setRecords((prev) =>
        prev.map((r) => ({
          ...r,
          syncStatus: 'synced' as const,
        }))
      );
      setIsSyncing(false);
      setSyncNotification(
        `Simulation: ${countToSync} pending record${countToSync > 1 ? 's' : ''} synchronized with local demonstration ledger.`
      );
    }, 900);
  };

  // Add new field test record
  const handleAddRecord = (newRecord: TestRecord) => {
    setRecords((prev) => [newRecord, ...prev]);
    setSyncNotification(`Record ${newRecord.id} saved to local queue (Awaiting sync).`);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <AppShell
              session={session}
              pendingSyncCount={metrics.pendingCount}
              onSync={handleSync}
              isSyncing={isSyncing}
              syncNotification={syncNotification}
              onDismissNotification={() => setSyncNotification(null)}
            />
          }
        >
          <Route
            index
            element={
              <DashboardPage
                session={session}
                metrics={metrics}
                records={records}
                onSync={handleSync}
                isSyncing={isSyncing}
              />
            }
          />
          <Route
            path="new-test"
            element={
              <NewTestPage
                session={session}
                onAddRecord={handleAddRecord}
              />
            }
          />
          <Route
            path="records"
            element={<RecordsHistoryPage records={records} />}
          />
          <Route
            path="sync-queue"
            element={
              <SyncQueuePage
                records={records}
                onSync={handleSync}
                isSyncing={isSyncing}
              />
            }
          />
          <Route
            path="evidence-locker"
            element={<EvidenceLockerPage records={records} />}
          />
          <Route
            path="help-protocols"
            element={<HelpProtocolsPage />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
