const fs = require('node:fs');
const path = require('node:path');

const TMP_DB_PATH = '/tmp/curso-progra.db';
let appPromise;

function prepareEnvironment(req) {
  process.env.NODE_ENV = process.env.NODE_ENV || 'production';

  const requestOrigin = req.headers.host ? `https://${req.headers.host}` : null;
  const vercelOrigin = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null;

  if (
    (!process.env.CORS_ORIGIN || process.env.CORS_ORIGIN.includes('TU-PROYECTO')) &&
    (vercelOrigin || requestOrigin)
  ) {
    process.env.CORS_ORIGIN = vercelOrigin || requestOrigin;
  }

  // Keeps the demo bootable on Vercel. Set a real JWT_SECRET in Vercel
  // Environment Variables for any non-demo deployment.
  process.env.JWT_SECRET =
    process.env.JWT_SECRET || 'curso-progra-demo-jwt-secret-change-in-vercel';
}

function prepareSqliteDatabase() {
  const databaseUrl = process.env.DATABASE_URL ?? '';
  if (databaseUrl && !databaseUrl.startsWith('file:')) return;

  process.env.DATABASE_URL = `file:${TMP_DB_PATH}`;

  if (fs.existsSync(TMP_DB_PATH)) return;

  const bundledDbPath = path.resolve(__dirname, '../server/prisma/dev.db');
  fs.copyFileSync(bundledDbPath, TMP_DB_PATH);
}

function restoreOriginalApiPath(req) {
  const requestUrl = new URL(req.url, 'http://vercel.local');
  const rewrittenPath = requestUrl.searchParams.get('path');

  if (!rewrittenPath) return;

  requestUrl.searchParams.delete('path');
  const query = requestUrl.searchParams.toString();
  req.url = `/api/${rewrittenPath}${query ? `?${query}` : ''}`;
}

async function getApp(req) {
  if (!appPromise) {
    prepareEnvironment(req);
    prepareSqliteDatabase();
    appPromise = import('../server/src/app.js').then((mod) => mod.app);
  }

  return appPromise;
}

module.exports = async function handler(req, res) {
  restoreOriginalApiPath(req);
  const app = await getApp(req);
  return app(req, res);
};
