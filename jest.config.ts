import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    globalTeardown: './tests/teardown.js',
    testMatch: ['<rootDir>/tests/*.test.ts'],
};

export default config;

