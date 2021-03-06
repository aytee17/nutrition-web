const merge = require("webpack-merge");
const common = require("./webpack.config.js");
const webpack = require("webpack");

module.exports = merge.smart(common, {
    mode: "development",
    output: {
        filename: "[name].[hash].js"
    },
    devtool: "inline-source-map",
    plugins: [
        new webpack.DefinePlugin({
            API_ENDPOINT: JSON.stringify("http://localhost:3000")
        })
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "css-loader",
                        options: {
                            localIdentName: "[name]__[local]__[hash:base64:5]"
                        }
                    }
                ]
            }
        ]
    },
    devServer: {
        open: true,
        overlay: true,
        historyApiFallback: true
    }
});
