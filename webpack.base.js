const path = require('path')
const CleanPlugin = require('clean-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const MiniExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: ['./js/index.js', './js/print.js'],
    vendor: 'lodash'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },
  mode: 'development',
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
  plugins: [
    new CleanPlugin(),
    new HtmlPlugin({
      template: 'index.html',
      hash: true
    }),
    new MiniExtractPlugin({
      filename: '[name].[hash].css'
    })
  ]
}