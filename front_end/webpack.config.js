// Standard Webpack Configuration
// 01-05-2016

    // webpack module
var webpack = require('webpack'),
    // path module used to resolve absolute paths
    path = require('path');

module.exports = {
  cache: true,
  // webpack will only compile the main javascript file
  // entry points to the path of the main js file, here called 'index'
  entry: './src/index',
  // output
  output: {
    // where the compiled & packed file will be saved
    path: path.join(__dirname,'/build/'),
    // when watching, webpack will store the compiled & packed in memory
    // public path will be the route used by the 'in memory' development server
    publicPath: '/build/',
    // what the compiled & packed file will be named
    filename: 'main.js',
  },
  // devtools alow for source maps
  devtool: false,
  module: {
    // linter run before packing
    // test uses regular expressions to match files
    preLoaders: [
      {
        // lints all javascript
        test: /\.js$/,
        // excludes node modules from the linting process
        exclude: /node_modules/,
        loader: 'jshint-loader',
      }
    ],
    // loaders compile and pack different files
    // test uses regular expressions to match files
    loaders: [
      // compile all javascript files using the babel-loader module
      {
        test: /\.js$/,
        loader: 'babel-loader',
        // preset determine which babel libraries to use
        query: {
          presets: ['es2015', 'react']
        }
      },
      // compile sass files using the sass-loader module
      // stored in the compiled javascript file
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      // compile css files using the css-loader module
      // stored in the compiled javascript file
      {
        test: /\.css$/,
        loaders: ['style','css', 'autoprefixer']
      },
      // compile local images
      // hash file names to prevent cacheing
      // copy into 'img' sub-directory
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader?name=img/img-[hash:6].[ext]'
      },
      // compile local font files
      // hash file names to prevent cacheing
      // copy into 'font' sub-directory
      {
        test: /\.(woff2?|ico|ttf|eot)$/,
        loader: 'file-loader?name=font/font-[hash:6].[ext]'
      }
    ]
  }
};
