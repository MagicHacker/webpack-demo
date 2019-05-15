const merge = require("webpack-merge");
const base = require("./webpack.base");
const webpack = require("webpack");
module.exports = merge(base, {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: "./src",
    hot: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
});
