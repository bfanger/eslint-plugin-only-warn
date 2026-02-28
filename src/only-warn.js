// @ts-check
const getEslintModules = require("./get-eslint-modules");

const unpatchedVerify = Symbol("verify");

/**
 * Patch the verify method and downgrade the errors to warnings.
 * @param {Record<string | symbol, any>} LinterPrototype
 */
function patch(LinterPrototype) {
  if (LinterPrototype[unpatchedVerify]) {
    return;
  }
  LinterPrototype[unpatchedVerify] = LinterPrototype.verify;
  LinterPrototype.verify = function () {
    /** @type ReturnType<import("eslint").Linter["verify"]> */
    const messages = LinterPrototype[unpatchedVerify].apply(this, arguments);
    messages.forEach((message) => {
      if (!message.fatal && message.severity === 2) {
        message.severity = 1;
      }
    });
    return messages;
  };
}

/**
 * Remove the patch
 * @param {Record<string | symbol, any>} LinterPrototype
 */
function unpatch(LinterPrototype) {
  if (LinterPrototype[unpatchedVerify]) {
    LinterPrototype.verify = LinterPrototype[unpatchedVerify];
    delete LinterPrototype[unpatchedVerify];
  }
}

function enable() {
  for (const eslint of getEslintModules()) {
    patch((eslint.Linter && eslint.Linter.prototype) || eslint.linter);
  }
}
function disable() {
  for (const eslint of getEslintModules()) {
    unpatch((eslint.Linter && eslint.Linter.prototype) || eslint.linter);
  }
}
enable();
module.exports = { enable, disable };
