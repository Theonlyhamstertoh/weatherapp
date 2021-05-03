const commonConfig = require('./webpack.common');
const {merge} = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

module.exports = merge(commonConfig, {
    mode: "production",
    output: {
        filename: "[name].bundle.[hash].js",
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: "asset/[hash][ext][query]",
        clean: true,
    },
    plugins: [new MiniCssExtractPlugin({ filename: "[name].[contenthash].css"}) ],
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
            },
        ]
    }
})