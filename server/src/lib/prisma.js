import { PrismaClient } from '@prisma/client';
import { env } from './env.js';

// Single client instance per process. Nodemon restarts the process, so the
// hot-reload "many clients" pitfall (common in Next.js setups) doesn't apply
// here, but we still guard against accidental double-instantiation.
const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.__prisma ??
  new PrismaClient({
    log: env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });

if (env.NODE_ENV !== 'production') {
  globalForPrisma.__prisma = prisma;
}
