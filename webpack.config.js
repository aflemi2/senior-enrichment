const path = require('path');
module.exports = {
  devtool: 'source-maps',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [ 'es2015', 'react']
        }
      },
      {
        test: /\.(gif|svg|jpg|png)$/,
        loader: "file-loader",
      }]
  }
};
