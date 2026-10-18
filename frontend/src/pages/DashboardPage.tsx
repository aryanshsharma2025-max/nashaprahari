import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import type { OfficerSession, OperationalMetrics, TestRecord } from '../types/testRecord';
import { OfficerStatusHeader } from '../components/dashboard/OfficerStatusHeader';
import { HomeActionCards } from '../components/dashboard/HomeActionCards';
import { RecentRecordsShortList } from '../components/dashboard/RecentRecordsShortList';
import { RecordDetailModal } from '../components/common/RecordDetailModal';
import { GeometricChakra } from '../components/common/GeometricChakra';

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
  const shouldReduceMotion = useReducedMotion();

  // Short, restrained staggered entrance for dashboard operational sections
  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.06,
        delayChildren: shouldReduceMotion ? 0 : 0.02,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.22, ease: 'easeOut' as const },
    },
  };

  return (
    <div className="np-dashboard-page-root">
      {/* Large faint India-inspired geometric watermark positioned behind dashboard content */}
      <div className="np-dashboard-watermark-wrap" aria-hidden="true">
        <GeometricChakra size="100%" color="var(--primary)" />
      </div>

      <motion.div
        className="np-dashboard-content-layer"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 1. Officer Context & Essential Connectivity */}
        <motion.div variants={itemVariants}>
          <OfficerStatusHeader
            session={session}
            pendingSyncCount={metrics.pendingCount}
            onSync={onSync}
            isSyncing={isSyncing}
          />
        </motion.div>

        {/* 2. Four Main Duty Actions (Dominant New Field Test + 3 Utility Tiles) */}
        <motion.div variants={itemVariants}>
          <HomeActionCards
            pendingSyncCount={metrics.pendingCount}
            totalRecordsCount={records.length}
          />
        </motion.div>

        {/* 3. Short Recent-Records List */}
        <motion.div variants={itemVariants}>
          <RecentRecordsShortList
            records={records}
            onViewRecord={(rec) => setSelectedRecord(rec)}
            maxItems={4}
            layoutIdPrefix="dashboard-record"
          />
        </motion.div>

        {/* 4. Minimal Sub-Footer Session Disclaimers */}
        <motion.footer
          variants={itemVariants}
          className="np-dashboard-footer"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: 'var(--outline)',
              }}
            />
            <span>Field Operations Terminal · Local Storage Active</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} className="font-code">
            <span>Terminal: {session.terminalSessionId}</span>
          </div>
        </motion.footer>
      </motion.div>

      {/* Record Inspection Modal with shared element animation */}
      <RecordDetailModal
        record={selectedRecord}
        onClose={() => setSelectedRecord(null)}
        layoutIdPrefix="dashboard-record"
      />
    </div>
  );
};
