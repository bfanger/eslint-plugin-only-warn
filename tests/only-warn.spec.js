const eslint = require('eslint')
const { disable, enable } = require('../src/only-warn') // apply patch

describe('eslint-plugin-only-warn', () => {
  const linter = new eslint.Linter()
  const config = {
    rules: { semi: 2 }, // error on missing `;`
  }
  const sourceCode = 'var foo'
  it('should downgrade error(2) to warn(1)', () => {
    const messages = linter.verify(sourceCode, config)
    expect(messages[0].severity).toBe(1)
  })

  it('can be temporarly disabled', () => {
    disable()
    const messages1 = linter.verify(sourceCode, config)
    expect(messages1[0].severity).toBe(2)
    enable()
    const messages2 = linter.verify(sourceCode, config)
    expect(messages2[0].severity).toBe(1)
  })
})
