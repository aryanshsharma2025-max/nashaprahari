import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import type { OfficerSession } from '../types/testRecord';
import { MOCK_OFFICER_SESSION } from '../data/mockData';
import { GeometricChakra } from '../components/common/GeometricChakra';
import { AshokaStambhWatermark } from '../components/common/AshokaStambhWatermark';

interface LoginPageProps {
  session: OfficerSession | null;
  onLogin: (session: OfficerSession) => void;
  onLogout?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ session, onLogin, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  // Location state passed from ProtectedRoute redirection
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard';
  const redirectedMessage = (location.state as { message?: string })?.message;

  const [badgeId, setBadgeId] = useState('');
  const [pin, setPin] = useState('');
  const [errors, setErrors] = useState<{ badgeId?: string; pin?: string }>({});
  const [authError, setAuthError] = useState<string | null>(null);

  // Quick 1-Click Demo Sign In
  const handleDemoLogin = () => {
    onLogin(MOCK_OFFICER_SESSION);
    navigate(from, { replace: true });
  };

  // Form Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { badgeId?: string; pin?: string } = {};

    if (!badgeId.trim()) {
      newErrors.badgeId = 'Officer Service ID or PNO Badge Number is required.';
    }
    if (!pin.trim()) {
      newErrors.pin = 'Security passcode or PIN is required.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setAuthError(null);
      return;
    }

    setErrors({});

    // Demo Authentication Validation Check
    // Validates against standard mock credentials format
    const cleanBadge = badgeId.trim().toUpperCase();
    if (
      cleanBadge === 'DL-84920' ||
      cleanBadge === '84920' ||
      cleanBadge === 'DEMO' ||
      cleanBadge === 'PNO-84920' ||
      cleanBadge === 'PNO #84920'
    ) {
      const activeSession: OfficerSession = {
        ...MOCK_OFFICER_SESSION,
        officerBadge: cleanBadge === 'DEMO' ? 'PNO-9901' : cleanBadge,
      };
      onLogin(activeSession);
      navigate(from, { replace: true });
    } else if (cleanBadge.length >= 4 && pin.length >= 4) {
      // Dynamic officer session for custom badge inputs
      const customSession: OfficerSession = {
        ...MOCK_OFFICER_SESSION,
        officerName: `Officer ${cleanBadge}`,
        officerBadge: cleanBadge,
      };
      onLogin(customSession);
      navigate(from, { replace: true });
    } else {
      setAuthError(
        'Authentication failed. Badge or PIN not recognized. Use PNO Badge #84920 (PIN: 123456) or use the 1-Click Authorized Sign In button below.'
      );
    }
  };

  return (
    <div className="np-login-container">
      {/* Large translucent Ashoka-Stambh-inspired architectural watermark in background behind both panels */}
      <div className="np-login-stambh-watermark-wrap" aria-hidden="true">
        <AshokaStambhWatermark className="np-login-stambh-svg" />
      </div>

      <div className="np-login-layout">
        {/* LEFT COLUMN: Visually Rich Deep Navy Identity Area with Watermark */}
        <motion.div
          className="np-login-identity-col"
          initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.38, ease: 'easeOut' }}
        >
          {/* Faint Ashoka-Chakra-inspired geometric watermark (enlarged decorative motif) */}
          <div className="np-login-watermark-wrap" aria-hidden="true">
            <GeometricChakra size="100%" color="#ffffff" />
          </div>

          <div className="np-login-identity-content">
            <div className="np-login-brand-header">
              <div className="np-login-brand-icon-wrap" aria-hidden="true">
                <span className="material-symbols-outlined" style={{ fontSize: '28px', color: '#FFB366' }}>
                  shield
                </span>
              </div>
              <div>
                <h1 className="np-login-brand-title">NashaPrahari</h1>
                <p className="np-login-brand-sub">Field Operations Terminal · Narcotics Presumptive Screening</p>
              </div>
            </div>

            {/* Subtle Saffron-White-Green Tricolour Micro-Hairline */}
            <div className="np-tricolour-hairline np-login-tricolour" />

            {/* Mission Statement */}
            <p className="np-login-mission-statement">
              Digital field companion for narcotics screening workflows, seizure documentation, and evidence chain of custody.
            </p>

            {/* Operational Screening & Custody Standard */}
            <div className="np-login-proto-notice">
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <span className="badge-demo">NDPS Operational Guidance</span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#FFD79E' }}>
                  Field Evidentiary Standards
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '11px', lineHeight: 1.45, color: 'rgba(255, 255, 255, 0.72)' }}>
                Field test results provide preliminary presumptive screening only. All seized substances require
                formal custody sealing and confirmatory laboratory analysis (GC-MS / HPLC) for legal proceedings.
              </p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Refined Right-Aligned Login Panel with Subtle Depth */}
        <motion.div
          className="np-login-panel-col"
          initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.38, delay: shouldReduceMotion ? 0 : 0.05, ease: 'easeOut' }}
        >
          <div className="np-login-box">
            {/* Tricolour Hairline Accent on Card Top */}
            <div className="np-tricolour-hairline" style={{ borderRadius: '2px 2px 0 0', marginBottom: '18px' }} />

            <div className="np-login-panel-header" style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--primary)' }}>
                  lock
                </span>
                <h2 className="text-title-md" style={{ color: 'var(--text-primary)', margin: 0, fontWeight: 800 }}>
                  Officer Sign In
                </h2>
              </div>
              <p className="text-body-sm" style={{ color: 'var(--text-secondary)', margin: '2px 0 0' }}>
                Authorized terminal session access
              </p>
            </div>

            {/* If user is already authenticated */}
            {session ? (
              <div
                className="np-panel"
                style={{
                  padding: '22px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  backgroundColor: 'var(--surface-white)',
                  boxShadow: '0 4px 16px rgba(13,43,78,0.06)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <span className="material-symbols-outlined" style={{ color: '#047857', fontSize: '24px' }}>
                    verified_user
                  </span>
                  <span className="text-title-sm" style={{ color: 'var(--primary)', fontWeight: 700 }}>
                    Active Session Detected
                  </span>
                </div>
                <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)', margin: 0 }}>
                  You are currently authenticated as <strong>{session.officerName}</strong> ({session.officerBadge}) ·{' '}
                  {session.sector}.
                </p>
                <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                  <button
                    type="button"
                    onClick={() => navigate('/dashboard')}
                    className="btn btn-primary"
                    style={{ flex: 1, padding: '10px' }}
                  >
                    Go to Dashboard
                  </button>
                  {onLogout && (
                    <button
                      type="button"
                      onClick={onLogout}
                      className="btn btn-outline"
                      style={{ flex: 1, padding: '10px' }}
                    >
                      Sign Out
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <>
                {/* Redirect / Protection notice */}
                {redirectedMessage && (
                  <div
                    className="np-toast-banner"
                    style={{
                      marginBottom: '14px',
                      backgroundColor: '#eff6ff',
                      borderColor: '#bfdbfe',
                      color: '#1e40af',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                        lock
                      </span>
                      <span className="text-body-sm">{redirectedMessage}</span>
                    </div>
                  </div>
                )}



                {/* Auth Error Banner */}
                {authError && (
                  <div
                    className="np-toast-banner"
                    style={{
                      marginBottom: '16px',
                      backgroundColor: '#fef2f2',
                      borderColor: '#fecaca',
                      color: '#b91c1c',
                    }}
                    role="alert"
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '18px', marginTop: '1px' }}>
                        error
                      </span>
                      <span className="text-body-sm">{authError}</span>
                    </div>
                  </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="np-login-form-fields">
                  <div className="np-form-field">
                    <label htmlFor="login-badge" className="np-form-label">
                      <span>
                        Officer Service ID / PNO Badge <span className="np-form-label-required">*</span>
                      </span>
                    </label>
                    <input
                      id="login-badge"
                      type="text"
                      className={`np-search-input np-login-input ${errors.badgeId ? 'np-input-error' : ''}`}
                      value={badgeId}
                      onChange={(e) => {
                        setBadgeId(e.target.value);
                        if (errors.badgeId) setErrors((prev) => ({ ...prev, badgeId: undefined }));
                        if (authError) setAuthError(null);
                      }}
                      placeholder="e.g. 84920 or PNO-84920"
                      aria-invalid={Boolean(errors.badgeId)}
                      aria-describedby={errors.badgeId ? 'error-badge' : undefined}
                    />
                    {errors.badgeId && (
                      <div id="error-badge" className="np-field-error-msg">
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                          error
                        </span>
                        <span>{errors.badgeId}</span>
                      </div>
                    )}
                  </div>

                  <div className="np-form-field">
                    <label htmlFor="login-pin" className="np-form-label">
                      <span>
                        Terminal Passcode / PIN <span className="np-form-label-required">*</span>
                      </span>
                    </label>
                    <input
                      id="login-pin"
                      type="password"
                      className={`np-search-input np-login-input ${errors.pin ? 'np-input-error' : ''}`}
                      value={pin}
                      onChange={(e) => {
                        setPin(e.target.value);
                        if (errors.pin) setErrors((prev) => ({ ...prev, pin: undefined }));
                        if (authError) setAuthError(null);
                      }}
                      placeholder="Enter 6-digit PIN"
                      aria-invalid={Boolean(errors.pin)}
                      aria-describedby={errors.pin ? 'error-pin' : undefined}
                    />
                    {errors.pin && (
                      <div id="error-pin" className="np-field-error-msg">
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                          error
                        </span>
                        <span>{errors.pin}</span>
                      </div>
                    )}
                  </div>

                  {/* Prominent Sign In Button */}
                  <motion.button
                    type="submit"
                    className="btn btn-primary np-login-submit-btn"
                    whileHover={shouldReduceMotion ? undefined : { y: -1 }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '19px' }}>
                      login
                    </span>
                    <span>Sign In to Field Terminal</span>
                  </motion.button>

                  <div className="np-login-divider">
                    <span>or fast field access</span>
                  </div>

                  {/* 1-Click Authorized Sign In Button */}
                  <motion.button
                    type="button"
                    onClick={handleDemoLogin}
                    className="btn btn-outline np-login-demo-btn"
                    whileHover={shouldReduceMotion ? undefined : { y: -1 }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--primary)' }}>
                      bolt
                    </span>
                    <span>1-Click Authorized Sign In (Insp. A. Rathore · PNO #84920)</span>
                  </motion.button>
                </form>
              </>
            )}

            {/* Back Link */}
            <div style={{ textAlign: 'center', marginTop: '18px' }}>
              <Link
                to="/"
                style={{
                  color: 'var(--on-surface-variant)',
                  fontSize: '13px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                  arrow_back
                </span>
                <span>Return to Public Overview</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
