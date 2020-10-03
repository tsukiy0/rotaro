const base = require("@rotaro/tools/jest.config");

module.exports = {
  ...base,
  testMatch: ["**/*.integrationTest.ts"],
  testTimeout: 30000,
  setupFiles: ["./src/setupTests.integration.ts"],
};
