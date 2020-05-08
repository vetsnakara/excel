const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

const filename = (ext) => (isProd ? `bundle.[hash].${ext}` : `bundle.${ext}`)

let config = {
  context: path.resolve(__dirname, 'src'),

  entry: './index.js',

  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: isDev
            }
          },
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([{ from: '../public/favicon.ico' }]),
    new HtmlWebpackPlugin({
      template: '../public/index.html',
      removeComments: isProd,
      collapseWhitespace: isProd
    }),
    new MiniCssExtractPlugin({
      filename: filename('css')
    })
  ],

  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src/core')
    }
  },

  devtool: isDev && 'source-map'
}

if (isDev) {
  config = {
    ...config,
    devServer: {
      port: 8080,
      open: true,
      hot: true,
      overlay: true
    }
  }
}

module.exports = config
