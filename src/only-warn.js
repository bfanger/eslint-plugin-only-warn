const path = require("path")

const needle = `${path.sep}node_modules${path.sep}eslint${path.sep}`
function getLinters() {
  if (linters.length == 0) {
    const eslintPaths_withParams = ["eslint"].concat(Object.keys(require.cache).filter(id => id.includes(needle)))
    const eslintPaths = new Set(eslintPaths_withParams.map(id => id.slice(0, id.indexOf(needle) + needle.length)))
    for (const eslintPath of eslintPaths) {
      try {
        const linter = require(eslintPath).Linter
        if (linter) {
            linters.push(linter)
        }
      } catch (error) {
        if (error.code !== "MODULE_NOT_FOUND") {
          throw error
        }
      }
    }
  }
  return linters
}

const linters = []
const originalVerifies = []

/**
 * Patch the verify method and downgrade the errors to warnings.
 */
function enable () {
  for (const [index, Linter] of getLinters().entries()) {
    const originalVerify = Linter.prototype._verifyWithoutProcessors;
	  originalVerifies[index] = originalVerify;
    Linter.prototype["_verifyWithoutProcessors"] = function() {
      const messages = originalVerify.apply(this, arguments)
      messages.forEach(message => {
        if (message.severity === 2) {
          message.severity = 1
        }
      })
      return messages
    };
  }
}

/**
 * Remove the patch
 */
function disable () {
	for (const [index, Linter] of getLinters().entries()) {
    Linter.prototype["_verifyWithoutProcessors"] = originalVerifies[index];
  }
}

enable()
module.exports = { enable, disable }
