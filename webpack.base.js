const path = require('path')
const CleanPlugin = require('clean-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const MiniExtractPlugin = require('mini-css-extract-plugin')
const Webpack = require('webpack')
module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: ['./js/index.js', './js/print.js'],
    vendor: 'lodash'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].[hash].js',
    chunkFilename: '[name].js'
  },
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, './src'),
    port: 8080,
    open: true,
    inline: true,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniExtractPlugin.loader,
            options: {}
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 0
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: loader => [
                require('autoprefixer')()
              ]
            }
          },
          {
            loader: 'less-loader'
          }
        ]
      },
      {
        test: /\.(png)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                  outputPath: 'images',
                  publicPath: 'images/',
                  emitFile: true
                }
              }
            }
          }
        ]
      }
    ]
  },
  devtool: 'eval-source-map',
  externals: {
    jquery: 'jQuery'
  },
  optimization: {
    minimize: false
  },
  plugins: [
    new CleanPlugin(),
    new HtmlPlugin({
      template: 'index.html',
      filename: 'index.html',
      hash: true,
      chunks: ['app']
    }),
    new HtmlPlugin({
      template: 'lodash.html',
      filename: 'lodash.html',
      hash: true,
      chunks: ['vendor']
    }),
    new MiniExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    // new Webpack.HotModuleReplacementPlugin()
  ]
}