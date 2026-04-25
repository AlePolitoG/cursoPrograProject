// Shaders GLSL para la esfera reactiva. El desplazamiento ocurre en GPU
// para mantener ~60 fps con miles de partículas — nada de trabajo por-vértice
// en CPU, nada de mutación de BufferAttribute en useFrame.

export const vertexShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec3  uMouse;
  uniform float uHoverStrength;
  uniform float uPulse;

  varying float vGlow;

  // Pseudo-ruido 3D barato: tres senos desfasados.
  // No es simplex real, pero para 'wobble' ambiental alcanza y sobra.
  float pseudo3(vec3 p, float t) {
    return sin(p.x * 2.3 + t * 0.6)
         + sin(p.y * 3.1 + t * 0.7)
         + sin(p.z * 2.7 + t * 0.5);
  }

  void main() {
    vec3 basePos = position;
    vec3 nrm = normalize(basePos);

    // Respiración ambiental constante.
    float wobble = pseudo3(basePos * 1.4, uTime) * 0.015;

    // Distancia en world-space a la proyección del cursor sobre el plano z=0.
    vec4 worldPos = modelMatrix * vec4(basePos, 1.0);
    float dist = distance(worldPos.xyz, uMouse);

    // Campo suave alrededor del cursor (solo cuando hay hover).
    float falloff = smoothstep(0.7, 0.0, dist) * uHoverStrength;

    // Onda expansiva del click — uniforme en toda la esfera.
    float pulse = uPulse * 0.32;

    // Desplazamiento total a lo largo de la normal (radial, porque es esfera unidad).
    vec3 displaced = basePos + nrm * (wobble + falloff * 0.22 + pulse);

    vec4 mvPos = modelViewMatrix * vec4(displaced, 1.0);
    gl_Position = projectionMatrix * mvPos;

    // Tamaño del punto en pantalla — crece cerca del cursor y durante el pulso.
    float size = 2.2 * (1.0 + falloff * 2.2 + pulse * 1.8) * (320.0 / -mvPos.z);
    gl_PointSize = clamp(size, 1.0, 28.0);

    // Intensidad que pasamos al fragment para modular brillo.
    vGlow = 0.32 + falloff * 0.95 + pulse * 0.85;
  }
`;

export const fragmentShader = /* glsl */ `
  precision highp float;

  uniform vec3 uColor;
  varying float vGlow;

  void main() {
    // Punto circular con borde suave (sin texturas).
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float alpha = smoothstep(0.5, 0.04, d);

    // Color ámbar modulado por la intensidad calculada en el vertex.
    vec3 col = uColor * vGlow;

    gl_FragColor = vec4(col, alpha);
  }
`;
