module.exports = {
  cache: true,
  entry: './index',
  output: {
    filename: 'build.js'
  },
  devtool: false,
  module: {
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
  }
};
