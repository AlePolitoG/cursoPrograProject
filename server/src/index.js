import { app } from './app.js';
import { env } from './lib/env.js';
import { prisma } from './lib/prisma.js';

// ── Lifecycle ────────────────────────────────────────────────────────
const server = app.listen(env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`✓ curso-progra api listening on :${env.PORT} (${env.NODE_ENV})`);
});

// Graceful shutdown — drain in-flight requests, then close the DB pool.
async function shutdown(signal) {
  // eslint-disable-next-line no-console
  console.log(`\n${signal} received — shutting down`);
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
  // Force-exit if graceful shutdown stalls.
  setTimeout(() => process.exit(1), 10_000).unref();
}
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT',  () => shutdown('SIGINT'));
