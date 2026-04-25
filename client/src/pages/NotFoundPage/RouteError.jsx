import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

export function RouteError() {
  const error = useRouteError();

  const is404 = isRouteErrorResponse(error) && error.status === 404;
  const code = isRouteErrorResponse(error) ? error.status : '500';
  const title = is404 ? 'No encontramos esa ruta.' : 'Algo se rompió en el camino.';
  const detail = isRouteErrorResponse(error)
    ? error.statusText
    : error?.message ?? 'Error inesperado.';

  return (
    <div className={styles.page}>
      <p className={styles.code}>{code}</p>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{detail}</p>
      <Link to="/dashboard" className={styles.cta}>
        Volver al panel <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
