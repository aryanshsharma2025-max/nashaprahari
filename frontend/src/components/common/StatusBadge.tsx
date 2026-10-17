import React from 'react';
import type { PresumptiveResult, SyncStatus } from '../../types/testRecord';

interface StatusBadgeProps {
  type: 'result' | 'sync';
  result?: PresumptiveResult;
  status?: SyncStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ type, result, status }) => {
  if (type === 'result') {
    switch (result) {
      case 'presumptive_positive':
        return (
          <span className="badge badge-positive">
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>
              warning
            </span>
            <span>Presumptive Positive</span>
          </span>
        );
      case 'presumptive_negative':
        return (
          <span className="badge badge-negative">
            <span className="material-symbols-outlined" style={{ fontSize: '14px', color: 'var(--secondary)' }}>
              check_circle
            </span>
            <span>Presumptive Negative</span>
          </span>
        );
      case 'inconclusive':
      default:
        return (
          <span className="badge badge-inconclusive">
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>
              help
            </span>
            <span>Retest Required (Inconclusive)</span>
          </span>
        );
    }
  }

  // Sync status
  if (status === 'synced') {
    return (
      <span className="badge badge-synced font-tabular">
        <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>
          done
        </span>
        <span>Synced</span>
      </span>
    );
  }

  return (
    <span className="badge badge-pending font-tabular">
      <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>
        hourglass_empty
      </span>
      <span>Awaiting Sync</span>
    </span>
  );
};
