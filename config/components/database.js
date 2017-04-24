const name = process.env.DB_NAME;
const host = process.env.DB_HOST;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const port = 3306;
const dialect = 'mysql';
const enableSequelizeLog = false;
const ssl = false;
const sync = false;
const modelPathPattern = 'app/**/sequelModels/*.model.js';

module.exports = {
  name,
  host,
  username,
  password,
  port,
  dialect,
  enableSequelizeLog,
  ssl,
  sync,
  modelPathPattern,
};
