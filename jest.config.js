/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testRegex: ".*\\.(spec|test)\\.ts$",
    reporters: [
        ['github-actions', { silent: false }],
        ['jest-junit', { outputDirectory: 'test-results', outputName: 'test-results.xml' }],
        'summary'
    ],
    collectCoverage: true,
    collectCoverageFrom: ["src/**"],
    coveragePathIgnorePatterns: ["index.ts"]
};