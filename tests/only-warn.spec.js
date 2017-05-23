const eslint = require("eslint")
require('../src/only-warn')

const { linter } = eslint


describe('downgradeError plugin', () => {
    it('should downgrade error(2) to warn(1)', () => {
        const messages = linter.verify("var foo", {
            rules: {
                semi: 2 // error
            }
        }, { filename: "foo.js" });
        expect(messages[0].severity).toBe(1)
    })
})