import type {Config} from 'jest';

const config: Config = {
    verbose: true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: [
        "**/*.spec.ts"
    ],
};

export default config;