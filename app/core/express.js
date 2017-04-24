const http = require('http');
const path = require('path');

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const config = require('../../config');
const common = require('../common');
const logger = require('./logger');

class Server {
  constructor() {
    logger.debug('서버 객체 초기화');
    this.app = express();
    this.server = http.createServer(this.app);
  }

  start() {
    logger.debug('서버 초기화 시작');
    this.initErrorStack();
    this.initMorgan();
    this.initBodyParser();
    this.initHelmetHeaders();
    this.initCORS();
    this.initAppRoute();
    this.initErrorRoute();
    this.init404();
    this.listen();
  }

  initErrorStack() {
    this.app.set('showStackError', true);
  }

  initMorgan() {
    this.app.use(morgan(config.morgan.format));
  }

  initBodyParser() {
    this.app.use(bodyParser.json());
  }

  initHelmetHeaders() {
    const SIX_MONTHS = 15778476000;
    this.app.disable('x-powered-by');
    this.app.use(helmet.xssFilter());
    this.app.use(helmet.hsts({
      maxAge: SIX_MONTHS,
      includeSubdomains: true,
      force: true,
    }));
  }

  initCORS() {
    this.app.use((req, res, next) => {
      const allowedOrigins = config.cors.allowOrigins;
      const requestOrigin = req.headers.origin;

      // 인증과 관련해서는 '*'을 사용하면
      // 에러가 생기므로 들어오는 Origin에 맞춰서 설정한다
      if (allowedOrigins.includes(requestOrigin)) {
        res.setHeader('Access-Control-Allow-Origin', requestOrigin);
      }

      res.header('Access-Control-Allow-Credentials', config.cors.allowCredentials);
      res.header('Access-Control-Allow-Headers', config.cors.allowHeaders);
      res.header('Access-Control-Allow-Methods', config.cors.allowMethods);

      if (req.method === 'OPTIONS') {
        res.sendStatus(200);
      } else {
        next();
      }
    });
  }

  initAppRoute() {
    logger.debug('App Route 설정');
    const routeFiles = common.filePath.getPatternMatchPaths(config.express.routePathGlobPattern);
    routeFiles.forEach((routePath) => {
      require(path.resolve(routePath))(this.app); // eslint-disable-line
    });
  }

  initErrorRoute() {
    logger.debug('Error Route 설정');
    // 각 에러의 있는 statusCode를 통해 구분하여 리스폰을 보내준다.
    // 400(Bad Request - field validation, parameter validation)
    // 401(Unauthorized - authentication, authorization fail)
    // 404(Not found)
    // 500(Internal Server Error)
    this.app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
      if ([400, 401, 404].includes(err.statusCode)) {
        res.status(err.statusCode).json({
          success: 0,
          message: err.message,
        });
      } else {
        logger.error(err.stack);
        res.status(500).json({
          success: 0,
          message: '예상치 못한 에러 발생',
        });
      }
    });
  }

  init404() {
    this.app.use((req, res) => {
      res.status(404).json({
        success: 0,
        message: '해당 API를 찾을 수 없습니다.',
      });
    });
  }

  listen() {
    logger.debug('Server Listen 설정');
    this.app.listen(config.express.port, () => {
      const configMsg =
        `---------------------------------------
        Environment:\t\t${process.env.NODE_ENV}
        Port:\t\t\t${config.express.port}
        ---------------------------------------`;
      logger.info(configMsg);
    });
  }
}

const server = new Server();
module.exports = server;
