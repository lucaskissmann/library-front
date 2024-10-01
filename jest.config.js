const nextJest = require('next/jest.js');
 
const createJestConfig = nextJest({
  dir: './',
})
 
const config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules', '/.next/'],
  setupFilesAfterEnv: ['<rootDir>/setup-tests.js'],
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
    '^@/functions/(.*)$': '<rootDir>/functions/$1',
    '^@/config$': '<rootDir>/config.ts',
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
}
 
module.exports = createJestConfig(config)
