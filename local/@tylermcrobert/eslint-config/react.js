"use strict";

module.exports = {
  parser: "babel-eslint",
  extends: ["airbnb", require.resolve("./shared"), "prettier"],
  plugins: ["react", "react-hooks"],
  rules: {
    // A `.jsx` extension is not required for files containing JSX.
    "react/jsx-filename-extension": 0,
    // allow dangerouslySetInnerHTML
    "react/no-danger": 0,
    // Allow key in index
    "react/no-array-index-key": 0,
    // Experimental
    "react/jsx-one-expression-per-line": 0,
    // Forbid the use of the any proptype
    "react/forbid-prop-types": ["error", { forbid: ["any"] }],

    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",

    /**
     * jsx-a11y
     */

    // Don't require title on iframe
    "jsx-a11y/iframe-has-title": 0,
    // Allow onClick on divs
    "jsx-a11y/no-static-element-interactions": 0,
    // Don't require key events on click events
    "jsx-a11y/click-events-have-key-events": 0,
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/issues/339
    "jsx-a11y/anchor-is-valid": ["error", { components: ["a"] }]
  }
};
