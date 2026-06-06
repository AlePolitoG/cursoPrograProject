import styles from './Footer.module.css';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copy}>
          <span className={styles.mark}>✦</span> Curso · {year}
        </p>
        <p className={styles.meta}>
          &copy; {year} Monica Aldana. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
