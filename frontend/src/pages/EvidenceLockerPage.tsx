import React from 'react';
import { Link } from 'react-router-dom';
import type { TestRecord } from '../types/testRecord';

interface EvidenceLockerPageProps {
  records: TestRecord[];
}

export const EvidenceLockerPage: React.FC<EvidenceLockerPageProps> = ({ records }) => {
  const custodyRecords = records.filter((r) => r.chainOfCustody);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="text-body-sm">
        <Link to="/" style={{ color: 'var(--secondary)', textDecoration: 'none' }}>Dashboard</Link>
        <span style={{ color: 'var(--outline-variant)' }}>/</span>
        <span style={{ color: 'var(--on-surface-variant)' }}>Evidence Locker</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 className="text-headline-md" style={{ color: 'var(--primary)' }}>
            Evidence Locker & Chain of Custody
          </h1>
          <span className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>
            Tamper-proof physical evidence bag registry & dispatch status
          </span>
        </div>
        <span className="badge-demo font-tabular">{custodyRecords.length} Sealed Parcels</span>
      </div>

      {/* Honest Scope Limit Notice */}
      <div style={{ padding: '12px 16px', background: 'var(--surface-container-low)', border: '1px solid var(--border-subtle)', borderRadius: '6px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--primary)' }}>verified_user</span>
          <span className="text-title-sm" style={{ color: 'var(--primary)' }}>Chain of Custody Protocol (Demonstration Registry)</span>
        </div>
        <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.5 }}>
          Sealed tamper bags require dual-officer endorsement before laboratory handover under NDPS compliance. In Phase 1, parcel identifiers are stored in the local operational log. Smart biometric vault and laboratory dispatch manifests are scheduled for subsequent phases.
        </p>
      </div>

      <div className="np-panel">
        <div className="np-panel-header">
          <h2 className="text-title-md">Logged Tamper Envelopes</h2>
          <span className="badge-demo">Shift Custody Ledger</span>
        </div>
        <div className="np-table-container">
          <table className="np-table">
            <thead>
              <tr>
                <th>Tamper Bag ID</th>
                <th>Test Case ID</th>
                <th>Sealed At</th>
                <th>Presumptive Result</th>
                <th>Vault Status</th>
                <th>Custody Officer</th>
              </tr>
            </thead>
            <tbody>
              {custodyRecords.map((r) => (
                <tr key={r.id}>
                  <td className="font-code" style={{ color: 'var(--primary)', fontWeight: 700 }}>
                    {r.chainOfCustody?.tamperBagId}
                  </td>
                  <td className="font-code text-body-sm">{r.id}</td>
                  <td className="font-tabular text-body-sm">{r.chainOfCustody?.sealedAt}</td>
                  <td>
                    <span className="text-body-sm font-code" style={{ fontWeight: 600 }}>
                      {r.result === 'presumptive_positive' ? 'Presumptive Positive' : 'Presumptive Negative'}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-synced font-tabular">{r.chainOfCustody?.dispatchStatus}</span>
                  </td>
                  <td className="text-body-sm">{r.chainOfCustody?.custodyOfficer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
