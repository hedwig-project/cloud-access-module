module.exports = {
  "parser": "babel-eslint",
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 6,
  },
  "env": {
    "node": true,
    "es6": true,
    "mocha": true,
  },
  "plugins": [
    "mocha"
  ],
  "extends": [
    "eslint:recommended",
  ],
}
