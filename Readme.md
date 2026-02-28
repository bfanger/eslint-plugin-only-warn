# eslint-plugin-only-warn

![status](https://github.com/bfanger/eslint-plugin-only-warn/actions/workflows/lint-and-test.yml/badge.svg)

Downgrade [ESLint](http://eslint.org) errors to warnings.

## Installation

```sh
npm install --save-dev eslint-plugin-only-warn
```

## Usage

Using [flat config files](https://eslint.org/docs/latest/use/configure/configuration-files):

```js
// eslint.config.js
import "eslint-plugin-only-warn";

export default [
  ...
```

Or, when the package.json that doesn't have `"type": "module"`:

```js
require("eslint-plugin-only-warn");
```

<details>
  <summary>ESLint 8.x and earlier</summary>

Add `only-warn` to the plugins section of your `.eslintrc` configuration file:

```json
{
  "plugins": ["only-warn"]
}
```

</details>

### --max-warnings=0

Add [--max-warnings=0](https://eslint.org/docs/latest/use/command-line-interface#--max-warnings) to the eslint command in package.json

```json
  "lint": "eslint --max-warnings=0 ...",
```

Adding the option allows git hooks or CI pipelines to detect failed linting rules.  
Because the cli now has a nonzero exitcode when it encountered linting warnings.

### Git integration

Use [Husky](https://typicode.github.io/husky/) and [lint-staged](https://github.com/okonet/lint-staged) to prevent committing code that contain eslint warnings.

# Why only warnings?

- Don't waste time thinking or discussing about when a rule should be an error or a warning, focus on enabling of disabling a rule
- Warnings look different in editors, this allows you to quickly see that some tweaking is required, but your code still runs (ESLint rules generally don't block the code from executing and fatal errors are still reported as error)
- Prevents noise, disallowing warnings to be committed in a codebase prevents clutter in the output of ESLint (use [special eslint comments](https://eslint.org/docs/latest/use/configure/rules#disable-rules) for the instances when you need an exception to the rules)
