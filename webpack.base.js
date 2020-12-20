const path = require('path')
const CleanPlugin = require('clean-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
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
    })
  ]
}