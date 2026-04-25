import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';

export function GuestRoute() {
  const { status } = useAuth();
  const location = useLocation();

  if (status === 'hydrating') return null;

  if (status === 'authenticated') {
    const redirectTo = location.state?.from?.pathname ?? '/dashboard';
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}
