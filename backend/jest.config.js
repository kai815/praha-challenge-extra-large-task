module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testMatch: ['**/__tests__/**/*.test.[jt]s'],
  testPathIgnorePatterns: ['integration'],
  coverageDirectory: './coverage/',
  collectCoverageFrom: ['**/*.(t|j)s'],
}
