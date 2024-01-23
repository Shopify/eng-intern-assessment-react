module.exports = {
    testPathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/dist'], // might want?
    moduleNameMapper: {
      '@components(.*)': '<rootDir>/src/components$1' // might want?
    },
    moduleDirectories: ['<rootDir>/node_modules', '<rootDir>/src'],
    setupFilesAfterEnv: ['<rootDir>/src/jest-setup.ts'] // this is the KEY
    // note it should be in the top level of the exported object.
  };