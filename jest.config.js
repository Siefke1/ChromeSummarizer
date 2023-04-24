module.exports = {
    roots: ["src"],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/src/jest/jest-setup.ts"],
    moduleNameMapper: {
        "^axios$": "<rootDir>/src/__mocks__/axios.ts",
    },
};
