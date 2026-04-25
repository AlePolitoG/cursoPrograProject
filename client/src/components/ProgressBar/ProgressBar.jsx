import styles from './ProgressBar.module.css';

export function ProgressBar({ value, max = 100, size = 'md', label }) {
  const pct = Math.min(100, Math.max(0, max === 0 ? 0 : (value / max) * 100));
  return (
    <div
      className={`${styles.track} ${styles[`size_${size}`]}`}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ?? 'Progreso'}
    >
      <div className={styles.fill} style={{ transform: `scaleX(${pct / 100})` }} />
    </div>
  );
}
