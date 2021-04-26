const commonConfig = require('./webpack.common');
const {merge} = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

module.exports = merge(commonConfig, {
    mode: "production",
    output: {
        filename: "[name].bundle.[hash].js",
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: "images/[hash][ext][query]",
    },
    plugins: [new MiniCssExtractPlugin({ filename: "[name].[contenthas].css"}) ],
    module: {
        rules: [
            // {
            //     test: /\.(scss||css)$/i,
            //     use: [
            //         MiniCssExtractPlugin.loader, // extract css into file
            //         "css-loader?",
            //         "resolve-url-loader",
            //         "sass-loader",
            //     ],
            // },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: "fonts/[hash][ext][query]"
                }
            },
        ]
    }
})