import { Link, useParams } from 'react-router-dom';
import { findLessonContext } from '../../data/curriculum.js';
import { lessonContent } from '../../data/lessonContent.js';
import { useProgress } from '../../hooks/useProgress.js';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage.jsx';
import styles from './LessonPage.module.css';

export function LessonPage() {
  const { lessonId } = useParams();
  const context = findLessonContext(lessonId);
  const { isComplete, toggle } = useProgress();

  if (!context) return <NotFoundPage />;

  const { track, section, lesson, prev, next } = context;
  const content = lessonContent[lessonId];
  const done = isComplete(lessonId);

  if (!content) return <NotFoundPage />;

  return (
    <div className={`${styles.page} glass-panel`}>
      <nav className={styles.nav}>
        <Link to="/dashboard">Panel</Link>
        <span>/</span>
        <Link to={`/courses/${track.id}`}>{track.title}</Link>
        <span>/</span>
        <span>{lesson.title}</span>
      </nav>

      <header className={styles.hero}>
        <p className={styles.eyebrow}>
          Pista {track.number} · {section.title} · {lesson.minutes} min
        </p>
        <h1 className={styles.title}>{lesson.title}</h1>
      </header>

      <div className={styles.objectivesBox}>
        <p className={styles.boxLabel}>Objetivos</p>
        <ul className={styles.objectivesList}>
          {content.objectives.map((o, i) => (
            <li key={i}>{o}</li>
          ))}
        </ul>
      </div>

      <div className={styles.content}>
        {content.sections.map((sec, i) => (
          <section key={i} className={styles.section}>
            <h2 className={styles.sectionTitle}>{sec.title}</h2>
            <p className={styles.sectionBody}>{sec.body}</p>
            {sec.code && (
              <pre className={styles.codeBlock}>
                <code>{sec.code}</code>
              </pre>
            )}
          </section>
        ))}
      </div>

      <div className={styles.conceptsBox}>
        <p className={`${styles.boxLabel} ${styles.boxLabelMagenta}`}>Conceptos clave</p>
        <dl className={styles.conceptsList}>
          {content.concepts.map((c, i) => (
            <div key={i} className={styles.conceptItem}>
              <dt className={styles.conceptTerm}>{c.term}</dt>
              <dd className={styles.conceptDef}>{c.definition}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className={styles.exercisesBox}>
        <p className={`${styles.boxLabel} ${styles.boxLabelYellow}`}>Ejercicios</p>
        <ol className={styles.exercisesList}>
          {content.exercises.map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ol>
      </div>

      <div className={styles.completionBar}>
        <button
          type="button"
          className={`btn-arcade ${done ? 'yellow' : ''}`}
          onClick={() => toggle(lessonId)}
        >
          {done ? '✓ Completada' : 'Marcar como completada'}
        </button>
      </div>

      <nav className={styles.lessonNav}>
        {prev ? (
          <Link
            to={`/courses/${track.id}/lessons/${prev.id}`}
            className={styles.navPrev}
          >
            <span>←</span>
            <span className={styles.navLabel}>Anterior</span>
            <span className={styles.navTitle}>{prev.title}</span>
          </Link>
        ) : (
          <div />
        )}
        <Link to={`/courses/${track.id}`} className={styles.navTrack}>
          Ver track
        </Link>
        {next ? (
          <Link
            to={`/courses/${track.id}/lessons/${next.id}`}
            className={styles.navNext}
          >
            <span className={styles.navLabel}>Siguiente</span>
            <span className={styles.navTitle}>{next.title}</span>
            <span>→</span>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </div>
  );
}
