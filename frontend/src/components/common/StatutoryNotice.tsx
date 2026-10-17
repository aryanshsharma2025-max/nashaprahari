import React from 'react';

interface StatutoryNoticeProps {
  icon?: string;
}

export const StatutoryNotice: React.FC<StatutoryNoticeProps> = ({ icon = 'biotech' }) => {
  return (
    <div className="np-notice-banner" role="alert">
      <div className="np-notice-icon">
        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
          {icon}
        </span>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
          <span className="text-label-md" style={{ color: 'var(--primary)', fontWeight: 700 }}>
            Statutory Field Notice
          </span>
          <span className="badge-demo">
            Demonstration Data
          </span>
        </div>
        <p className="text-body-md" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.5 }}>
          Field-test outputs are <strong>presumptive screening only</strong>. Confirmatory laboratory analysis (GC-MS / HPLC) is required for formal legal proceedings. (Sample demonstration records)
        </p>
      </div>
    </div>
  );
};
