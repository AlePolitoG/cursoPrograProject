import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';

// Listeners a nivel ventana (el click "en cualquier parte" lo pide el brief)
// + IntersectionObserver y visibilitychange para pausar cuando la escena
// no aporta: fuera de viewport o pestaña en segundo plano.
export function useSphereInteractions() {
  const canvas = useThree((s) => s.gl.domElement);

  const mouseRef = useRef({ x: 0, y: 0 });
  const hoverTargetRef = useRef(0);
  const pulseRef = useRef({ start: -Infinity });
  const tabVisibleRef = useRef(true);
  const inViewRef = useRef(true);

  useEffect(() => {
    if (!canvas) return;

    const onMove = (e) => {
      // NDC (-1..1) usando el tamaño de la ventana, no del canvas:
      // así el "hover" se siente natural cuando el cursor está cerca pero no exactamente encima.
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -((e.clientY / window.innerHeight) * 2 - 1);

      const r = canvas.getBoundingClientRect();
      const inside =
        e.clientX >= r.left &&
        e.clientX <= r.right &&
        e.clientY >= r.top &&
        e.clientY <= r.bottom;
      hoverTargetRef.current = inside ? 1 : 0;
    };

    const onDown = () => {
      pulseRef.current.start = performance.now();
    };

    const onVisibility = () => {
      tabVisibleRef.current = document.visibilityState !== 'hidden';
    };

    let io;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) inViewRef.current = entry.isIntersecting;
        },
        { threshold: 0 },
      );
      io.observe(canvas);
    }

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      document.removeEventListener('visibilitychange', onVisibility);
      io?.disconnect();
    };
  }, [canvas]);

  return { mouseRef, hoverTargetRef, pulseRef, tabVisibleRef, inViewRef };
}
