module.exports = {
    "env": {
        "browser": true,
        "es6": true,
      "jest/globals": true
    },
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "extends": ["eslint:recommended", "airbnb"],
    "plugins": ["jest"],
    "rules": {
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/prefer-to-have-length": "warn",
      "jest/valid-expect": "error"
    }
};
