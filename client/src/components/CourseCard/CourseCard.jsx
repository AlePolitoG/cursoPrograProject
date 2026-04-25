import { Link } from 'react-router-dom';
import { ProgressBar } from '../ProgressBar/ProgressBar.jsx';
import { useTrackProgress } from '../../hooks/useTrackProgress.js';
import styles from './CourseCard.module.css';

const ACCENTS = ['cyan', 'magenta', 'yellow'];

export function CourseCard({ trackId, questIndex = 0 }) {
  const data = useTrackProgress(trackId);
  if (!data) return null;
  const { track, done, total, percent } = data;
  const started = done > 0;
  const accent = ACCENTS[questIndex % ACCENTS.length];

  return (
    <article className={`${styles.card} ${styles[accent]}`} data-quest={questIndex + 1}>
      <Link to={`/courses/${track.id}`} className={styles.link} aria-label={`Abrir curso ${track.title}`}>
        <header className={styles.head}>
          <span className={styles.badge}>QUEST {String(questIndex + 1).padStart(2, '0')}</span>
          <span className={styles.duration}>{track.duration}</span>
        </header>

        <h3 className={styles.title}>{track.title}</h3>
        <p className={styles.tagline}>{track.tagline}</p>

        <div className={styles.progress}>
          <ProgressBar value={done} max={total} label={`Progreso de ${track.title}`} />
          <div className={styles.progressMeta}>
            <span>{done} / {total} LV</span>
            <span className={styles.pct}>{percent}%</span>
          </div>
        </div>

        <span className={styles.cta} aria-hidden="true">
          {started ? '▶ CONTINUAR' : '▶ START'} <span className={styles.arrow}>→</span>
        </span>
      </Link>
    </article>
  );
}
