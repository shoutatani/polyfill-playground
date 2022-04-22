const path = require("path");

module.exports = {
  entry: [
    "./src/polyfill.js",
    "./src/index.js"
  ],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist/polyfill-swc-with-ie-11"),
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "swc-loader",
          options: {
            "env": {
              "targets": {
                "ie": "11"
              },
              "mode": "entry",
              "coreJs": 3
            }
          }
        }
      }
    ]
  }
};
