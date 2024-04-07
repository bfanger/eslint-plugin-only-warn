require("./src/only-warn");
const js = require("@eslint/js");
const prettierConfig = require("eslint-config-prettier");

module.exports = [
  js.configs.recommended,
  prettierConfig,
  {
    languageOptions: {
      globals: { require: true, module: true },
    },
  },
];
