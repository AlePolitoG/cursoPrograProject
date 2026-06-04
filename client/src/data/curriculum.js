export const curriculum = [
  {
    id: 'foundations',
    number: '01',
    title: 'Fundamentos',
    tagline: 'El terreno firme: lógica, HTML, CSS y la mentalidad del desarrollador.',
    duration: '≈ 120 horas',
    sections: [
      {
        id: 'found-intro',
        title: 'Introducción al desarrollo',
        lessons: [
          { id: 'found-1', title: 'Cómo funciona la web', minutes: 20 },
          { id: 'found-2', title: 'Git y control de versiones', minutes: 35 },
          { id: 'found-3', title: 'Herramientas: editor y terminal', minutes: 25 },
        ],
      },
      {
        id: 'found-html-css',
        title: 'HTML y CSS desde cero',
        lessons: [
          { id: 'found-4', title: 'Estructura semántica con HTML5', minutes: 40 },
          { id: 'found-5', title: 'Box model y flujo normal', minutes: 45 },
          { id: 'found-6', title: 'Flexbox en profundidad', minutes: 60 },
          { id: 'found-7', title: 'CSS Grid para layouts complejos', minutes: 55 },
          { id: 'found-8', title: 'Diseño responsive mobile-first', minutes: 45 },
        ],
      },
      {
        id: 'found-js',
        title: 'JavaScript fundacional',
        lessons: [
          { id: 'found-9', title: 'Tipos, variables y control de flujo', minutes: 40 },
          { id: 'found-10', title: 'Funciones y scope léxico', minutes: 45 },
          { id: 'found-11', title: 'Arrays y métodos de orden superior', minutes: 50 },
          { id: 'found-12', title: 'DOM: consultar, crear, reaccionar', minutes: 60 },
          { id: 'found-13', title: 'Proyecto: clon minimalista de Etch-a-Sketch', minutes: 180 },
        ],
      },
    ],
  },
  {
    id: 'intermediate',
    number: '02',
    title: 'Intermedio',
    tagline: 'Asíncrono, módulos, pruebas y React: empezás a construir producto.',
    duration: '≈ 160 horas',
    sections: [
      {
        id: 'int-js-adv',
        title: 'JavaScript intermedio',
        lessons: [
          { id: 'int-1', title: 'Objetos, prototipos y this', minutes: 55 },
          { id: 'int-2', title: 'Clases y patrones de composición', minutes: 50 },
          { id: 'int-3', title: 'Promesas y async/await', minutes: 60 },
          { id: 'int-4', title: 'Fetch, errores y AbortController', minutes: 45 },
        ],
      },
      {
        id: 'int-tooling',
        title: 'Tooling moderno',
        lessons: [
          { id: 'int-5', title: 'Módulos ES, bundlers y Vite', minutes: 40 },
          { id: 'int-6', title: 'ESLint y convenciones de código', minutes: 30 },
          { id: 'int-7', title: 'Pruebas unitarias con Vitest', minutes: 55 },
        ],
      },
      {
        id: 'int-react',
        title: 'React: primer paso',
        lessons: [
          { id: 'int-8', title: 'Componentes funcionales y JSX', minutes: 45 },
          { id: 'int-9', title: 'Estado local con useState', minutes: 40 },
          { id: 'int-10', title: 'Efectos y ciclo de vida con useEffect', minutes: 50 },
          { id: 'int-11', title: 'Contexto y colocación de estado', minutes: 55 },
          { id: 'int-12', title: 'Proyecto: gestor de biblioteca personal', minutes: 240 },
        ],
      },
    ],
  },
  {
    id: 'advanced',
    number: '03',
    title: 'Avanzado',
    tagline: 'Producto, arquitectura y performance: pasás de implementar a decidir.',
    duration: '≈ 200 horas',
    sections: [
      {
        id: 'adv-arch',
        title: 'Arquitectura de frontend',
        lessons: [
          { id: 'adv-1', title: 'Estado global: cuándo y con qué', minutes: 60 },
          { id: 'adv-2', title: 'Data fetching: caché, revalidación, streaming', minutes: 75 },
          { id: 'adv-3', title: 'Routing y code-splitting por ruta', minutes: 55 },
          { id: 'adv-4', title: 'Accesibilidad operativa (WAI-ARIA)', minutes: 60 },
        ],
      },
      {
        id: 'adv-perf',
        title: 'Performance y calidad',
        lessons: [
          { id: 'adv-5', title: 'Core Web Vitals y presupuestos', minutes: 50 },
          { id: 'adv-6', title: 'Rendering: memo, useMemo, useCallback', minutes: 45 },
          { id: 'adv-7', title: 'Imágenes, fuentes y carga crítica', minutes: 40 },
        ],
      },
      {
        id: 'adv-ship',
        title: 'Lanzar y operar',
        lessons: [
          { id: 'adv-8', title: 'CI/CD para frontend', minutes: 50 },
          { id: 'adv-9', title: 'Monitoreo, errores y telemetría', minutes: 45 },
          { id: 'adv-10', title: 'Proyecto final: plataforma de cursos', minutes: 480 },
        ],
      },
    ],
  },
];

export const findTrack = (id) => curriculum.find((t) => t.id === id) ?? null;

export const allLessons = () =>
  curriculum.flatMap((t) => t.sections.flatMap((s) => s.lessons.map((l) => ({ ...l, trackId: t.id, sectionId: s.id }))));

export const getLessonIndexInfo = (lessonId) => {
  for (const track of curriculum) {
    let index = 0;
    for (const section of track.sections) {
      for (const lesson of section.lessons) {
        if (lesson.id === lessonId) {
          return { courseId: track.id, lessonIndex: index };
        }
        index++;
      }
    }
  }
  return null;
};

export const getLessonIdFromIndex = (courseId, lessonIndex) => {
  const track = curriculum.find(t => t.id === courseId);
  if (!track) return null;
  let index = 0;
  for (const section of track.sections) {
    for (const lesson of section.lessons) {
      if (index === lessonIndex) return lesson.id;
      index++;
    }
  }
  return null;
};

export const findLessonContext = (lessonId) => {
  for (const track of curriculum) {
    const flat = track.sections.flatMap((s) =>
      s.lessons.map((l) => ({ ...l, section: s }))
    );
    const idx = flat.findIndex((l) => l.id === lessonId);
    if (idx === -1) continue;
    return {
      track,
      section: flat[idx].section,
      lesson: flat[idx],
      prev: idx > 0 ? flat[idx - 1] : null,
      next: idx < flat.length - 1 ? flat[idx + 1] : null,
    };
  }
  return null;
};
