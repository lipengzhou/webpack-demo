const path = require('path')
const toml = require('toml')
const yaml = require('yamljs')
const json5 = require('json5')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  /**
   * 构建模式
   */
  mode: 'development',

  /**
   * 入口
   */
  entry: './src/index.js',

  // 多入口构建
  // entry: {
  //   index: './src/index.js',
  //   foo: './src/foo.js'
  // },

  devtool: 'inline-source-map',

  devServer: {
    /**
     * 要托管的静态资源目录
     */
    static: './dist'
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ],

  /**
   * 出口
   */
  output: {
    /**
     * 构建后的文件名
     */
    filename: '[hash].bundle.js',
    /**
     * 构建到指定的路径，必须是绝对路径
     */
    path: path.resolve(__dirname, 'dist'),

    /**
     * 构建之前先把 dist 清除一下
     */
    clean: true
  },

  module: {
    rules: [
      {
        // 处理以 .css 结尾的文件
        test: /\.css$/i,
        /**
         * 注意 loader 是以相反的顺序执行
         */
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        /**
         * 从 webpack 5 开始，使用内置的资产模块
         */
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(csv|tsv)$/i,
        use: ['csv-loader']
      },
      {
        test: /\.xml$/i,
        use: ['xml-loader']
      },
      {
        test: /\.toml$/i,
        type: 'json',
        parser: {
          parse: toml.parse
        }
      },
      {
        test: /\.yaml$/i,
        type: 'json',
        parser: {
          parse: yaml.parse
        }
      },
      {
        test: /\.json5$/i,
        type: 'json',
        parser: {
          parse: json5.parse
        }
      }
    ]
  }
}
