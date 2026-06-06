import { getLessonIndexInfo } from '../data/curriculum.js';

// Debe coincidir con FREE_LESSON_LIMIT del backend (server/src/lib/env.js).
// Las lecciones con índice <= este valor (dentro de su track) son gratis;
// el resto exige suscripción PRO. El servidor es la fuente de verdad: este
// chequeo es solo para la UI (mostrar candados / pantalla de upgrade).
export const FREE_LESSON_LIMIT = Number(import.meta.env.VITE_FREE_LESSON_LIMIT ?? 4);

/**
 * ¿Esta lección está bloqueada para el usuario actual?
 * @param {string} lessonId
 * @param {boolean} isSubscribed
 * @returns {boolean}
 */
export function isLessonLocked(lessonId, isSubscribed) {
  if (isSubscribed) return false;
  const info = getLessonIndexInfo(lessonId);
  if (!info) return false; // lección desconocida → que lo maneje el 404
  return info.lessonIndex > FREE_LESSON_LIMIT;
}
