import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import styles from './ProtectedRoute.module.css';

export function ProtectedRoute() {
  const { status } = useAuth();
  const location = useLocation();

  if (status === 'hydrating') {
    return (
      <div className={styles.gate} role="status" aria-live="polite">
        <span className={styles.spinner} aria-hidden="true" />
        <span className={styles.label}>Verificando sesión…</span>
      </div>
    );
  }

  if (status !== 'authenticated') {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
