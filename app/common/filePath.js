const glob = require('glob');

const getPatternMatchPaths = (globPatterns) => {
  const urlRegex = new RegExp('^(?:[a-z]+:)?//', 'i');
  const output = [];

  if (Array.isArray(globPatterns)) {
    globPatterns.forEach((globPattern) => {
      output.push(...this.getGlobbedPaths(globPattern));
    });
    return output;
  }

  if (typeof globPatterns === 'string') {
    if (urlRegex.test(globPatterns)) {
      output.push(globPatterns);
      return output;
    }

    const files = glob.sync(globPatterns);
    output.push(...files);
  }

  return output;
};

module.exports = {
  getPatternMatchPaths,
};
