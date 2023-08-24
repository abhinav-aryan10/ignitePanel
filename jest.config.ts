module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{ts,tsx}'],
    coverageDirectory: 'coverage',
    testEnvironment: 'tsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
}