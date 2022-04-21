const path = require("path");

module.exports = {
  entry: [
    "./src/polyfill-actual.js",
    "./src/index.js"
  ],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist/polyfill-core-js-actual"),
  },
  devtool: false
};
