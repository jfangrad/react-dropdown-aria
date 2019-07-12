'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./react-dropdown-aria.cjs.prod.js");
} else {
  module.exports = require("./react-dropdown-aria.cjs.dev.js");
}
