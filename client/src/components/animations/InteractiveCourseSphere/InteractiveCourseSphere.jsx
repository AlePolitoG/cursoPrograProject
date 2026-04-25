import { Suspense, lazy, useEffect, useState } from 'react';
import styles from './InteractiveCourseSphere.module.css';

// Code-split del árbol R3F: nunca entra al bundle de Login/Signup.
const SphereScene = lazy(() => import('./SphereScene.jsx'));

// Decide si se renderiza la escena 3D o el fallback visual puro CSS.
// Criterios: reduced-motion, viewport < 640px, ausencia de WebGL2.
function useShouldRenderScene() {
  const [shouldRender, setShouldRender] = useState(() => {
    if (typeof window === 'undefined') return false;
    if (!window.WebGL2RenderingContext) return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    if (window.matchMedia('(max-width: 639px)').matches) return false;
    return true;
  });

  useEffect(() => {
    const motionMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sizeMQ = window.matchMedia('(max-width: 639px)');
    const update = () => {
      setShouldRender(
        !!window.WebGL2RenderingContext && !motionMQ.matches && !sizeMQ.matches,
      );
    };
    motionMQ.addEventListener('change', update);
    sizeMQ.addEventListener('change', update);
    return () => {
      motionMQ.removeEventListener('change', update);
      sizeMQ.removeEventListener('change', update);
    };
  }, []);

  return shouldRender;
}

function FallbackVisual() {
  return <div className={styles.fallback} aria-hidden="true" />;
}

export function InteractiveCourseSphere() {
  const shouldRender = useShouldRenderScene();

  return (
    <section
      className={styles.wrap}
      aria-label="Visualización interactiva del curso"
    >
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.masked}>
        {shouldRender ? (
          <Suspense fallback={<FallbackVisual />}>
            <SphereScene />
          </Suspense>
        ) : (
          <FallbackVisual />
        )}
      </div>
    </section>
  );
}

export default InteractiveCourseSphere;
