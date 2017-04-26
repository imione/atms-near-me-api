const core = require('./app/core');

core.database.connect()
  .then(core.express.start.bind(core.express))
  .catch((err) => {
    core.logger.error(err.stack);
    process.exit(1);
  });
