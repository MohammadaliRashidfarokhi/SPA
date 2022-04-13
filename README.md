A03 SPA
======================

Repo for the assignment 03.

Bootstrapped with Create Snowpack App (CSA) and slightly modified with the development environment.



Available Scripts
----------------------


### npm install

Install your dependencies.



### npm start

Runs the app in the development mode.
Open http://localhost:8080 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.



### npm run build

Builds a static copy of your site to the `build/` folder.
Your app is ready to be deployed!



### npm test

Execute all linters.



### npm run clean

Remove all generated files.



### npm run lint (lint:fix)

Code validation according to [@lnu/eslint-config](https://www.npmjs.com/package/@lnu/eslint-config).

The linter used is [`eslint`](https://eslint.org/) and the code style is [JavaScript Standard Style](https://standardjs.com/rules.html) with JSDOC comments for functions.

This is how the JSDOC should look like.

```javascript
/**
 * Calculates the sum of the parameters.
 *
 * @param {number} x - Operand.
 * @param {number} y - Operand.
 * @returns {number} The sum of the operands.
 */
function add(x, y){
    return x + y
}
```

Execute eslint like this, from the root of the repo.

```
npm run lint
npx eslint --help
```

Use the "fixer" to let the tool fix your code style.

```
npm run lint:fix
```



### npm run htmlhint

[HTMLHint](https://htmlhint.com/) to lint `*.html` files.

```
npm run htmlhint
npx htmlhint --help
```



### npm run stylelint

[Stylelint](https://stylelint.io/) to lint `*.css` files.

```
npm run stylelint
npx stylelint --help
```
