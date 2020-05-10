"use strict";

module.exports = {
    collectCoverage: true,
    moduleFileExtensions: [
        "mjs",
        "js"
    ],
    transform: {
        "\.mjs$": "babel-jest"
    },
    testMatch: [
        "<rootDir>/tests/*.mjs"
    ],
    maxConcurrency: 1
};
