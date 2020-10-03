const path = require("path");

module.exports = {
  entry: path.join(__dirname, "src/index.ts"),
  output: {
    path: path.join(__dirname, "out"),
    filename: "bundle.js",
    library: "index",
    libraryTarget: "commonjs2",
  },
  target: "node",
  mode: "production",
  devtool: "eval",
  resolve: {
    extensions: [".js", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: "ts-loader",
          options: {
            configFile: "tsconfig.build.json",
          },
        },
      },
    ],
  },
};
