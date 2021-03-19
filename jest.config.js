module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
  // A preset that is used as a base for Jest's configuration
  preset: 'ts-jest',
  // A list of paths to directories that Jest should use to search for files in
  roots: ['<rootDir>/src'],
  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1',
    '^.+\\.(css|scss)$': '<rootDir>/__mocks__/CSSStub.js',
  },
};
