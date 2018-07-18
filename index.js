if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/react-aria-dropdown.min.js');
} else {
  module.exports = require('./dist/react-aria-dropdown.dev.js'); // eslint-disable-line
}
