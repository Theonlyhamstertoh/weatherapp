const path = require('path');
const commonConfig = require('./webpack.common');
const {merge} = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(commonConfig, {
    mode: "production",
    output: {
        filename: "[name].bundle.[contenthash].js",
        assetModuleFilename: "images/[hash][ext][query]",
    },
    plugins: [new MiniCssExtractPlugin({ filename: "[name].[contenthas].css"}) ],
    module: {
        rules: [
            {
                test: /\.(scss||css)$/i,
                use: [
                    MiniCssExtractPlugin.loader, // extract css into file
                    "css-loader?",
                    "resolve-url-loader",
                    "sass-loader",
                ],
            }
        ]
    }
})