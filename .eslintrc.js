// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module"
  },
  env: {
    browser: true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: ["standard"],
  // required to lint *.vue files
  plugins: ["html"],
  // add your custom rules here
  rules: {
    "array-bracket-newline": 0,
    "space-before-function-paren": 0,
    quotes: ["error", "double"],
    camelcase: ["error", { properties: "never" }],
    "no-var": "error",
    curly: ["error", "multi-line"],
    semi: ["error", "always"],
    "block-spacing": "error",
    eqeqeq: "error",
    "no-multi-spaces": "error",
    "no-redeclare": "error",
    // allow paren-less arrow functions
    "arrow-parens": 0,
    // allow async-await
    "generator-star-spacing": 0,
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0
  }
};
