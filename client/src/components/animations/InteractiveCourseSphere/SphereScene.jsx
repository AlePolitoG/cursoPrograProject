import { Canvas } from '@react-three/fiber';
import { Stats } from '@react-three/drei';
import { ParticleSphere } from './ParticleSphere.jsx';

// Canvas aislado en un chunk lazy (lo consume InteractiveCourseSphere).
// dpr topado en 2 para no duplicar trabajo en pantallas 3x; antialias off
// porque los puntos ya se ven suaves vía smoothstep en el fragment.
export default function SphereScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
      }}
      camera={{ position: [0, 0, 3.2], fov: 42, near: 0.1, far: 50 }}
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <ParticleSphere />
      {import.meta.env.DEV && <Stats className="r3f-stats" />}
    </Canvas>
  );
}
