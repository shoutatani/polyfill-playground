const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist/transform-runtime"),
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
                  }
                },
              ],
            ],
            plugins: [
              [
                "@babel/plugin-transform-runtime",
                {
                  "corejs": {
                    version: 3,
                    proposals: true
                  }
                }
              ]
            ]
          },
        },
      },
    ],
  },
};
