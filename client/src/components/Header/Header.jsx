import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import styles from './Header.module.css';

export function Header() {
  const { status, user, logout } = useAuth();
  const navigate = useNavigate();
  const authed = status === 'authenticated';

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to={authed ? '/dashboard' : '/'} className={styles.brand} aria-label="Inicio">
          <span className={styles.mark} aria-hidden="true">✦</span>
          <span className={styles.brandText}>
            <span className={styles.brandTitle}>Curso</span>
            <span className={styles.brandSub}>Programación en español</span>
          </span>
        </Link>

        <nav className={styles.nav} aria-label="Navegación principal">
          {authed ? (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => `${styles.link} ${isActive ? styles.linkActive : ''}`}
              >
                Panel
              </NavLink>
              <span className={styles.user} title={user?.email}>
                <span className={styles.userLabel}>Sesión</span>
                <span className={styles.userName}>{user?.name}</span>
              </span>
              <button type="button" className={styles.action} onClick={handleLogout}>
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) => `${styles.link} ${isActive ? styles.linkActive : ''}`}
              >
                Ingresar
              </NavLink>
              <NavLink to="/signup" className={styles.actionPrimary}>
                Crear cuenta
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
