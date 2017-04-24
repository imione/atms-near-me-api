const logger = require('./components/logger');
const express = require('./components/express');
const database = require('./components/database');
const morgan = require('./components/morgan');
const cors = require('./components/cors');

module.exports = {
  logger,
  express,
  database,
  morgan,
  cors,
};
