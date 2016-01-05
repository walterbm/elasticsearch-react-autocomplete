module.exports = {
  cache: true,
  entry: './src/index',
  output: {
    path: __dirname + '/build/',
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
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  },
  eslint: {
    "ecmaFeatures": {
      "jsx": true,
    },
    "env": {
      "browser": true,
      "node": true,
      "es6": true
    },
    "rules": {
      "no-unused-vars": [1]
    }
  },
};
