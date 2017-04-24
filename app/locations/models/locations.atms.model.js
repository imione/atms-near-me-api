const core = require('../../core');

const logger = core.logger;
const database = core.database;
const Atms = database.models.atm;

/**
 * 범위 내의 모든 ATM정보 조회하기
 * @param myLocation  - 내 위치 정보 (myLocation.lat: 내 위도 myLocation.lng: 내 경도 range: 조회 범위)
 * @returns {Promise.<T>}
 */
function findAllAtmsInRange(myLocation) {
  const range = myLocation.range;
  logger.debug(`범위 [${range}] 내의 모든 ATM정보 조회`);
  const query = `SELECT id, lat, lng, bank, operatingHour, description,
(6371*acos(cos(radians(${myLocation.lat}))*cos(radians(lat))*cos(radians(lng)-radians(${myLocation.lng}))+sin(radians(${myLocation.lat}))*sin(radians(lat))))
AS distance
FROM atms
HAVING distance <= ${range}`;
  return Atms.sequelize.query(query, { type: database.Sequelize.QueryTypes.SELECT })
    .catch((err) => {
      logger.debug('범위 내의 모든 ATM정보 조회 실패');
      return Promise.reject(err);
    });
}

module.exports = {
  findAllAtmsInRange,
};
