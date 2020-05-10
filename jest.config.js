module.exports = {
    collectCoverage: true,
    moduleFileExtensions: [
        "mjs",
        "js"
    ],
    testMatch: [
        "<rootDir>/tests/*.mjs"
    ],
    transform: {
        "\\.mjs$": "babel-jest"
    }
};
