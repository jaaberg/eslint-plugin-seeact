# eslint-plugin-seeact

SEE a problem, ACT upon it. This plugin currently have one rule: catching the use of `this.state` inside `this.setState`.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-seeact`:

```
$ npm install eslint-plugin-seeact --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-seeact` globally.

## Usage

Add `seeact` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "seeact"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "seeact/rule-name": 2
    }
}
```

## Supported Rules

* [seeact/no-access-state-in-setstate](docs/rules/no-access-state-in-setstate.md): Prevent using `this.state` inside `this.setState`


## License

ESLint-plugin-seeact is licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php).
