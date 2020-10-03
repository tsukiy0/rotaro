module.exports = {
  extends: [
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "@tsukiy0/eslint-config",
  ],
  rules: {
    "react/prop-types": 0,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
