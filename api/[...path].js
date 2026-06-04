const fs = require('node:fs');
const path = require('node:path');

const TMP_DB_PATH = '/tmp/curso-progra.db';
let appPromise;

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
    prepareSqliteDatabase();
    appPromise = import('../server/src/app.js').then((mod) => mod.app);
  }

  return appPromise;
}

module.exports = async function handler(req, res) {
  const app = await getApp();
  return app(req, res);
};
