const path = require("path");
const commonConfig = require("./webpack.common");
const { merge } = require('webpack-merge');

module.exports = merge(commonConfig, {
    mode: "development",
    devtool: "inline-source-map",

    output: {
        filename: "[name].bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.(scss||css)$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "resolve-url-loader",
                    "sass-loader",
                ]
            }
        ]
    }

})