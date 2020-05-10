module.exports = {
    env: {
        browser: true,
        es6: true,
        jest: true,
        node: true
    },
    extends: "@aminnairi",
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly"
    },
    parserOptions: {
        ecmaVersion: 11,
        sourceType: "module"
    },
    rules: {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "no-nested-ternary": "off",
        "no-ternary": "off",
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};
