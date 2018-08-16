if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/react-dropdown-aria.min.js');
} else {
  module.exports = require('./dist/react-dropdown-aria.dev.js'); // eslint-disable-line
}
