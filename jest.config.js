"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    globalTeardown: './tests/teardown.js',
    testMatch: ['<rootDir>/tests/*.test.ts'],
};
exports.default = config;
