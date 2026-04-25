import { useEffect, useRef } from 'react';
import styles from './RetroBackground.module.css';

/**
 * RetroBackground
 * ───────────────
 * A fixed, full-viewport HTML5 Canvas painting a synthwave universe:
 *   ▸ vertical gradient (deep purple → magenta horizon → black ground)
 *   ▸ neon sun disc with horizontal cutoff bars
 *   ▸ animated perspective grid receding to the horizon
 *   ▸ three parallax layers of pixel-bright stars
 *
 * Performance contract:
 *   ▸ Single RAF loop, ~60fps target (16.6ms frame budget).
 *   ▸ Time-based animation (delta-driven) so a missed frame doesn't warp speed.
 *   ▸ DPR clamped to 2 to avoid retina meltdown on low-end GPUs.
 *   ▸ Pauses when document.hidden (no work for hidden tabs).
 *   ▸ Honors prefers-reduced-motion: paints one static frame and exits.
 *
 * The component owns no state — it talks to the DOM via refs only, so React
 * never re-renders during animation.
 */
export function RetroBackground({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    // Logical (CSS) dimensions; update on resize.
    let W = 0;
    let H = 0;
    let dpr = 1;

    // Star layers: [count, speed (px/sec), size, parallax depth (0..1)]
    const layers = [
      { count: 80, speed: 6,  size: 1,   color: '#6affff' },
      { count: 50, speed: 14, size: 1.5, color: '#ffffff' },
      { count: 25, speed: 28, size: 2,   color: '#ff5fa2' },
    ];
    /** @type {Array<Array<{x:number,y:number,tw:number}>>} */
    let stars = [];

    // Animation state
    let gridOffset = 0;     // 0..1, advances per frame, drives line motion
    let lastTs = 0;
    let raf = 0;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      W = Math.max(1, Math.floor(rect.width));
      H = Math.max(1, Math.floor(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedStars();
    }

    function seedStars() {
      const horizonY = H * 0.55;
      stars = layers.map((layer) =>
        Array.from({ length: layer.count }, () => ({
          x: Math.random() * W,
          y: Math.random() * horizonY,
          tw: Math.random() * Math.PI * 2, // twinkle phase
        })),
      );
    }

    function paintBackdrop() {
      // Sky gradient
      const sky = ctx.createLinearGradient(0, 0, 0, H);
      sky.addColorStop(0,    '#06010f');
      sky.addColorStop(0.35, '#180436');
      sky.addColorStop(0.55, '#5a0a6e');
      sky.addColorStop(0.56, '#ff2bd6');
      sky.addColorStop(0.62, '#0a0420');
      sky.addColorStop(1,    '#000000');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H);
    }

    function paintSun(t) {
      const horizonY = H * 0.55;
      const cx = W * 0.5;
      const r = Math.min(W, H) * 0.18;

      // Sun radial gradient
      const grad = ctx.createRadialGradient(cx, horizonY - r * 0.15, r * 0.1, cx, horizonY, r);
      grad.addColorStop(0,    '#fff7c2');
      grad.addColorStop(0.4,  '#ffd23f');
      grad.addColorStop(0.75, '#ff5fa2');
      grad.addColorStop(1,    'rgba(255, 43, 214, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, horizonY, r, Math.PI, 0); // upper half only
      ctx.closePath();
      ctx.fill();

      // Horizontal bands carving the sun (classic synthwave)
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      const bands = 6;
      for (let i = 0; i < bands; i++) {
        const k = i / bands;
        const y = horizonY - r * 0.95 * (1 - k * k);
        const h = 2 + i * 1.2;
        ctx.fillRect(cx - r, y, r * 2, h);
      }
      ctx.restore();
    }

    function paintGrid(dt) {
      const horizonY = H * 0.55;
      const groundH = H - horizonY;
      const speed = 0.55; // cycles per second
      gridOffset = (gridOffset + dt * speed) % 1;

      ctx.save();
      ctx.lineCap = 'butt';
      ctx.lineJoin = 'miter';

      // Horizontal lines — perspective: closer lines are farther apart.
      // Project lines at z = i - offset (with offset advancing) so the
      // pattern continuously slides toward the camera.
      const lineCount = 22;
      const focal = groundH * 0.85;
      ctx.strokeStyle = 'rgba(46, 240, 255, 0.55)';
      ctx.lineWidth = 1;
      ctx.shadowColor = 'rgba(46, 240, 255, 0.55)';
      ctx.shadowBlur = 6;
      ctx.beginPath();
      for (let i = 1; i <= lineCount; i++) {
        const z = i - gridOffset;
        const y = horizonY + focal / z;
        if (y > H + 2) continue;
        if (y < horizonY) continue;
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
      }
      ctx.stroke();

      // Vertical lines — fan from horizon center to the bottom edge.
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(255, 43, 214, 0.55)';
      ctx.strokeStyle = 'rgba(255, 43, 214, 0.6)';
      ctx.beginPath();
      const cx = W / 2;
      const cols = 18;
      const spread = W * 0.95;
      for (let i = -cols; i <= cols; i++) {
        const xBottom = cx + (i / cols) * spread;
        ctx.moveTo(cx, horizonY);
        ctx.lineTo(xBottom, H);
      }
      ctx.stroke();
      ctx.restore();
    }

    function paintStars(dt, t) {
      const horizonY = H * 0.55;
      ctx.save();
      for (let li = 0; li < layers.length; li++) {
        const layer = layers[li];
        const arr = stars[li];
        ctx.fillStyle = layer.color;
        ctx.shadowColor = layer.color;
        ctx.shadowBlur = 4;
        for (let i = 0; i < arr.length; i++) {
          const s = arr[i];
          // Drift to the left at parallax speed; wrap around.
          s.x -= layer.speed * dt;
          if (s.x < -2) {
            s.x = W + 2;
            s.y = Math.random() * horizonY;
          }
          // Twinkle: alpha modulated by sin of phase.
          const tw = 0.55 + 0.45 * Math.sin(s.tw + t * 2.4);
          ctx.globalAlpha = tw;
          ctx.fillRect(s.x, s.y, layer.size, layer.size);
        }
      }
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    function paintFrame(now) {
      const ts = now / 1000;
      const dt = lastTs ? Math.min(0.05, ts - lastTs) : 0.016;
      lastTs = ts;

      paintBackdrop();
      paintStars(dt, ts);
      paintSun(ts);
      paintGrid(dt);
    }

    function loop(now) {
      paintFrame(now);
      raf = requestAnimationFrame(loop);
    }

    // ── lifecycle ───────────────────────────────────────────────
    resize();

    if (reduce) {
      // One static frame, no loop.
      paintFrame(performance.now());
      const onResize = () => {
        resize();
        paintFrame(performance.now());
      };
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }

    raf = requestAnimationFrame(loop);

    const onResize = () => resize();
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!raf) {
        lastTs = 0;
        raf = requestAnimationFrame(loop);
      }
    };

    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <div className={`${styles.wrap} ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.scanlines} />
      <div className={styles.vignette} />
    </div>
  );
}

export default RetroBackground;
