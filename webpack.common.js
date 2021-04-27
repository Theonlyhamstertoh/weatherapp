const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const APP_DIR = path.resolve(__dirname, './src/js');

module.exports = {
  entry: APP_DIR + "/index.js",
  devServer: {
    contentBase: './dist',
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'SeriousWeather',
      // favicon:
      template: './src/template.html',
    }),
  ],
  output: {
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        type: 'asset',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
