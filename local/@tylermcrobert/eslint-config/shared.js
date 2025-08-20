"use strict";

module.exports = {
  parser: "babel-eslint",
  plugins: ["airbnb", "prettier"],
  plugins: ["import"],
  rules: {},
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  rules: {
    // Enable useful console logs
    "no-console": [1, { allow: ["warn", "error", "info"] }],

    // Allow underscores in front of vars
    "no-underscore-dangle": 0,

    // Allow cycle
    "import/no-cycle": 0,

    // Don't require components to be export default
    "import/prefer-default-export": 0
  },
  settings: {
    "import/resolver": {
      node: {
        paths: ["/", "src", __dirname],
        moduleDirectory: ["node_modules"]
      }
    }
  }
};
