const path = require('path');

const Sequelize = require('sequelize');

const config = require('../../config');
const common = require('../common');
const logger = require('./logger');

class Database {
  constructor() {
    logger.debug('시퀄라이즈 객체 초기화');
    this.Sequelize = Sequelize;
    this.models = {};
  }

  connect() {
    logger.debug('데이터베이스 연결 시작');
    return Promise.resolve()
      .then(this.init.bind(this))
      .then(this.getModels.bind(this))
      .then(this.sync.bind(this))
      .catch((err) => {
        logger.debug(`데이터베이스 초기화 실패 ${err.message}`);
        return Promise.reject(err);
      });
  }

  init() {
    logger.debug('데이터베이스 초기화 시작');
    const databaseConfig = config.database;
    this.sequelize = new Sequelize(
      databaseConfig.name,
      databaseConfig.username,
      databaseConfig.password, {
        host: databaseConfig.host,
        port: databaseConfig.port,
        dialect: databaseConfig.dialect,
        storage: databaseConfig.storage,
        logging: databaseConfig.enableSequelizeLog ? logger.info : false,
        dialectOptions: { ssl: databaseConfig.ssl ? databaseConfig.ssl : false },
        define: { paranoid: true },
      });
  }

  getModels() {
    logger.debug('데이터베이스 모델 초기화');
    const databaseConfig = config.database;
    const modelFiles = common.filePath.getPatternMatchPaths(databaseConfig.modelPathPattern);

    modelFiles.forEach((modelPath) => {
      const sequelizeModel = this.sequelize.import(path.resolve(modelPath));
      if (sequelizeModel) {
        this.models[sequelizeModel.name] = sequelizeModel;
      }
    });
  }

  sync() {
    return this.sequelize.sync()
      .then(() => {
        logger.debug('Sequelize 초기화 및 동기화 완료');
        return true;
      });
  }
}

module.exports = new Database();
