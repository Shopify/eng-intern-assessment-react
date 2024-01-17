module.exports = {
  setupFilesAfterEnv: ["./jest.setup.js"],
  injectGlobals: true,
  testEnvironment: "jest-environment-jsdom",
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  moduleNameMapper: {
    "^@components(.*)$": "<rootDir>/components$1",
    "^@pages(.*)$": "<rootDir>/pages$1",
    "^@hooks(.*)$": "<rootDir>/hooks$1",
    "\\.(css|jpg|png)$": "<rootDir>/components/styleMock.js"
  }
};
