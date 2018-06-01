const base = require('./webpack.base')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('./server-mini-css-extract-plugin')
const {resolve} = require('path')
const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack')
const mode = process.env.NODE_ENV

module.exports = merge(base, {
  target: 'node',
  mode,
  entry: {
    app: resolve(__dirname, '../src/server-entry.js')
  },
  output: {
    filename: 'server-bundle.js',
    chunkFilename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  externals: nodeExternals({
    whitelist: /\.css$/
  }),
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
              camelCase: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
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
              camelCase: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
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
      filename: 'server/css/server.css',
      chunkFilename: 'server/css/server.[name].css'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.REACT_ENV': JSON.stringify('server')
    })
  ]
})
