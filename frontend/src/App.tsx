import { useState, useMemo } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import type { OfficerSession, OperationalMetrics, TestRecord } from './types/testRecord';
import { MOCK_TEST_RECORDS } from './data/mockData';
import { AppShell } from './components/layout/AppShell';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { NewTestPage } from './pages/NewTestPage';
import { RecordsHistoryPage } from './pages/RecordsHistoryPage';
import { SyncQueuePage } from './pages/SyncQueuePage';
import { EvidenceLockerPage } from './pages/EvidenceLockerPage';
import { HelpProtocolsPage } from './pages/HelpProtocolsPage';
import './App.css';

export function App() {
  const [records, setRecords] = useState<TestRecord[]>(MOCK_TEST_RECORDS);

  // Officer Session State: Defaults to null (requiring login), or loads persisted session
  const [session, setSession] = useState<OfficerSession | null>(() => {
    try {
      const stored = sessionStorage.getItem('np_officer_session');
      if (stored) {
        return JSON.parse(stored) as OfficerSession;
      }
    } catch (e) {
      console.warn('Failed to parse officer session from sessionStorage', e);
    }
    return null;
  });

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

  // Session Login Handler
  const handleLogin = (newSession: OfficerSession) => {
    setSession(newSession);
    try {
      sessionStorage.setItem('np_officer_session', JSON.stringify(newSession));
    } catch (e) {
      console.warn('Failed to persist session to sessionStorage', e);
    }
    setSyncNotification(`Terminal session active: ${newSession.officerName} (${newSession.officerBadge})`);
  };

  // Session Logout Handler
  const handleLogout = () => {
    setSession(null);
    try {
      sessionStorage.removeItem('np_officer_session');
    } catch (e) {
      console.warn('Failed to clear session from sessionStorage', e);
    }
    setSyncNotification('Officer session ended successfully.');
  };

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
        `${countToSync} pending record${countToSync > 1 ? 's' : ''} successfully synchronized with field records ledger.`
      );
    }, 900);
  };

  // Add new field test record
  const handleAddRecord = (newRecord: TestRecord) => {
    setRecords((prev) => [newRecord, ...prev]);
    setSyncNotification(`Record ${newRecord.id} saved to local queue (Awaiting sync).`);
  };

  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
      <Routes>
        {/* Public Entry Routes */}
        <Route path="/" element={<LandingPage session={session} />} />
        <Route
          path="/login"
          element={
            <LoginPage
              session={session}
              onLogin={handleLogin}
              onLogout={handleLogout}
            />
          }
        />

        {/* Protected Officer Application Routes */}
        <Route
          element={
            <ProtectedRoute session={session}>
              {session ? (
                <AppShell
                  session={session}
                  pendingSyncCount={metrics.pendingCount}
                  onSync={handleSync}
                  isSyncing={isSyncing}
                  syncNotification={syncNotification}
                  onDismissNotification={() => setSyncNotification(null)}
                  onLogout={handleLogout}
                />
              ) : (
                <Navigate to="/login" replace />
              )}
            </ProtectedRoute>
          }
        >
          <Route
            path="dashboard"
            element={
              <DashboardPage
                session={session!}
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
                session={session!}
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
        </Route>

        {/* Fallback Catch-all Route */}
        <Route
          path="*"
          element={
            session ? <Navigate to="/dashboard" replace /> : <Navigate to="/" replace />
          }
        />
      </Routes>
    </BrowserRouter>
  </MotionConfig>
  );
}

export default App;
