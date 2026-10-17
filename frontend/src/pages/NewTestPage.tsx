import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import type { OfficerSession, TestRecord } from '../types/testRecord';
import { StatutoryNotice } from '../components/common/StatutoryNotice';

interface NewTestPageProps {
  session: OfficerSession;
  onAddRecord: (record: TestRecord) => void;
}

export const NewTestPage: React.FC<NewTestPageProps> = ({ session, onAddRecord }) => {
  const navigate = useNavigate();

  const [location, setLocation] = useState(session.location);
  const [subLocation, setSubLocation] = useState('Checkpoint Alpha');
  const [testType, setTestType] = useState('Narcotics Kit A');
  const [lotNumber, setLotNumber] = useState('Lot #NP-9042');
  const [suspectIdentifier, setSuspectIdentifier] = useState('');
  const [notes, setNotes] = useState('');
  const [simulatedResult, setSimulatedResult] = useState<'presumptive_positive' | 'presumptive_negative' | 'inconclusive'>('presumptive_positive');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newId = `NP-2025-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} IST`;

    const newRecord: TestRecord = {
      id: newId,
      timestamp: timeStr,
      date: '2026-10-17',
      location: location || 'Field Checkpoint',
      subLocation: subLocation || 'Main Lane',
      testType,
      lotNumber,
      result: simulatedResult,
      syncStatus: 'pending',
      officerName: session.officerName,
      officerBadge: session.officerBadge,
      suspectIdentifier: suspectIdentifier || 'Unspecified Specimen Reference',
      reagentColorObserved:
        simulatedResult === 'presumptive_positive'
          ? 'Cobalt Blue / Purple precipitate (30-45 sec)'
          : simulatedResult === 'presumptive_negative'
          ? 'No color change (clear baseline)'
          : 'Ambiguous reaction color',
      notes: notes || 'Logged during field patrol.',
      chainOfCustody: {
        tamperBagId: `TB-${newId.replace('NP-', '')}`,
        sealedAt: timeStr,
        dispatchStatus: 'Queued in Field Vault',
        custodyOfficer: session.officerName,
      },
    };

    onAddRecord(newRecord);
    navigate('/');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Breadcrumb Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="text-body-sm">
        <Link to="/" style={{ color: 'var(--secondary)', textDecoration: 'none' }}>Dashboard</Link>
        <span style={{ color: 'var(--outline-variant)' }}>/</span>
        <span style={{ color: 'var(--on-surface-variant)' }}>New Field Test Workflow</span>
      </div>

      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 className="text-headline-md" style={{ color: 'var(--primary)' }}>
            Start New Field Test
          </h1>
          <span className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>
            Step 1 of 5: Case & Officer Details (Phase 1 Baseline)
          </span>
        </div>
        <span className="badge-demo">Step 1 of 5</span>
      </div>

      {/* Mandatory Statutory Notice */}
      <StatutoryNotice />

      {/* Honest Phase 1 Scope Boundary Notice */}
      <div style={{ padding: '12px 16px', background: 'var(--surface-container-low)', border: '1px solid var(--border-subtle)', borderRadius: '6px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--secondary)' }}>info</span>
          <span className="text-title-sm" style={{ color: 'var(--primary)' }}>Phase 1 Foundation Scope & Limits</span>
        </div>
        <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)', lineHeight: 1.5 }}>
          In this Phase 1 prototype, Step 1 captures case details into the offline session queue. Steps 2–5 (Camera optical colorimetric analyzer, suspect biometrics, and cryptographic evidence signing) are scheduled for subsequent phases when hardware sensors are attached.
        </p>
      </div>

      {/* Step 1 Form */}
      <form onSubmit={handleSubmit} className="np-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2 className="text-title-md" style={{ color: 'var(--primary)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
          Officer & Location Information
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          <div>
            <label className="text-label-sm" style={{ display: 'block', color: 'var(--on-surface-variant)', marginBottom: '4px' }}>
              Reporting Officer
            </label>
            <input
              type="text"
              className="np-search-input"
              value={`${session.officerName} (${session.officerBadge})`}
              disabled
              style={{ width: '100%', maxWidth: 'none', backgroundColor: 'var(--surface-container)' }}
            />
          </div>

          <div>
            <label className="text-label-sm" style={{ display: 'block', color: 'var(--on-surface-variant)', marginBottom: '4px' }}>
              Operational Sector
            </label>
            <input
              type="text"
              className="np-search-input"
              value={session.sector}
              disabled
              style={{ width: '100%', maxWidth: 'none', backgroundColor: 'var(--surface-container)' }}
            />
          </div>

          <div>
            <label className="text-label-sm" style={{ display: 'block', color: 'var(--on-surface-variant)', marginBottom: '4px' }}>
              Location / Post
            </label>
            <input
              type="text"
              className="np-search-input"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              style={{ width: '100%', maxWidth: 'none' }}
            />
          </div>

          <div>
            <label className="text-label-sm" style={{ display: 'block', color: 'var(--on-surface-variant)', marginBottom: '4px' }}>
              Lane / Checkpoint
            </label>
            <input
              type="text"
              className="np-search-input"
              value={subLocation}
              onChange={(e) => setSubLocation(e.target.value)}
              required
              style={{ width: '100%', maxWidth: 'none' }}
            />
          </div>
        </div>

        <h2 className="text-title-md" style={{ color: 'var(--primary)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px', marginTop: '8px' }}>
          Test Kit & Specimen Details
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          <div>
            <label className="text-label-sm" style={{ display: 'block', color: 'var(--on-surface-variant)', marginBottom: '4px' }}>
              Reagent Kit Type
            </label>
            <select
              className="np-select"
              value={testType}
              onChange={(e) => setTestType(e.target.value)}
              style={{ width: '100%', padding: '8px' }}
            >
              <option value="Narcotics Kit A">Narcotics Kit A (Scott/Cobalt)</option>
              <option value="Opioid Screening B">Opioid Screening B (Mecke/Marquis)</option>
              <option value="Synthetic Reagent C">Synthetic Reagent C (Stimulants)</option>
              <option value="Cannabinoid Reagent D">Cannabinoid Reagent D (Duquenois)</option>
            </select>
          </div>

          <div>
            <label className="text-label-sm" style={{ display: 'block', color: 'var(--on-surface-variant)', marginBottom: '4px' }}>
              Kit Lot Number
            </label>
            <select
              className="np-select"
              value={lotNumber}
              onChange={(e) => setLotNumber(e.target.value)}
              style={{ width: '100%', padding: '8px' }}
            >
              <option value="Lot #NP-9042">Lot #NP-9042 (Active · 18 Kits)</option>
              <option value="Lot #NP-8819">Lot #NP-8819 (Secondary Lot)</option>
            </select>
          </div>

          <div>
            <label className="text-label-sm" style={{ display: 'block', color: 'var(--on-surface-variant)', marginBottom: '4px' }}>
              Specimen / Vehicle Reference
            </label>
            <input
              type="text"
              className="np-search-input"
              placeholder="e.g. Vehicle HR-26-CZ-4102 / Bag 44"
              value={suspectIdentifier}
              onChange={(e) => setSuspectIdentifier(e.target.value)}
              style={{ width: '100%', maxWidth: 'none' }}
            />
          </div>

          <div>
            <label className="text-label-sm" style={{ display: 'block', color: 'var(--on-surface-variant)', marginBottom: '4px' }}>
              Presumptive Reaction Result (Demonstration)
            </label>
            <select
              className="np-select"
              value={simulatedResult}
              onChange={(e) => setSimulatedResult(e.target.value as any)}
              style={{ width: '100%', padding: '8px' }}
            >
              <option value="presumptive_positive">Presumptive Positive</option>
              <option value="presumptive_negative">Presumptive Negative</option>
              <option value="inconclusive">Inconclusive / Retest</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-label-sm" style={{ display: 'block', color: 'var(--on-surface-variant)', marginBottom: '4px' }}>
            Officer Field Observation Notes
          </label>
          <textarea
            className="np-search-input"
            rows={3}
            placeholder="Record sample texture, quantity estimate, field conditions..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={{ width: '100%', maxWidth: 'none', height: 'auto', padding: '8px' }}
          ></textarea>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
          <Link to="/" className="btn btn-outline">
            Cancel
          </Link>
          <button type="submit" className="btn btn-primary">
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>save</span>
            <span>Record Test & Return to Dashboard</span>
          </button>
        </div>
      </form>
    </div>
  );
};
