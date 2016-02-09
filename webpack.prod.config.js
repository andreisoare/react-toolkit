var path = require('path');
var rimraf = require('rimraf');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');

// Clean dist
rimraf.sync(path.join(__dirname, 'dist'));

var baseConfig = {
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
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: 'dist',
  },

  module: {
    loaders: [
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
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),

    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),

    // Without these 2 plugins the vendor hash changes every time the app
    // changes, even though there are no changes to the vendor.
    // https://github.com/webpack/webpack/issues/1315
    new WebpackMd5Hash(),
    new webpack.NamedModulesPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: '[name].[chunkhash].js',
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
