const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "development",
    entry: ["./src/index.js"],
    output: {
        filename: "app.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "styles.css"
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
                        presets: ["react", "flow"],
                        plugins: [
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
                            localIdentName: "[name]__[local]__[hash:base64:5]"
                        }
                    },
                    {
                        loader: "postcss-loader",
                        ident: "post-css",
                        options: {
                            ident: "postcss",
                            plugins: [require("postcss-cssnext")()]
                        }
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: "svg-url-loader"
                    }
                ]
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        contentBase: "./dist"
    }
};
