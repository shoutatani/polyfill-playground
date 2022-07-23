const path = require("path");

module.exports = {
  entry: ["./src/polyfill.js", "./src/index.js"],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist/entry"),
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
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "entry",
                  corejs: "3.21",
                },
              ],
            ],
          },
        },
      },
    ],
  },
};
