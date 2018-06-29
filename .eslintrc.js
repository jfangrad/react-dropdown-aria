module.exports = {
  extends: "airbnb",
  parser: "babel-eslint",
  rules: {
    "no-case-declarations": "off",
    "global-require": "off",
    "class-methods-use-this": "off",
    "react/jsx-filename-extension": ["error", { "extensions": [".js", ".jsx"] }],
    "react/jsx-one-expression-per-line": "off",
    "react/forbid-prop-types": ["error", { forbid: ["any"] }],
    "jsx-a11y/no-static-element-interactions": "off",
    "max-len": ["error", { "code": 250 }],
    "no-return-assign": "off",
    "object-curly-newline": "off"
  },
};
