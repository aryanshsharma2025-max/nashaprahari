import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import type { OfficerSession, TestRecord, PresumptiveResult } from '../types/testRecord';
import { useIsMobile } from '../components/common/useIsMobile';

interface NewTestPageProps {
  session: OfficerSession;
  onAddRecord: (record: TestRecord) => void;
}

export const NewTestPage: React.FC<NewTestPageProps> = ({ session, onAddRecord }) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const shouldReduceMotion = useReducedMotion();

  const stepTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: isMobile ? 0.15 : 0.18, ease: 'easeOut' as const };

  const stepInitial = shouldReduceMotion
    ? false
    : isMobile
    ? { opacity: 0, y: 8 }
    : { opacity: 0, x: 12 };

  const stepExit = shouldReduceMotion
    ? { opacity: 0 }
    : isMobile
    ? { opacity: 0, y: -6 }
    : { opacity: 0, x: -12 };

  // Wizard Step: 1 = Location, 2 = Kit & Result, 3 = Review, 4 = Saved Confirmation
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Location & Specimen
  const [location, setLocation] = useState(session.location);
  const [subLocation, setSubLocation] = useState('Checkpoint Alpha');
  const [suspectIdentifier, setSuspectIdentifier] = useState('');

  // Step 2: Test Kit & Result
  const [testType, setTestType] = useState('Narcotics Kit A');
  const [lotNumber, setLotNumber] = useState('Lot #NP-9042');
  const [simulatedResult, setSimulatedResult] = useState<PresumptiveResult>('presumptive_positive');

  // Optional Section
  const [showOptionalNotes, setShowOptionalNotes] = useState(false);
  const [notes, setNotes] = useState('');

  // Field validation error state
  const [errors, setErrors] = useState<{ location?: string; subLocation?: string }>({});

  // Saved Record Confirmation State
  const [savedRecord, setSavedRecord] = useState<TestRecord | null>(null);

  // Validate Step 1 before proceeding
  const handleStep1Continue = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: { location?: string; subLocation?: string } = {};

    if (!location.trim()) {
      errs.location = 'Operational location or post is required.';
    }
    if (!subLocation.trim()) {
      errs.subLocation = 'Lane or checkpoint is required.';
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setStep(2);
  };

  // Step 2 Proceed to Review
  const handleStep2Continue = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  // Final Confirmation & Local Save
  const handleConfirmSave = () => {
    const newId = `NP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} IST`;
    const todayDate = now.toISOString().slice(0, 10);

    const reactionText =
      simulatedResult === 'presumptive_positive'
        ? 'Target color reaction observed (Cobalt Blue / Purple precipitate)'
        : simulatedResult === 'presumptive_negative'
        ? 'No diagnostic color change observed (clear baseline)'
        : 'Atypical reaction or ambiguous color change';

    const newRecord: TestRecord = {
      id: newId,
      timestamp: timeStr,
      date: todayDate,
      location: location.trim(),
      subLocation: subLocation.trim(),
      testType,
      lotNumber,
      result: simulatedResult,
      syncStatus: 'pending',
      officerName: session.officerName,
      officerBadge: session.officerBadge,
      suspectIdentifier: suspectIdentifier.trim() || undefined,
      reagentColorObserved: reactionText,
      notes: notes.trim() || undefined,
      chainOfCustody: {
        tamperBagId: `TB-${newId.replace('NP-', '')}`,
        sealedAt: timeStr,
        dispatchStatus: 'Queued in Field Vault',
        custodyOfficer: session.officerName,
      },
    };

    onAddRecord(newRecord);
    setSavedRecord(newRecord);
    setStep(4);
  };

  const handleResetForAnotherTest = () => {
    setSuspectIdentifier('');
    setNotes('');
    setShowOptionalNotes(false);
    setSavedRecord(null);
    setErrors({});
    setStep(1);
  };

  return (
    <div style={{ maxWidth: '760px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Breadcrumb Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="text-body-sm">
        <Link to="/dashboard" style={{ color: 'var(--secondary)', textDecoration: 'none', fontWeight: 500 }}>
          Home Dashboard
        </Link>
        <span style={{ color: 'var(--outline-variant)' }}>/</span>
        <span style={{ color: 'var(--on-surface-variant)' }}>New Field Test</span>
      </div>

      {/* Screen Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h1 className="text-headline-md" style={{ color: 'var(--primary)', margin: 0 }}>
            {step === 4 ? 'Test Recorded' : 'New Field Test'}
          </h1>
          <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)', margin: '4px 0 0' }}>
            {step === 1 && 'Step 1 of 3: Operational Location & Specimen'}
            {step === 2 && 'Step 2 of 3: Reagent Selection & Presumptive Outcome'}
            {step === 3 && 'Step 3 of 3: Compact Review & Confirm'}
            {step === 4 && 'Record saved to local device queue (Pending central sync)'}
          </p>
        </div>

        {step < 4 && (
          <span className="badge-demo">
            Step {step} of 3
          </span>
        )}
      </div>

      {/* Unobtrusive Step Stepper (Steps 1 to 3) */}
      {step < 4 && (
        <div className="np-wizard-stepper" aria-label="Workflow progress">
          <div className={`np-stepper-item ${step === 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
            <span className="np-stepper-num">
              {step > 1 ? '✓' : '1'}
            </span>
            <span className="np-stepper-label">Location & Specimen</span>
          </div>
          <div className="np-stepper-divider" />
          <div className={`np-stepper-item ${step === 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
            <span className="np-stepper-num">
              {step > 2 ? '✓' : '2'}
            </span>
            <span className="np-stepper-label">Kit & Outcome</span>
          </div>
          <div className="np-stepper-divider" />
          <div className={`np-stepper-item ${step === 3 ? 'active' : ''}`}>
            <span className="np-stepper-num">3</span>
            <span className="np-stepper-label">Review & Save</span>
          </div>
        </div>
      )}

      {/* Compact Legal Footnote (Accessible without dominating screen) */}
      {step < 4 && (
        <div className="np-statutory-compact">
          <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--secondary)' }}>
            policy
          </span>
          <span>
            <strong>Statutory Protocol:</strong> Field colorimetric tests provide presumptive preliminary screening under NDPS guidelines. Confirmatory laboratory analysis (GC-MS / HPLC) is required for formal evidence.
          </span>
        </div>
      )}

      <div style={{ overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
          {/* STEP 1: Operational Location & Specimen Details */}
          {step === 1 && (
            <motion.form
              key="step-1"
              onSubmit={handleStep1Continue}
              className="np-panel"
              style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}
              initial={stepInitial}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={stepExit}
              transition={stepTransition}
            >
              {/* Active Officer Identity Banner */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', backgroundColor: 'var(--surface-container-low)', borderRadius: '6px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--primary)' }}>
                  badge
                </span>
                <div style={{ fontSize: '13px' }}>
                  <span style={{ color: 'var(--on-surface-variant)' }}>Reporting Officer: </span>
                  <strong style={{ color: 'var(--primary)' }}>{session.officerName}</strong> ({session.officerBadge}) · {session.sector}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                {/* Location / Post */}
                <div className="np-form-field">
                  <label htmlFor="field-location" className="np-form-label">
                    <span>Location / Post <span className="np-form-label-required">*</span></span>
                  </label>
                  <input
                    id="field-location"
                    type="text"
                    className={`np-search-input ${errors.location ? 'np-input-error' : ''}`}
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                      if (errors.location) setErrors((prev) => ({ ...prev, location: undefined }));
                    }}
                    placeholder="e.g. Sector 4 Interstate Checkpost"
                    style={{ width: '100%', maxWidth: 'none', height: '44px' }}
                    aria-invalid={Boolean(errors.location)}
                    aria-describedby={errors.location ? 'error-location' : undefined}
                  />
                  {errors.location && (
                    <div id="error-location" className="np-field-error-msg">
                      <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>error</span>
                      <span>{errors.location}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px', alignItems: 'center' }}>
                    <span style={{ color: 'var(--on-surface-variant)', fontSize: '11px' }}>Presets:</span>
                    {['Sector 4 Interceptor', 'Cargo Depot Lane 2', 'Highway Toll Barrier'].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => {
                          setLocation(preset);
                          if (errors.location) setErrors((prev) => ({ ...prev, location: undefined }));
                        }}
                        style={{
                          border: '1px solid var(--outline-variant)',
                          backgroundColor: location === preset ? 'var(--surface-container-high)' : 'var(--surface)',
                          color: location === preset ? 'var(--primary)' : 'var(--on-surface)',
                          borderRadius: '4px',
                          padding: '2px 8px',
                          fontSize: '11px',
                          fontWeight: location === preset ? 600 : 400,
                          cursor: 'pointer'
                        }}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Lane / Checkpoint */}
                <div className="np-form-field">
                  <label htmlFor="field-sublocation" className="np-form-label">
                    <span>Lane / Checkpoint <span className="np-form-label-required">*</span></span>
                  </label>
                  <input
                    id="field-sublocation"
                    type="text"
                    className={`np-search-input ${errors.subLocation ? 'np-input-error' : ''}`}
                    value={subLocation}
                    onChange={(e) => {
                      setSubLocation(e.target.value);
                      if (errors.subLocation) setErrors((prev) => ({ ...prev, subLocation: undefined }));
                    }}
                    placeholder="e.g. Inbound Lane 2 / Checkpoint Alpha"
                    style={{ width: '100%', maxWidth: 'none', height: '44px' }}
                    aria-invalid={Boolean(errors.subLocation)}
                    aria-describedby={errors.subLocation ? 'error-sublocation' : undefined}
                  />
                  {errors.subLocation && (
                    <div id="error-sublocation" className="np-field-error-msg">
                      <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>error</span>
                      <span>{errors.subLocation}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px', alignItems: 'center' }}>
                    <span style={{ color: 'var(--on-surface-variant)', fontSize: '11px' }}>Presets:</span>
                    {['Checkpoint Alpha', 'Inbound Lane 2', 'Inspection Bay 1'].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => {
                          setSubLocation(preset);
                          if (errors.subLocation) setErrors((prev) => ({ ...prev, subLocation: undefined }));
                        }}
                        style={{
                          border: '1px solid var(--outline-variant)',
                          backgroundColor: subLocation === preset ? 'var(--surface-container-high)' : 'var(--surface)',
                          color: subLocation === preset ? 'var(--primary)' : 'var(--on-surface)',
                          borderRadius: '4px',
                          padding: '2px 8px',
                          fontSize: '11px',
                          fontWeight: subLocation === preset ? 600 : 400,
                          cursor: 'pointer'
                        }}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Specimen / Vehicle Reference (Optional) */}
              <div className="np-form-field">
                <label htmlFor="field-specimen" className="np-form-label">
                  <span>Specimen / Vehicle Reference <span style={{ fontWeight: 400, color: 'var(--on-surface-variant)' }}>(Optional)</span></span>
                </label>
                <input
                  id="field-specimen"
                  type="text"
                  className="np-search-input"
                  value={suspectIdentifier}
                  onChange={(e) => setSuspectIdentifier(e.target.value)}
                  placeholder="e.g. Vehicle DL-01-AB-1234 / Luggage Bag #4"
                  style={{ width: '100%', maxWidth: 'none', height: '44px' }}
                />
                <span className="np-form-hint">
                  Optional identifier for suspect vehicle, parcel, or specimen tag.
                </span>
              </div>

              {/* Footer Controls */}
              <div className="np-wizard-nav-footer">
                <Link to="/dashboard" className="btn btn-outline np-wizard-btn">
                  Cancel & Exit
                </Link>
                <button type="submit" className="btn btn-primary np-wizard-btn">
                  <span>Continue to Test Kit</span>
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
                </button>
              </div>
            </motion.form>
          )}

          {/* STEP 2: Reagent Test Kit & Presumptive Outcome */}
          {step === 2 && (
            <motion.form
              key="step-2"
              onSubmit={handleStep2Continue}
              className="np-panel"
              style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '18px' }}
              initial={stepInitial}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={stepExit}
              transition={stepTransition}
            >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {/* Reagent Kit Type */}
            <div className="np-form-field">
              <label htmlFor="test-kit-select" className="np-form-label">
                <span>Reagent Test Kit Type <span className="np-form-label-required">*</span></span>
              </label>
              <select
                id="test-kit-select"
                className="np-select"
                value={testType}
                onChange={(e) => setTestType(e.target.value)}
                style={{ width: '100%', height: '44px' }}
              >
                <option value="Narcotics Kit A">Narcotics Kit A (Scott / Cobalt Reagent)</option>
                <option value="Opioid Screening B">Opioid Screening B (Mecke / Marquis Reagent)</option>
                <option value="Synthetic Reagent C">Synthetic Reagent C (Stimulants / Amphetamines)</option>
                <option value="Cannabinoid Reagent D">Cannabinoid Reagent D (Duquenois-Levine)</option>
              </select>
            </div>

            {/* Kit Lot Number */}
            <div className="np-form-field">
              <label htmlFor="test-lot-select" className="np-form-label">
                <span>Kit Lot Number <span className="np-form-label-required">*</span></span>
              </label>
              <select
                id="test-lot-select"
                className="np-select"
                value={lotNumber}
                onChange={(e) => setLotNumber(e.target.value)}
                style={{ width: '100%', height: '44px' }}
              >
                <option value="Lot #NP-9042">Lot #NP-9042 (Active · 18 Kits remaining)</option>
                <option value="Lot #NP-8819">Lot #NP-8819 (Secondary Reserve)</option>
              </select>
            </div>
          </div>

          {/* Presumptive Colorimetric Outcome (Large Touch Cards) */}
          <div className="np-form-field">
            <span className="np-form-label">
              <span>Observed Presumptive Result <span className="np-form-label-required">*</span></span>
            </span>
            <div className="np-result-card-group" role="radiogroup" aria-label="Presumptive test result">
              {/* Presumptive Positive */}
              <button
                type="button"
                role="radio"
                aria-checked={simulatedResult === 'presumptive_positive'}
                onClick={() => setSimulatedResult('presumptive_positive')}
                className={`np-result-card ${simulatedResult === 'presumptive_positive' ? 'selected-positive' : ''}`}
              >
                <div className="np-result-card-header">
                  <span className="np-result-card-title" style={{ color: '#b91c1c' }}>
                    Presumptive Positive
                  </span>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#b91c1c' }}>
                    {simulatedResult === 'presumptive_positive' ? 'radio_button_checked' : 'radio_button_unchecked'}
                  </span>
                </div>
                <p className="np-result-card-desc">
                  Reagent color change observed indicating presumptive presence. Requires tamper sealing.
                </p>
              </button>

              {/* Presumptive Negative */}
              <button
                type="button"
                role="radio"
                aria-checked={simulatedResult === 'presumptive_negative'}
                onClick={() => setSimulatedResult('presumptive_negative')}
                className={`np-result-card ${simulatedResult === 'presumptive_negative' ? 'selected-negative' : ''}`}
              >
                <div className="np-result-card-header">
                  <span className="np-result-card-title" style={{ color: '#047857' }}>
                    Presumptive Negative
                  </span>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#047857' }}>
                    {simulatedResult === 'presumptive_negative' ? 'radio_button_checked' : 'radio_button_unchecked'}
                  </span>
                </div>
                <p className="np-result-card-desc">
                  No diagnostic color reaction observed (baseline clear). Specimen clear.
                </p>
              </button>

              {/* Inconclusive */}
              <button
                type="button"
                role="radio"
                aria-checked={simulatedResult === 'inconclusive'}
                onClick={() => setSimulatedResult('inconclusive')}
                className={`np-result-card ${simulatedResult === 'inconclusive' ? 'selected-inconclusive' : ''}`}
              >
                <div className="np-result-card-header">
                  <span className="np-result-card-title" style={{ color: '#475569' }}>
                    Inconclusive / Retest
                  </span>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#475569' }}>
                    {simulatedResult === 'inconclusive' ? 'radio_button_checked' : 'radio_button_unchecked'}
                  </span>
                </div>
                <p className="np-result-card-desc">
                  Atypical or ambiguous color change observed. Requires secondary testing.
                </p>
              </button>
            </div>
          </div>

          {/* Genuine Optional Field: Expandable Accordion for Notes */}
          <div style={{ marginTop: '4px' }}>
            <button
              type="button"
              className="np-accordion-toggle"
              onClick={() => setShowOptionalNotes(!showOptionalNotes)}
              aria-expanded={showOptionalNotes}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--secondary)' }}>
                  description
                </span>
                <span>Optional Field Notes & Observations</span>
              </div>
              <span className="material-symbols-outlined" style={{ fontSize: '20px', transform: showOptionalNotes ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s ease' }}>
                expand_more
              </span>
            </button>

            <AnimatePresence initial={false}>
              {showOptionalNotes && (
                <motion.div
                  key="notes-body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={stepTransition}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="np-accordion-body">
                    <label htmlFor="field-notes" className="text-label-sm" style={{ color: 'var(--on-surface-variant)' }}>
                      Observation Notes (Texture, estimated quantity, field conditions):
                    </label>
                    <textarea
                      id="field-notes"
                      className="np-search-input"
                      rows={3}
                      placeholder="Record sample color, texture, quantity estimate, or field condition notes..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      style={{ width: '100%', maxWidth: 'none', height: 'auto', padding: '10px' }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Navigation */}
          <div className="np-wizard-nav-footer">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="btn btn-outline np-wizard-btn"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>
              <span>Back to Location</span>
            </button>
            <button type="submit" className="btn btn-primary np-wizard-btn">
              <span>Continue to Review</span>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
            </button>
          </div>
        </motion.form>
      )}

      {/* STEP 3: Compact Review & Confirm */}
      {step === 3 && (
        <motion.div
          key="step-3"
          className="np-panel"
          style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '18px' }}
          initial={stepInitial}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={stepExit}
          transition={stepTransition}
        >
          <div>
            <h2 className="text-title-md" style={{ color: 'var(--primary)', margin: '0 0 4px' }}>
              Verify Field Record Details
            </h2>
            <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)', margin: 0 }}>
              Confirm all details before saving to local device queue.
            </p>
          </div>

          {/* Compact Review Summary Grid */}
          <div className="np-review-grid">
            <div className="np-review-item">
              <span className="np-review-label">Reporting Officer</span>
              <span className="np-review-val">{session.officerName} ({session.officerBadge})</span>
            </div>

            <div className="np-review-item">
              <span className="np-review-label">Sector & Post</span>
              <span className="np-review-val">{session.sector}</span>
            </div>

            <div className="np-review-item">
              <span className="np-review-label">Location / Checkpoint</span>
              <span className="np-review-val">{location} · {subLocation}</span>
            </div>

            <div className="np-review-item">
              <span className="np-review-label">Specimen / Reference</span>
              <span className="np-review-val">{suspectIdentifier || 'None recorded'}</span>
            </div>

            <div className="np-review-item">
              <span className="np-review-label">Reagent Test Kit</span>
              <span className="np-review-val">{testType} ({lotNumber})</span>
            </div>

            <div className="np-review-item">
              <span className="np-review-label">Presumptive Outcome</span>
              <div style={{ marginTop: '2px' }}>
                {simulatedResult === 'presumptive_positive' && (
                  <span className="badge badge-positive" style={{ fontSize: '12px', padding: '3px 8px' }}>
                    Presumptive Positive
                  </span>
                )}
                {simulatedResult === 'presumptive_negative' && (
                  <span className="badge badge-negative" style={{ fontSize: '12px', padding: '3px 8px' }}>
                    Presumptive Negative
                  </span>
                )}
                {simulatedResult === 'inconclusive' && (
                  <span className="badge badge-pending" style={{ fontSize: '12px', padding: '3px 8px' }}>
                    Inconclusive / Retest
                  </span>
                )}
              </div>
            </div>

            <div className="np-review-item" style={{ gridColumn: '1 / -1' }}>
              <span className="np-review-label">Observed Reaction Description</span>
              <span className="text-body-sm" style={{ color: 'var(--primary)', marginTop: '2px' }}>
                {simulatedResult === 'presumptive_positive'
                  ? 'Target color reaction observed (Cobalt Blue / Purple precipitate)'
                  : simulatedResult === 'presumptive_negative'
                  ? 'No diagnostic color change observed (clear baseline)'
                  : 'Atypical reaction or ambiguous color change'}
              </span>
            </div>

            {notes && (
              <div className="np-review-item" style={{ gridColumn: '1 / -1' }}>
                <span className="np-review-label">Field Notes</span>
                <span className="text-body-sm" style={{ color: 'var(--on-surface)', marginTop: '2px' }}>
                  {notes}
                </span>
              </div>
            )}
          </div>

          {/* Verification Notice */}
          <div style={{ padding: '10px 14px', backgroundColor: 'var(--surface-container-low)', borderRadius: '6px', fontSize: '12px', color: 'var(--on-surface-variant)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--secondary)' }}>
              lock
            </span>
            <span>
              Saving will assign a tamper-proof chain-of-custody seal ID and place this test into your local offline queue.
            </span>
          </div>

          {/* Footer Actions */}
          <div className="np-wizard-nav-footer">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="btn btn-outline np-wizard-btn"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>
              <span>Back to Edit</span>
            </button>
            <button
              type="button"
              onClick={handleConfirmSave}
              className="btn btn-primary np-wizard-btn"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>check_circle</span>
              <span>Confirm & Save Record</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* STEP 4: Saved Confirmation Screen */}
      {step === 4 && savedRecord && (
        <motion.div
          key="step-4"
          className="np-confirmation-card"
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={stepTransition}
        >
          <div className="np-confirmation-header">
            <div className="np-confirmation-icon">
              <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>
                check_circle
              </span>
            </div>
            <div>
              <h2 className="text-title-lg" style={{ color: 'var(--primary)', margin: 0 }}>
                Field Test Recorded Successfully
              </h2>
              <span className="text-body-sm" style={{ color: 'var(--on-surface-variant)' }}>
                Assigned Chain-of-Custody ID: <strong style={{ color: 'var(--primary)', fontFamily: 'monospace' }}>{savedRecord.id}</strong>
              </span>
            </div>
          </div>

          {/* Storage Status Callout */}
          <div className="np-storage-callout">
            <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#047857', flexShrink: 0 }}>
              cloud_queue
            </span>
            <div style={{ fontSize: '13px', lineHeight: 1.45 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                <strong style={{ color: '#047857' }}>Saved Locally in Device Storage</strong>
                <span className="badge badge-amber-accent" style={{ fontSize: '11px' }}>Pending Central Sync</span>
              </div>
              <span style={{ color: 'var(--on-surface-variant)' }}>
                This record is safely recorded in your device's offline storage. It is queued and will automatically synchronize with the central department ledger once network connectivity is available.
              </span>
            </div>
          </div>

          {/* Saved Record Details */}
          <div className="np-review-grid">
            <div className="np-review-item">
              <span className="np-review-label">Record Identifier</span>
              <span className="np-review-val" style={{ fontFamily: 'monospace' }}>{savedRecord.id}</span>
            </div>

            <div className="np-review-item">
              <span className="np-review-label">Tamper Bag ID</span>
              <span className="np-review-val" style={{ fontFamily: 'monospace' }}>
                {savedRecord.chainOfCustody?.tamperBagId || 'Assigned'}
              </span>
            </div>

            <div className="np-review-item">
              <span className="np-review-label">Location / Checkpoint</span>
              <span className="np-review-val">{savedRecord.location} · {savedRecord.subLocation}</span>
            </div>

            <div className="np-review-item">
              <span className="np-review-label">Result Recorded</span>
              <div style={{ marginTop: '2px' }}>
                {savedRecord.result === 'presumptive_positive' && (
                  <span className="badge badge-positive" style={{ fontSize: '12px' }}>Presumptive Positive</span>
                )}
                {savedRecord.result === 'presumptive_negative' && (
                  <span className="badge badge-negative" style={{ fontSize: '12px' }}>Presumptive Negative</span>
                )}
                {savedRecord.result === 'inconclusive' && (
                  <span className="badge badge-pending" style={{ fontSize: '12px' }}>Inconclusive / Retest</span>
                )}
              </div>
            </div>

            <div className="np-review-item">
              <span className="np-review-label">Custody Officer</span>
              <span className="np-review-val">{savedRecord.officerName}</span>
            </div>

            <div className="np-review-item">
              <span className="np-review-label">Recorded At</span>
              <span className="np-review-val">{savedRecord.timestamp} ({savedRecord.date})</span>
            </div>
          </div>

          {/* Post-Save Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={handleResetForAnotherTest}
                className="btn btn-primary np-wizard-btn"
                style={{ flex: 1, minWidth: '200px' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add_circle</span>
                <span>Record Another Field Test</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="btn btn-outline np-wizard-btn"
                style={{ flex: 1, minWidth: '200px' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>home</span>
                <span>Return to Home Dashboard</span>
              </button>
            </div>

            <div style={{ textAlign: 'center', paddingTop: '6px' }}>
              <Link to="/sync-queue" style={{ color: 'var(--secondary)', fontSize: '13px', textDecoration: 'none', fontWeight: 600 }}>
                View in Pending Uploads Queue →
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
    </div>
  );
};

