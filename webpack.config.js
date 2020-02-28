const path = require("path");
const HtmlWebpaclPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const optimizeCssPlugin = require("optimize-css-assets-webpack-plugin");
// 引入happypack，实现webpack多线程打包
const HappyPack = require("happypack");
const webpack = require("webpack");
module.exports = {
  entry: {
    app: "./src/index.js",
    print: "./src/print.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"), // path必须为绝对路径。path.resolve可以把相对路径解析为绝对路径
    // 公共路径
    publicPath: "http://www.webpack.cn"
  },
  mode: "development",
  /**
   * 源码映射
   * source-map会单独生成一个映射文件 显示报错的行列信息
   * eval-source-map 不会单独生成映射文件 显示报错的行列信息
   * cheap-module-source-map 生成一个单独的映射文件，但不会显示报错列信息 几乎无法再浏览器中调试。但是可做性能监控
   * cheap-module-eval-source-map 不会生成一个单独的映射文件，不会显示报错的列信息 可调试
   */
  devtool: "eval-source-map",
  devServer: {
    // 运行静态资源的目录
    contentBase: "./src",
    hot: true, // 启用热更新
    // 配置代理
    proxy: {
      // 当访问/api开头的请求时，代理到3000的请求
      "/api": {
        target: "http://localhost:3000",
        pathRewrite: { "/api": "" } // 重写路径 将/api替换成空
      }
    }
  },
  module: {
    noParse: /jQuery/, // 不去解析jQuery中的依赖关系，优化解析速度
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
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
              limit: 8192,
              // 图片打包到单独的目录
              outputPath: "img/"
            }
          }
        ]
      },
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: "babel-loader",
      //     options: {
      //       presets: ["@babel/preset-env"],
      //       plugins: ["@babel/plugin-transform-runtime"]
      //     }
      //   },
      //   exclude: /node_modules/
      // },
      {
        test: /\.js$/,
        use: {
          loader: "HappyPack/loader?id=js"
        },
        exclude: /node_modules/,
        include: path.resolve("src")
      }
    ]
  },
  plugins: [
    new HappyPack({
      id: "js",
      use: [
        {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"]
          }
        }
      ]
    }),
    new CleanWebpackPlugin(),
    // 实现多页打包
    new HtmlWebpaclPlugin({
      title: "Output",
      template: "./src/index.html",
      filename: "app.html",
      chunks: ["app"]
    }),
    new HtmlWebpaclPlugin({
      title: "Output",
      template: "./src/index.html",
      filename: "print.html",
      chunks: ["print", "app"]
    }),
    // 热更新
    new webpack.HotModuleReplacementPlugin(),
    // 抽离css样式
    new MiniCssExtractPlugin({
      filename: "css/main.css"
    })
    // new optimizeCssPlugin()
  ],
  // 添加优化项 在production环境下才起作用
  optimization: {
    minimizer: [new optimizeCssPlugin({})],
    // 抽离公共代码 只有多页应用的时候需要抽离出来。
    splitChunks: {
      cacheGroups: {
        // 缓存组
        common: {
          // 抽离出的公共模块
          chunks: "initial", // 从入口文件就开始抽离
          minSize: 0, // 文件大于0字节公用的就抽离
          minChunks: 2 // 当前的内容引用大于多少次就抽离出来
        }
      },
      // 抽离第三方库
      vendor: {
        priority: 1, //设置权重，决定抽离的顺序
        test: /node_modules/,
        chunks: "initial", // 从入口文件就开始抽离
        minSize: 0, // 文件大于0字节公用的就抽离
        minChunks: 2 // 当前的内容引用大于多少次就抽离出来
      }
    }
  }
};
