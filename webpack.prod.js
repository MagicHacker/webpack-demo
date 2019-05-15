const merge = require("webpack-merge");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const webpack = require("webpack");
const base = require("./webpack.base");
module.exports = merge(base, {
  mode: "production",
  devtool: "cheap-module-source-map",
  plugins: [
    new UglifyJSPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    })
  ]
});
