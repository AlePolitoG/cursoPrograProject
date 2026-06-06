import { Suspense, lazy, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CourseCard } from '../../components/CourseCard/CourseCard.jsx';
import { CheckoutButton } from '../../components/CheckoutButton/CheckoutButton.jsx';
import { ProgressBar } from '../../components/ProgressBar/ProgressBar.jsx';
import { curriculum } from '../../data/curriculum.js';
import { useAuth } from '../../hooks/useAuth.js';
import { useProgress } from '../../hooks/useProgress.js';
import { useTypewriter } from '../../hooks/useTypewriter.js';
import styles from './DashboardPage.module.css';

// Chunk separado — R3F (~300 KB) no entra al bundle de login/signup.
const InteractiveCourseSphere = lazy(() =>
  import('../../components/animations/InteractiveCourseSphere/InteractiveCourseSphere.jsx'),
);

export function DashboardPage() {
  const { user } = useAuth();
  const { completed } = useProgress();

  // Banner de felicitaciones tras un pago exitoso (?checkout=success).
  const [searchParams, setSearchParams] = useSearchParams();
  const [showCongrats, setShowCongrats] = useState(searchParams.get('checkout') === 'success');

  const dismissCongrats = () => {
    setShowCongrats(false);
    // Limpia el parámetro de la URL para que no reaparezca al recargar.
    searchParams.delete('checkout');
    setSearchParams(searchParams, { replace: true });
  };

  const totals = useMemo(() => {
    const allLessons = curriculum.flatMap((t) => t.sections.flatMap((s) => s.lessons));
    const totalLessons = allLessons.length;
    const doneLessons = allLessons.reduce((n, l) => n + (completed.has(l.id) ? 1 : 0), 0);
    const totalMinutes = allLessons.reduce((n, l) => n + l.minutes, 0);
    const doneMinutes = allLessons.reduce((n, l) => n + (completed.has(l.id) ? l.minutes : 0), 0);
    return { totalLessons, doneLessons, totalMinutes, doneMinutes };
  }, [completed]);

  const hours = Math.round(totals.doneMinutes / 60);
  const pct = totals.totalLessons ? Math.round((totals.doneLessons / totals.totalLessons) * 100) : 0;

  const greetingText = `PLAYER 1 — ${user?.name?.toUpperCase() ?? 'INVITADO'}`;
  const subtitleText =
    'Ruta dividida en tres pistas secuenciales. Avanzá a tu ritmo. Marcá cada lección al terminarla.';

  const greeting = useTypewriter(greetingText, { speed: 55, startDelay: 120 });
  const subtitle = useTypewriter(subtitleText, {
    speed: 22,
    startDelay: 120 + greetingText.length * 55 + 220,
    enabled: greeting.done,
  });

  return (
    <div className={`${styles.page} glass-panel`}>
      {showCongrats && (
        <div className={styles.congrats} role="status">
          <span className={styles.congratsIcon} aria-hidden="true">🎉</span>
          <div className={styles.congratsText}>
            <p className={styles.congratsTitle}>¡FELICIDADES! YA SOS PRO ★</p>
            <p className={styles.congratsSub}>
              Pago confirmado. Todas las lecciones quedaron desbloqueadas. ¡A jugar!
            </p>
          </div>
          <button
            type="button"
            className={styles.congratsClose}
            onClick={dismissCongrats}
            aria-label="Cerrar mensaje"
          >
            ✕
          </button>
        </div>
      )}

      <header className={styles.hero}>
        <div className={styles.heroText}>
          <p className={styles.eyebrow}>
            ◆ STAGE 01 · {new Date().toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}
          </p>

          <h1 className={styles.title} aria-label={greetingText}>
            <span aria-hidden="true">
              {greeting.output}
              {!greeting.done && <span className="caret" />}
            </span>
          </h1>

          <p className={styles.subtitle} aria-label={subtitleText}>
            <span aria-hidden="true">
              {subtitle.output}
              {greeting.done && !subtitle.done && <span className="caret" />}
            </span>
          </p>

          <div className={styles.heroActions}>
            <a href="#tracks" className="btn-arcade">▶ Continuar partida</a>
            <a href="#stats" className="btn-arcade magenta">High Score</a>
            <CheckoutButton />
          </div>
        </div>

        <div className={styles.heroSphere}>
          <Suspense fallback={null}>
            <InteractiveCourseSphere />
          </Suspense>
        </div>
      </header>

      <section id="stats" className={styles.stats} aria-label="Resumen de progreso">
        <Stat label="Lecciones" value={totals.doneLessons} denom={`/ ${totals.totalLessons}`} accent="cyan" />
        <Stat label="Tiempo"    value={hours}             denom="HRS"                          accent="yellow" />
        <Stat label="Progreso"  value={pct}               denom="%"                            accent="magenta" />
        <div className={styles.statProgress}>
          <ProgressBar
            value={totals.doneLessons}
            max={totals.totalLessons}
            size="lg"
            label="Progreso general del curso"
          />
        </div>
      </section>

      <section id="tracks" className={styles.tracks} aria-labelledby="tracks-title">
        <header className={styles.tracksHead}>
          <h2 id="tracks-title" className={styles.tracksTitle}>SELECT YOUR QUEST</h2>
          <p className={styles.tracksNote}>► Tres pistas. De cero a decidir arquitectura.</p>
        </header>
        <div className={styles.grid}>
          {curriculum.map((t, i) => (
            <CourseCard key={t.id} trackId={t.id} questIndex={i} />
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value, denom, accent }) {
  return (
    <div className={`${styles.statBlock} ${styles[`stat_${accent}`]} bevel`}>
      <span className={styles.statLabel}>{label}</span>
      <span className={styles.statValue}>
        {value}
        <span className={styles.statDenom}>{denom}</span>
      </span>
    </div>
  );
}
