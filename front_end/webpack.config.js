var webpack = require('webpack'),
    path = require('path');

module.exports = {
  cache: true,
  entry: './src/index',
  output: {
    path: path.join(__dirname,'/build/'),
    publicPath: '/assets/',
    filename: 'main.js',
  },
  devtool: false,
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'jshint-loader',
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loaders: ['style','css', 'autoprefixer']
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader?name=img/img-[hash:6].[ext]'
      },
      {
        test: /\.(woff2?|ico|ttf|eot)$/,
        loader: 'file-loader?name=font/font-[hash:6].[ext]'
      }
    ]
  }
};
