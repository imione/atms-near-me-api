const atms = require('../controllers').atms;

function routes(app) {
  app.route('/atms')
    .get(atms.getAtmsAroundMe);
}

module.exports = routes;
