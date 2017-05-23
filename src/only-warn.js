
const eslint = require("eslint");
const verify = eslint.linter.verify

eslint.linter.verify = function () {
    const messages = verify.apply(this, arguments)
    messages.forEach(message => {
        if (message.severity === 2) {
            message.severity = 1
        }
    });
    return messages
}

module.exports = {}