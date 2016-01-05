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
        test: /\.js$/, // include .js files
        exclude: /node_modules/, // exclude any and all files in the node_modules folder
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
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader?name=img/img-[hash:6].[ext]'
      }
    ]
  }
};
