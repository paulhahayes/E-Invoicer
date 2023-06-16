module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageReporters: ['lcov', 'text-summary'],
  testPathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/src/echo.test.ts'],
  forceExit: true,
  maxWorkers: 1,
  //clearMocks: true,
};
