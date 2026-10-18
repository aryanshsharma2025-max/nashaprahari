import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import type { OfficerSession } from '../../types/testRecord';

interface ProtectedRouteProps {
  session: OfficerSession | null;
  children: React.ReactElement;
}

/**
 * ProtectedRoute guards officer application views against unauthenticated access.
 *
 * NOTE ON SECURITY BOUNDARIES (per frontend/docs/SECURITY.md):
 * Client-side route guards improve navigation usability and prevent accidental UI exposure.
 * They DO NOT substitute for server-side authorization. Every backend API endpoint must
 * independently validate caller credentials, JWT/session tokens, and role-based permissions.
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ session, children }) => {
  const location = useLocation();

  if (!session) {
    // Redirect unauthenticated visitors to /login, preserving target URL for post-login redirection
    return <Navigate to="/login" state={{ from: location, message: 'Officer authentication required to access field operations.' }} replace />;
  }

  return children;
};
