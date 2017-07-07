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

Add `only-warn` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "only-warn"
    ]
}
```
