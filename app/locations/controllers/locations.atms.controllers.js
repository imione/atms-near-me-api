const core = require('../../core');
const models = require('../models');

const logger = core.logger;

/**
 * 내 주변의 ATM정보 얻어오기
 * @param req
 * @param res
 * @param next
 */
function getAtmsAroundMe(req, res, next) {
  logger.debug('내 주변의 ATM정보 얻어오기');

  const myLocation = {
    myLat: req.query.lat,
    myLng: req.query.lng,
    range: req.query.range,
  };
  Promise.resolve(myLocation)
    .then(() => {
      logger.debug('내 주변의 ATM 모두 조회');
      return models.atms.findAllAtmsInRange(myLocation.range);
    })
    .then((atmList) => {
      logger.debug('내 주변의 ATM 모두 조회 성공');
      return res.json({
        success: 1,
        message: '내 주변의 ATM 모두 조회 성공',
        result: atmList,
      });
    })
    .catch((err) => {
      logger.error('내 주변의 ATM정보 얻어오기 실패');
      logger.error(err);
      next(err);
    });
}

module.exports = {
  getAtmsAroundMe,
};
