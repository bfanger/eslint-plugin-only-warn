const path = require('path')

const SEARCH_STR = `${path.sep}node_modules${path.sep}eslint${path.sep}`

module.exports = function getEslintModules() {
  const map = {}
  Object.keys(require.cache).forEach((modulePath) => {
    const pos = modulePath.indexOf(SEARCH_STR)
    if (pos !== -1) {
      const eslintPath = modulePath.substr(0, pos + SEARCH_STR.length)
      if (!map[eslintPath]) {
        map[eslintPath] = require(eslintPath)
      }
    }
  })

  let modules = Object.values(map)
  if (modules.length === 0) {
    modules = [require('eslint')]
  }
  return modules
}
