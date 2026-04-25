import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { HttpError } from '../lib/httpError.js';

// In a real system this would come from the DB or a CMS. For now we
// hard-code a stub so the route can return *something* once the paywall
// permits access. Mirror the frontend's curriculum.js shape if you wire it
// to real content.
const COURSES = {
  fundamentos: {
    id: 'fundamentos',
    title: 'Fundamentos',
    lessons: Array.from({ length: 12 }, (_, i) => ({
      index: i,
      title: `Lección ${i + 1}`,
      body: `Contenido de la lección ${i + 1}.`,
    })),
  },
};

/** GET /api/courses/:courseId/lessons/:lessonIndex
 *  Mounted behind authMiddleware → subscriptionGuard, so by the time we get
 *  here the user is authenticated AND allowed to read this lesson.
 */
export async function getLesson(req, res) {
  const { courseId, lessonIndex } = req.params;
  const idx = Number.parseInt(lessonIndex, 10);

  const course = COURSES[courseId];
  if (!course) throw new HttpError(404, 'Course not found');

  const lesson = course.lessons[idx];
  if (!lesson) throw new HttpError(404, 'Lesson not found');

  res.json({ courseId, lesson });
}

const progressSchema = z.object({
  completed: z.boolean(),
});

/** POST /api/courses/:courseId/progress/:lessonIndex
 *  Marks (or unmarks) a lesson as completed for the authenticated user.
 */
export async function upsertProgress(req, res) {
  const parsed = progressSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new HttpError(400, 'Invalid input', parsed.error.flatten().fieldErrors);
  }
  const { courseId } = req.params;
  const lessonIndex = Number.parseInt(req.params.lessonIndex, 10);
  const { completed } = parsed.data;

  const row = await prisma.progress.upsert({
    where: {
      userId_courseId_lessonIndex: {
        userId: req.user.id,
        courseId,
        lessonIndex,
      },
    },
    update: { completed },
    create: { userId: req.user.id, courseId, lessonIndex, completed },
  });

  res.status(200).json({ progress: row });
}

/** GET /api/courses/:courseId/progress — list all progress for this user. */
export async function listProgress(req, res) {
  const { courseId } = req.params;
  const rows = await prisma.progress.findMany({
    where: { userId: req.user.id, courseId },
    orderBy: { lessonIndex: 'asc' },
  });
  res.json({ courseId, progress: rows });
}

/** GET /api/courses/progress — list all progress across all courses for this user. */
export async function listAllProgress(req, res) {
  const rows = await prisma.progress.findMany({
    where: { userId: req.user.id },
  });
  res.json({ progress: rows });
}
