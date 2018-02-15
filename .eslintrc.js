module.exports = {
  "extends": ["eslint:recommended", "prettier"], 
  "plugins": ["prettier"], 

  "parserOptions":{
    "sourceType":"modules",
    "ecmaVersion":6
  },
  "rules": {
    "prettier/prettier": [ 
      "error",
      {
        "singleQuote": true, 
        "trailingComma": "all"
      }
    ],
    "eqeqeq": ["error", "always"] 
  }

};