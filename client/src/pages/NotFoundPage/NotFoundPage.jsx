import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

export function NotFoundPage() {
  return (
    <div className={`${styles.page} glass-panel`}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>No encontramos esa ruta.</h1>
      <p className={styles.subtitle}>
        Puede que la URL esté mal escrita o que el recurso ya no exista.
      </p>
      <Link to="/dashboard" className={styles.cta}>
        Volver al panel <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
