import remove from "rollup-plugin-delete";

import {resolve, extname} from "path";
import {terser} from "rollup-plugin-terser";

function bundle(input, output, empty) {
    const extension = extname(output);

    return {
        input: resolve("sources", input),

        plugins: [
            empty && remove({targets: resolve("release", "*")}),
            terser()
        ],

        output: {
            file: extension === ".mjs" ? resolve("release", "module", input) : extension === ".cjs" ? resolve("release", "commonjs", output) : resolve("release", "browser", output),
            format: extension === ".mjs" ? "esm" : extension === ".cjs" ? "cjs" : "iife",
            name: "Router"
        }
    };
}

export default [
    bundle("router.mjs", "router.mjs", true),
    bundle("router.mjs", "router.cjs", false),
    bundle("router.mjs", "router.js", false)
];
