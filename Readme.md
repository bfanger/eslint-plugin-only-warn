# eslint-plugin-only-warn

[![Build Status](https://travis-ci.org/bfanger/eslint-plugin-only-warn.svg?branch=master)](https://travis-ci.org/bfanger/eslint-plugin-only-warn)

Downgrade errors to warnings

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

## Usage

Add `only-warn` to the plugins section of your `.eslintrc` configuration file:

```json
{
  "plugins": ["only-warn"]
}
```

Add `--max-warnings=0` to the lint script in your package.json.

```json
  "lint": "eslint --max-warnings=0 ...",
```

This will make eslint cli report an errorcode which can be detected in git hook or CI pipeline.

Tip: Use [husky](https://typicode.github.io/husky/) and [lint-staged](https://github.com/okonet/lint-staged) te prevent committing eslint warnings.

# Why only warnings?

- Don't waste time thinking or discussing about if it should be an error or a warning, focus on enabling of disabling a rule
- Warnings look different in editors, this allows you to quickly see that some tweaking is required, but your code still runs (eslint rules generally don't block the code from executing)
- Prevents noise, disallowing warnings to be committed in a codebase prevents clutter in the output of eslint (and use [special eslint comments](https://eslint.org/docs/2.13.1/user-guide/configuring#disabling-rules-with-inline-comments) for the instances when you need an exception to the rule)
