const path = require('path');

// When test executes, cannot find svg file, so I added this file
module.exports = {
  process(src, filename) {
    return `module.exports = ${JSON.stringify(path.basename(filename))};`;
  }
};