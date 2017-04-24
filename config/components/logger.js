const logLevel = process.env.NODE_ENV === 'production' ? 'info' : 'debug';

module.exports = {
  logLevel,
};
