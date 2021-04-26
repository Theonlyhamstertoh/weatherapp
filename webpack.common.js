const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const APP_DIR = path.resolve(__dirname, './src/js') ;

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
    // clean: true,

  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      // {
      //   test: /\.s[ac]ss$/i,
      //   use: [
      //     'style-loader',
      //     'css-loader',
      //     'resolve-url-loader',
      //     'sass-loader',
      //   ],
      // },
      {
        test: /\/(png|svg|jp?g|gif)$/i,
        type: 'asset',
      },
    ],
  },
};
