import { useEffect, useRef, useState } from 'react';

/**
 * useTypewriter — RPG-style character-by-character text reveal.
 *
 * RAF-driven (one timer regardless of speed), DPR-agnostic, and respects
 * prefers-reduced-motion (reveals instantly). Cancels cleanly on unmount or
 * when the input text changes.
 *
 *   const { output, done, skip } = useTypewriter('Bienvenido', { speed: 38 });
 *
 * @param {string} text                Full string to type out.
 * @param {object} [opts]
 * @param {number} [opts.speed=38]     Milliseconds per character.
 * @param {number} [opts.startDelay=0] Delay before the first character.
 * @param {boolean} [opts.enabled=true]  Disable to render full text immediately.
 * @param {() => void} [opts.onDone]   Fires once when the full text is shown.
 * @returns {{ output: string, done: boolean, skip: () => void }}
 */
export function useTypewriter(text, opts = {}) {
  const { speed = 38, startDelay = 0, enabled = true, onDone } = opts;
  const reduce = useReducedMotion();

  const [output, setOutput] = useState(() => (enabled && !reduce ? '' : text));
  const [done, setDone] = useState(() => !enabled || reduce);

  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    if (!enabled || reduce) {
      setOutput(text);
      setDone(true);
      onDoneRef.current?.();
      return;
    }

    setOutput('');
    setDone(false);

    let raf = 0;
    let startTs = 0;
    let cancelled = false;
    let lastIdx = 0;

    const tick = (now) => {
      if (cancelled) return;
      if (!startTs) startTs = now + startDelay;
      const elapsed = now - startTs;
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const idx = Math.min(text.length, Math.floor(elapsed / speed));
      if (idx !== lastIdx) {
        lastIdx = idx;
        setOutput(text.slice(0, idx));
      }
      if (idx < text.length) {
        raf = requestAnimationFrame(tick);
      } else {
        setDone(true);
        onDoneRef.current?.();
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [text, speed, startDelay, enabled, reduce]);

  const skip = () => {
    setOutput(text);
    setDone(true);
  };

  return { output, done, skip };
}

function useReducedMotion() {
  const [reduce, setReduce] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e) => setReduce(e.matches);
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
  }, []);

  return reduce;
}
