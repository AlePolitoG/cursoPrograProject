import styles from './AuthLayout.module.css';

export function AuthLayout({ eyebrow, title, subtitle, children, aside }) {
  return (
    <div className={`${styles.wrap} glass-panel`}>
      <section className={styles.pane}>
        <div className={styles.paneInner}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h1 className={styles.title}>{title}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          <div className={styles.form}>{children}</div>
        </div>
      </section>

      <aside className={styles.aside} aria-hidden="true">
        <div className={styles.asideInner}>
          {aside ?? (
            <>
              <p className={styles.asideEyebrow}>Manifesto</p>
              <blockquote className={styles.quote}>
                “El mejor momento para plantar un árbol fue hace veinte años. El segundo mejor es hoy.”
              </blockquote>
              <p className={styles.asideNote}>
                Proverbio chino — y también, con suerte, el tono de este curso.
              </p>
            </>
          )}
        </div>
      </aside>
    </div>
  );
}
