module.exports = {
  extends: ["plugin:react/recommended", "@tsukiy0/eslint-config"],
  rules: {
    "react/prop-types": 0,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
