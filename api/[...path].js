const fs = require('node:fs');
const path = require('node:path');

const TMP_DB_PATH = '/tmp/curso-progra.db';
let appPromise;

function prepareEnvironment() {
  process.env.NODE_ENV = process.env.NODE_ENV || 'production';

  if (!process.env.CORS_ORIGIN && process.env.VERCEL_URL) {
    process.env.CORS_ORIGIN = `https://${process.env.VERCEL_URL}`;
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

async function getApp() {
  if (!appPromise) {
    prepareEnvironment();
    prepareSqliteDatabase();
    appPromise = import('../server/src/app.js').then((mod) => mod.app);
  }

  return appPromise;
}

module.exports = async function handler(req, res) {
  const app = await getApp();
  return app(req, res);
};
