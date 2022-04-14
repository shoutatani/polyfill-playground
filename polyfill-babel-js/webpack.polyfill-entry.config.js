const path = require("path");

module.exports = {
  entry: [
    "./src/polyfill.js",
    "./src/index.js"
  ],
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
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    ie: "11",
                  },
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
