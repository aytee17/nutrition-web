const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PostCssPresetEnv = require("postcss-preset-env");

module.exports = {
    entry: {
        app: "./src/index.js"
    },
    output: {
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new CleanWebpackPlugin(["dist"]),
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
                    loader: "babel-loader",
                    options: {
                        presets: ["react"],
                        plugins: [
                            "syntax-dynamic-import",
                            "transform-class-properties",
                            "transform-object-rest-spread",
                            "react-hot-loader/babel"
                        ]
                    }
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
