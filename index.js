if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/react-simple-dropdown.min.js');
} else {
  module.exports = require('./dist/react-simple-dropdown.dev.js');
}
