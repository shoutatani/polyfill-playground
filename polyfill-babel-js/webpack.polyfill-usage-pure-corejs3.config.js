const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist/usage-pure-corejs3"),
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            targets: {
              ie: "11",
            },
            plugins: [
              ["polyfill-corejs3", { method: "usage-pure", version: "3.23" }],
            ],
          },
        },
      },
    ],
  },
};
