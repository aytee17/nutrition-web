const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PostCssPresetEnv = require("postcss-preset-env");

module.exports = {
    entry: {
        app: "./src/main.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/"
    },
    plugins: [
        new HtmlWebpackPlugin({
            minify: true,
            title: "nutritiontrackr",
            meta: {
                viewport: "width=device-width,initial-scale=1"
            }
        }),
        new MiniCssExtractPlugin({
            filename: "[name].style.[contenthash].css"
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "css-hot-loader"
                    },
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            importLoaders: 2
                        }
                    },
                    {
                        loader: "postcss-loader",
                        ident: "post-css",
                        options: {
                            ident: "postcss",
                            plugins: [PostCssPresetEnv()]
                        }
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            }
        ]
    }
};
