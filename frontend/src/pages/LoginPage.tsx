import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import type { OfficerSession } from '../types/testRecord';
import { MOCK_OFFICER_SESSION } from '../data/mockData';

interface LoginPageProps {
  session: OfficerSession | null;
  onLogin: (session: OfficerSession) => void;
  onLogout?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ session, onLogin, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

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
      newErrors.badgeId = 'Officer Service ID or Badge Number is required.';
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
    if (cleanBadge === 'DL-84920' || cleanBadge === '84920' || cleanBadge === 'DEMO') {
      const activeSession: OfficerSession = {
        ...MOCK_OFFICER_SESSION,
        officerBadge: cleanBadge === 'DEMO' ? 'DEMO-9901' : cleanBadge,
      };
      onLogin(activeSession);
      navigate(from, { replace: true });
    } else if (cleanBadge.length >= 4 && pin.length >= 4) {
      // Dynamic test officer session for custom badge inputs in evaluation
      const customSession: OfficerSession = {
        ...MOCK_OFFICER_SESSION,
        officerName: `Officer ${cleanBadge}`,
        officerBadge: cleanBadge,
      };
      onLogin(customSession);
      navigate(from, { replace: true });
    } else {
      setAuthError(
        'Authentication failed. Badge or PIN not recognized in the demonstration directory. Use Badge #84920 (PIN: 123456) or use the 1-Click Demo Sign In button below.'
      );
    }
  };

  return (
    <div className="np-login-container">
      <div className="np-login-box">
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div className="np-brand-icon" style={{ margin: '0 auto 12px', width: '48px', height: '48px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>
              shield
            </span>
          </div>
          <h1 className="text-headline-sm" style={{ color: 'var(--primary)', margin: 0, fontWeight: 800 }}>
            NashaPrahari
          </h1>
          <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)', margin: '4px 0 0' }}>
            Official Field Companion · Terminal Sign In
          </p>
        </div>

        {/* If user is already authenticated */}
        {session ? (
          <div className="np-panel" style={{ padding: '20px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <span className="material-symbols-outlined" style={{ color: '#047857', fontSize: '22px' }}>
                verified_user
              </span>
              <span className="text-title-sm" style={{ color: 'var(--primary)' }}>
                Active Session Detected
              </span>
            </div>
            <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)', margin: 0 }}>
              You are currently authenticated as <strong>{session.officerName}</strong> ({session.officerBadge}) · {session.sector}.
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
              <div className="np-toast-banner" style={{ marginBottom: '14px', backgroundColor: '#eff6ff', borderColor: '#bfdbfe', color: '#1e40af' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>lock</span>
                  <span className="text-body-sm">{redirectedMessage}</span>
                </div>
              </div>
            )}

            {/* Development / Demo Mode Callout */}
            <div style={{ padding: '10px 14px', backgroundColor: 'var(--surface-container-low)', border: '1px solid var(--border-subtle)', borderRadius: '6px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <span className="badge-demo">Demo Mode</span>
                <span className="text-label-sm" style={{ color: 'var(--primary)', fontWeight: 700 }}>
                  Prototype Authentication
                </span>
              </div>
              <p className="text-body-sm" style={{ color: 'var(--on-surface-variant)', margin: 0, lineHeight: 1.4 }}>
                Backend OAuth2 / JWT authentication is in development. For hackathon testing, click the instant demo login button below or enter any badge (e.g. <code>84920</code>).
              </p>
            </div>

            {/* Auth Error Banner */}
            {authError && (
              <div className="np-toast-banner" style={{ marginBottom: '16px', backgroundColor: '#fef2f2', borderColor: '#fecaca', color: '#b91c1c' }} role="alert">
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '18px', marginTop: '1px' }}>error</span>
                  <span className="text-body-sm">{authError}</span>
                </div>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="np-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="np-form-field">
                <label htmlFor="login-badge" className="np-form-label">
                  <span>Officer Service ID / Badge <span className="np-form-label-required">*</span></span>
                </label>
                <input
                  id="login-badge"
                  type="text"
                  className={`np-search-input ${errors.badgeId ? 'np-input-error' : ''}`}
                  value={badgeId}
                  onChange={(e) => {
                    setBadgeId(e.target.value);
                    if (errors.badgeId) setErrors((prev) => ({ ...prev, badgeId: undefined }));
                    if (authError) setAuthError(null);
                  }}
                  placeholder="e.g. DL-84920"
                  style={{ width: '100%', maxWidth: 'none', height: '44px' }}
                  aria-invalid={Boolean(errors.badgeId)}
                  aria-describedby={errors.badgeId ? 'error-badge' : undefined}
                />
                {errors.badgeId && (
                  <div id="error-badge" className="np-field-error-msg">
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>error</span>
                    <span>{errors.badgeId}</span>
                  </div>
                )}
              </div>

              <div className="np-form-field">
                <label htmlFor="login-pin" className="np-form-label">
                  <span>Terminal Passcode / PIN <span className="np-form-label-required">*</span></span>
                </label>
                <input
                  id="login-pin"
                  type="password"
                  className={`np-search-input ${errors.pin ? 'np-input-error' : ''}`}
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value);
                    if (errors.pin) setErrors((prev) => ({ ...prev, pin: undefined }));
                    if (authError) setAuthError(null);
                  }}
                  placeholder="Enter 6-digit PIN"
                  style={{ width: '100%', maxWidth: 'none', height: '44px' }}
                  aria-invalid={Boolean(errors.pin)}
                  aria-describedby={errors.pin ? 'error-pin' : undefined}
                />
                {errors.pin && (
                  <div id="error-pin" className="np-field-error-msg">
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>error</span>
                    <span>{errors.pin}</span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', height: '44px', marginTop: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>login</span>
                <span>Sign In to Field Terminal</span>
              </button>

              <div style={{ textAlign: 'center', margin: '4px 0', position: 'relative' }}>
                <span style={{ backgroundColor: 'var(--surface-container-lowest)', padding: '0 8px', color: 'var(--on-surface-variant)', fontSize: '12px' }}>
                  or evaluate instantly
                </span>
              </div>

              {/* 1-Click Demo Sign In Button */}
              <button
                type="button"
                onClick={handleDemoLogin}
                className="btn btn-outline"
                style={{
                  width: '100%',
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  borderColor: 'var(--secondary)',
                  color: 'var(--secondary)',
                  fontWeight: 600,
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>bolt</span>
                <span>1-Click Demo Login (Insp. A. Rathore)</span>
              </button>
            </form>
          </>
        )}

        {/* Back Link */}
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <Link to="/" style={{ color: 'var(--on-surface-variant)', fontSize: '13px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_back</span>
            <span>Return to Public Overview</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
