const merge = require("webpack-merge");
const base = require("./webpack.base");
const webpack = require("webpack");
module.exports = merge(base, {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: "./src", // 开发时提供静态服务的目录
    hot: true,
    progress: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
});
