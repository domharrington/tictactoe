const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.js',
  },
  devtool: 'eval',
  plugins: [
    new CopyWebpackPlugin([{ from: './app/index.html', to: 'index.html' }]),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: true,
  },
};
