const path = require('path')
const CleanPlugin = require('clean-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const MiniExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  entry: {
    app: './src/js/index.js',
    print: './src/js/print.js'
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
        test: /\.(png|jpg)$/,
        use: ['url-loader']
      }
    ]
  },
  plugins: [
    new CleanPlugin(),
    new HtmlPlugin({
      template: './src/index.html',
      hash: true
    }),
    new MiniExtractPlugin({
      filename: '[name].[hash].css'
    })
  ]
}