
module.exports = {
  testEnvironment: 'jest-environment-jsdom',  // Set the test environment
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',  // Use babel-jest for transformation
  },
  moduleNameMapper: {
    '\\.module\\.css$': '<rootDir>/__mocks__/styleMock.js', // Mock CSS Modules
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock global CSS
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js' // Mock file
  },
  setupFilesAfterEnv: [
    '@testing-library/jest-dom',
    '<rootDir>/jest.setup.js'
  ],  // Setup testing library
  "compilerOptions": {
    "types": ["jest"]
  }
};
