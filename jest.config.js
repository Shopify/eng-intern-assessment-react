module.exports = {
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  "testEnvironment": "jsdom",
  "moduleNameMapper": {
    "\\.(css|scss|less)$": "<rootDir>/__mocks__/StyleMock.ts"
  }
};
