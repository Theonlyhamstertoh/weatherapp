const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const path = require('path');

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'inline-source-map',

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),

  },
  stats: "errorDetails: true",
  module: {
    rules: [
      {
        test: /\.(scss|css)$/i,
        use: [
          'style-loader',
          'css-loader',
          'resolve-url-loader',
          'sass-loader',
        ],
      },      

    ],
  },
});
