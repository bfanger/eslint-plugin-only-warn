/**
 * Get only-warn config if available
 */
function getOnlyWarnConfig(configs) {
  let onlyWarnConfig = {}
  if (Array.isArray(configs)) {
    configs.forEach(config => {
      if (config.settings && config.settings['only-warn']) {
        Object.assign(onlyWarnConfig, config.settings['only-warn'])
      }
    })
  }
  return onlyWarnConfig
}

/**
 * Check if ruleId is excluded
 */
function isRuleIdExcluded(message, onlyWarnConfig) {
  if (message.ruleId && typeof onlyWarnConfig['exclude-pattern'] === 'string') {
    const excludeRuleIdRegex = new RegExp(onlyWarnConfig['exclude-pattern'])
    if (excludeRuleIdRegex.test(message.ruleId)) {
      return true
    }
  }
  return false
}

module.exports = { getOnlyWarnConfig, isRuleIdExcluded }
