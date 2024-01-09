const getEslintModules = require('./get-eslint-modules')

const unpatchedVerify = Symbol('verify')

/**
 * Patch the verify method and downgrade the errors to warnings.
 */
function patch(LinterPrototype) {
  if (LinterPrototype[unpatchedVerify]) {
    return
  }
  LinterPrototype[unpatchedVerify] = LinterPrototype.verify
  LinterPrototype.verify = function () {
    const messages = LinterPrototype[unpatchedVerify].apply(this, arguments)
    const featureSlisedConfig = arguments?.[1]?.filter(a => a?.filePath?.includes('feature-sliced'))
    messages.forEach((message) => {
      const featureSlisedRelated = featureSlisedConfig.some(c => c?.rules && Object.keys(c.rules).some(rule => message.ruleId == rule))
      if (!message.fatal && message.severity === 2 && featureSlisedRelated) {
        message.severity = 1
      }
    })

    return messages
  }
}

/**
 * Remove the patch
 */
function unpatch(LinterPrototype) {
  if (LinterPrototype[unpatchedVerify]) {
    LinterPrototype.verify = LinterPrototype[unpatchedVerify]
    delete LinterPrototype[unpatchedVerify]
  }
}

function enable() {
  for (const eslint of getEslintModules()) {
    patch((eslint.Linter && eslint.Linter.prototype) || eslint.linter)
  }
}
function disable() {
  for (const eslint of getEslintModules()) {
    unpatch((eslint.Linter && eslint.Linter.prototype) || eslint.linter)
  }
}
enable()
module.exports = { enable, disable }
