import { memo, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  IcosahedronGeometry,
  Plane,
  Raycaster,
  Vector3,
} from 'three';
import { fragmentShader, vertexShader } from './shaders.js';
import { useSphereInteractions } from './useSphereInteractions.js';

// Convierte el color CSS del token --accent a un vec3 (r, g, b en 0..1).
const AMBER = new Color('#e8a33b');

function ParticleSphereImpl() {
  const groupRef = useRef(null);
  const { camera } = useThree();
  const interactions = useSphereInteractions();

  // Geometría: muestreamos los vértices de un icosaedro subdividido.
  // Distribución ~uniforme sobre la esfera sin polos apiñados (random spherical)
  // ni la complejidad de una lattice de Fibonacci.
  const geometry = useMemo(() => {
    const ico = new IcosahedronGeometry(1, 6);
    const src = ico.attributes.position.array;
    const positions = new Float32Array(src);
    ico.dispose();

    const g = new BufferGeometry();
    g.setAttribute('position', new BufferAttribute(positions, 3));
    g.computeBoundingSphere();
    return g;
  }, []);

  // Uniforms creados una sola vez; mutaremos .value por frame.
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new Vector3(0, 0, 0) },
      uHoverStrength: { value: 0 },
      uPulse: { value: 0 },
      uColor: { value: AMBER },
    }),
    [],
  );

  // Objetos reutilizables — cero allocations en el hot loop.
  const raycaster = useMemo(() => new Raycaster(), []);
  const plane = useMemo(() => new Plane(new Vector3(0, 0, 1), 0), []);
  const worldHit = useMemo(() => new Vector3(), []);
  const ndc = useMemo(() => ({ x: 0, y: 0 }), []);

  useFrame((_, delta) => {
    const { mouseRef, hoverTargetRef, pulseRef, tabVisibleRef, inViewRef } = interactions;

    // Pausa total cuando no aporta: pestaña oculta o scrolleado fuera de vista.
    if (!tabVisibleRef.current || !inViewRef.current) return;

    // Suavizado exponencial framerate-independent:
    // s = 1 - base^delta. base pequeño → respuesta más rápida.
    const s = 1 - Math.pow(0.001, delta);

    uniforms.uTime.value += delta;

    // Proyección del cursor sobre el plano z=0 vía raycaster (una sola vez por frame).
    ndc.x = mouseRef.current.x;
    ndc.y = mouseRef.current.y;
    raycaster.setFromCamera(ndc, camera);
    raycaster.ray.intersectPlane(plane, worldHit);
    uniforms.uMouse.value.lerp(worldHit, s * 0.9);

    // Hover strength.
    uniforms.uHoverStrength.value +=
      (hoverTargetRef.current - uniforms.uHoverStrength.value) * s;

    // Envelope del pulso: sin(πt) * exp(-2t) — entrada suave, decaimiento exponencial.
    const elapsed = (performance.now() - pulseRef.current.start) / 700;
    if (elapsed >= 0 && elapsed <= 1) {
      uniforms.uPulse.value = Math.sin(elapsed * Math.PI) * Math.exp(-elapsed * 2);
    } else {
      uniforms.uPulse.value = 0;
    }

    // Rotación "chase" — la esfera persigue al cursor sin pegarse a él.
    const g = groupRef.current;
    if (g) {
      g.rotation.y += (mouseRef.current.x * 0.35 - g.rotation.y) * s;
      g.rotation.x += (-mouseRef.current.y * 0.25 - g.rotation.x) * s;
    }
  });

  return (
    <group ref={groupRef}>
      <points geometry={geometry}>
        <shaderMaterial
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </points>
    </group>
  );
}

export const ParticleSphere = memo(ParticleSphereImpl);
