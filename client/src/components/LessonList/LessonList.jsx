import { Link } from 'react-router-dom';
import { useProgress } from '../../hooks/useProgress.js';
import { useAuth } from '../../hooks/useAuth.js';
import { isLessonLocked } from '../../lib/paywall.js';
import styles from './LessonList.module.css';

export function LessonList({ section, index, trackId }) {
  const { isComplete, toggle } = useProgress();
  const { user } = useAuth();

  return (
    <section className={styles.section} aria-labelledby={`sec-${section.id}`}>
      <header className={styles.sectionHead}>
        <span className={styles.sectionNumber}>{String(index + 1).padStart(2, '0')}</span>
        <h3 id={`sec-${section.id}`} className={styles.sectionTitle}>{section.title}</h3>
      </header>

      <ol className={styles.list}>
        {section.lessons.map((lesson, i) => {
          const done = isComplete(lesson.id);
          const locked = isLessonLocked(lesson.id, user?.isSubscribed);
          return (
            <li
              key={lesson.id}
              className={`${styles.item} ${done ? styles.itemDone : ''} ${locked ? styles.itemLocked : ''}`}
            >
              <button
                type="button"
                className={styles.check}
                role="checkbox"
                aria-checked={done}
                onClick={() => toggle(lesson.id)}
                disabled={locked}
                aria-label={`Marcar "${lesson.title}" como ${done ? 'pendiente' : 'completada'}`}
              >
                <span className={styles.checkBox} aria-hidden="true">
                  {done && <span className={styles.checkMark}>✓</span>}
                </span>
              </button>

              <div className={styles.body}>
                <span className={styles.order}>{String(i + 1).padStart(2, '0')}</span>
                {trackId ? (
                  <Link
                    to={`/courses/${trackId}/lessons/${lesson.id}`}
                    className={styles.titleLink}
                  >
                    {lesson.title}
                    {locked && <span className={styles.lock} aria-label="Requiere PRO"> 🔒</span>}
                  </Link>
                ) : (
                  <span className={styles.title}>
                    {lesson.title}
                    {locked && <span className={styles.lock} aria-label="Requiere PRO"> 🔒</span>}
                  </span>
                )}
              </div>

              <span className={styles.minutes}>{lesson.minutes} min</span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
