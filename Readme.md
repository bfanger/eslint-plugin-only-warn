# eslint-plugin-only-warn

![status](https://github.com/bfanger/eslint-plugin-only-warn/actions/workflows/lint-and-test.yml/badge.svg)

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-only-warn`:

```
$ npm install eslint-plugin-only-warn --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-only-warn` globally.

## Usage (Flat Config)

```js
// eslint.config.js
import "eslint-plugin-only-warn";
```

Getting `SyntaxError: Cannot use import statement outside a module`? Change your _package.json_ to `"type": "module",` or use require:

```js
// eslint.config.js
require("eslint-plugin-only-warn");`
```

## Usage (Old style ESLint config)

Not using the new flat config from ESLint 9+?

Add `only-warn` to the plugins section of your `.eslintrc` configuration file:

```json
{
  "plugins": ["only-warn"]
}
```

## Recommendations

Add `--max-warnings=0` to the lint script in your package.json.

```json
  "lint": "eslint --max-warnings=0 ...",
```

This will make eslint cli report an errorcode which can be detected in a git hook or CI pipeline.

Tip: Use [husky](https://typicode.github.io/husky/) and [lint-staged](https://github.com/okonet/lint-staged) to prevent committing eslint warnings.

# Why only warnings?

- Don't waste time thinking or discussing about when a rule should be an error or a warning, focus on enabling of disabling a rule
- Warnings look different in editors, this allows you to quickly see that some tweaking is required, but your code still runs (ESLint rules generally don't block the code from executing and fatal errors are still reported as error)
- Prevents noise, disallowing warnings to be committed in a codebase prevents clutter in the output of ESLint (use [special eslint comments](https://eslint.org/docs/latest/use/configure/rules#disabling-rules) for the instances when you need an exception to the rules)
