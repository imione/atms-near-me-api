const allowHeaders = 'Origin, X-Requested-With, Content-Type, Accept, Authorization';
const allowMethods = 'GET, POST, PUT, DELETE, OPTIONS';
const allowCredentials = true;
const allowOrigins = [
  'http://127.0.0.1:3000',
];

module.exports = {
  allowHeaders,
  allowMethods,
  allowCredentials,
  allowOrigins,
};