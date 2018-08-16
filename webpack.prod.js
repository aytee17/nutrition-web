const merge = require("webpack-merge");
const webpack = require("webpack");
const common = require("./webpack.config.js");
const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;

module.exports = merge.smart(common, {
    mode: "production",
    output: {
        filename: "[name].[contenthash].js"
    },
    optimization: {
        runtimeChunk: "single",
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "initial"
                }
            }
        }
    },
    plugins: [
        new HtmlWebpackExternalsPlugin({
            externals: [
                {
                    module: "noto-sans",
                    entry: {
                        path:
                            "https://fonts.googleapis.com/css?family=Noto+Sans",
                        type: "css"
                    }
                }
            ]
        }),
        new webpack.HashedModuleIdsPlugin(),
        new BundleAnalyzerPlugin(),
        new webpack.DefinePlugin({
            API_ENDPOINT: JSON.stringify("https://api.nutritiontrackr.app")
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
                            minimize: true,
                            localIdentName: "[local]_[hash:base64:5]"
                        }
                    }
                ]
            }
        ]
    }
});
