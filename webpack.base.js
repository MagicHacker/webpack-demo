const path = require("path");
const HtmlWebpaclPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
module.exports = {
  entry: {
    app: "./src/index.js",
    print: "./src/print.js"
  },
  output: {
    filename: "js/[name].[chunkhash].js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: () => {
                return [require("autoprefixer")()];
              }
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: "file-loader"
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpaclPlugin({
      title: "Output",
      template: "./src/index.html"
    }),
    new webpack.optimize.SplitChunksPlugin({
      chunks: "async",
      minSize: 30000,
      minChunks: 1,
      name: true
    })
  ]
};
