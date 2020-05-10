import remove from "rollup-plugin-delete";
import {terser} from "rollup-plugin-terser";
import {extname, resolve} from "path";

const bundle = (input, output, empty) => {
    const extension = extname(output);

    return {
        input: resolve("sources", input),

        output: {
            file: ".mjs" === extension ? resolve("release", "module", input) : ".cjs" === extension ? resolve("release", "commonjs", output) : resolve("release", "browser", output),
            format: ".mjs" === extension ? "esm" : ".cjs" === extension ? "cjs" : "iife",
            name: "Router"
        },

        plugins: [
            empty && remove({targets: resolve("release", "*")}),
            terser()
        ]

    };
};

export default [
    bundle("router.mjs", "router.mjs", true),
    bundle("router.mjs", "router.cjs", false),
    bundle("router.mjs", "router.js", false)
];
