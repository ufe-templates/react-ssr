const base = require('./webpack.base')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const {ReactLoadablePlugin} = require('react-loadable/webpack')
const HtmlPlugin = require('html-webpack-plugin')
const {resolve} = require('path')

module.exports = merge(base, {
  devtool: 'source-map',
  mode: 'production',
  output: {
    filename: 'client/js/[name].[chunkhash].js',
    chunkFilename: 'client/js/[name].[chunkhash].js',
    publicPath: '/dist/'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    },
    runtimeChunk: true,
    minimizer: [
      new UglifyJSPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              minimize: true,
              sourceMap: true,
              camelCase: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [require('autoprefixer')()]
            }
          }
        ]
      },
      {
        test: /\.styl$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2,
              minimize: true,
              sourceMap: true,
              camelCase: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [require('autoprefixer')()]
            }
          },
          {
            loader: 'stylus-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'client/css/[name].[contenthash].css',
      chunkFilename: 'client/css/[name].[contenthash].css'
    }),
    new ReactLoadablePlugin({
      filename: resolve(__dirname, '../dist/react-loadable.json')
    }),
    new HtmlPlugin({
      template: resolve(__dirname, '../src/index.html'),
      inject: true,
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        minifyJS: true
      }
    })
  ]
})
