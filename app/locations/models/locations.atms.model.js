const core = require('../../core');

const logger = core.logger;
const database = core.database;

const Atms = database.models.atm;

/**
 * 범위 내의 모든 ATM정보 조회
 * @param range
 * @returns {Promise.<T>}
 */
function findAllAtmsInRange(range) {
  logger.debug(`범위 [${range}] 내의 모든 ATM정보 조회`);
  return Atms.findAll()
    .catch((err) => {
      logger.debug('범위 내의 모든 ATM정보 조회 실패');
      return Promise.reject(err);
    });
}

module.exports = {
  findAllAtmsInRange,
};
