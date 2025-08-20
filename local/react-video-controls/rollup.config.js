import babel from "rollup-plugin-babel";

export default [
  {
    input: "./src/index.js",
    output: {
      name: "reusable" /* ??? */,
      file: "./lib/index.js",
      format: "es" /* ??? */
    },
    external: ["react"],
    plugins: [babel({ exclude: "node_modules/**" })]
  }
];
