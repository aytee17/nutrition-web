const merge = require("webpack-merge");
const common = require("./webpack.config.js");

module.exports = merge.smart(common, {
    mode: "development",
    devtool: "inline-source-map",
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
        historyApiFallback: true,
        contentBase: "./dist"
    }
});
