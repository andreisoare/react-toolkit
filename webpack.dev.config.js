var path = require('path');
var rimraf = require('rimraf');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// Clean dist
rimraf.sync(path.join(__dirname, 'dist'));

module.exports = {
  debug: true,
  devtool: 'source-map',

  resolve: {
    root: [__dirname],
  },

  entry: {
    app: [
      'showroom/app.js',
      'showroom/index.html',
    ],
    vendor: [
      'react',
      'react-dom',
      'babel-polyfill',
    ],
  },

  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
    path: 'dist',
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|dist)/,
        loader: 'react-hot'
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|dist)/,
        loader: 'babel-loader',
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015', 'react'],
        }
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]',
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
      },
    ],
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: '[name].[hash].js',
      minChunks: Infinity,
    }),

    new HtmlWebpackPlugin({
      template: 'showroom/index.html',
      filename: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
  ]
};
