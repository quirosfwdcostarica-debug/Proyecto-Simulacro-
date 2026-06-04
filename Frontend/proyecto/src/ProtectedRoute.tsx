import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import type { FormData } from './App';

interface ProtectedRouteProps {
  formData: FormData;
  children: ReactNode;
  /**
   * Optional role required to access the route.
   * If omitted, defaults to allowing any authenticated user.
   */
  requiredRole?: 'estudiante' | 'exalumno';
}

export const ProtectedRoute = ({ formData, children, requiredRole }: ProtectedRouteProps) => {
  // If a specific role is required, ensure the user matches it.
  if (requiredRole) {
    const hasRole =
      requiredRole === 'estudiante'
        ? formData.userType === 'estudiante' && formData.esEstudiante
        : formData.userType === 'exalumno';
    if (hasRole) {
      return <>{children}</>;
    }
    // Role mismatch, redirect to home.
    return <Navigate to="/" replace />;
  }

  // No role requirement, just check that the user has completed registration.
  if (formData.esEstudiante) {
    return <>{children}</>;
  }
  return <Navigate to="/" replace />;
};
