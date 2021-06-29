module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverage: true,
  collectCoverageFrom: ['./src/utils/*.ts'],
  moduleNameMapper: {
    '^2dge/(.*)$': '<rootDir>/src/$1',
    '^constants/(.*)$': '<rootDir>/src/constants/$1',
    '^singletons/(.*)$': '<rootDir>/src/singletons/$1',
    '^utils/(.*)$': '<rootDir>/src/utils/$1',
    '^demo/(.*)$': '<rootDir>/demo/$1',
  },
}
