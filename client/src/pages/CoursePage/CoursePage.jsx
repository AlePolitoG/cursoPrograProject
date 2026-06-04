import { Link, useParams } from 'react-router-dom';
import { LessonList } from '../../components/LessonList/LessonList.jsx';
import { ProgressBar } from '../../components/ProgressBar/ProgressBar.jsx';
import { useTrackProgress } from '../../hooks/useTrackProgress.js';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage.jsx';
import styles from './CoursePage.module.css';

export function CoursePage() {
  const { trackId } = useParams();
  const data = useTrackProgress(trackId);

  if (!data) return <NotFoundPage />;
  const { track, done, total, percent, totalMinutes, doneMinutes } = data;
  const doneHours = Math.round(doneMinutes / 60);
  const totalHours = Math.round(totalMinutes / 60);

  return (
    <div className={`${styles.page} glass-panel`}>
      <Link to="/dashboard" className={styles.back}>
        <span aria-hidden="true">←</span> Volver al panel
      </Link>

      <header className={styles.hero}>
        <p className={styles.eyebrow}>Pista {track.number} · {track.duration}</p>
        <h1 className={styles.title}>{track.title}</h1>
        <p className={styles.tagline}>{track.tagline}</p>

        <div className={styles.progress}>
          <div className={styles.progressHead}>
            <span className={styles.progressLabel}>Progreso</span>
            <span className={styles.progressValue}>
              {done} / {total} lecciones · {doneHours}/{totalHours} h · <strong>{percent}%</strong>
            </span>
          </div>
          <ProgressBar value={done} max={total} size="lg" label={`Progreso de ${track.title}`} />
        </div>
      </header>

      <div className={styles.sections}>
        {track.sections.map((section, i) => (
          <LessonList key={section.id} section={section} index={i} trackId={track.id} />
        ))}
      </div>
    </div>
  );
}
