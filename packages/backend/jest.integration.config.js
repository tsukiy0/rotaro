const base = require("@rotaro/tools/jest.config");

module.exports = {
  ...base,
  testMatch: ["**/*.integrationTest.ts"],
  testTimeout: 10000,
  setupFiles: ["./src/setupTests.integration.ts"],
};
