const merge = require("webpack-merge");
const common = require("./webpack.config.js");
const CompressionPlugin = require("compression-webpack-plugin");

const S3Plugin = require("webpack-s3-plugin");

module.exports = merge.smart(common, {
    mode: "production",
    plugins: [
        new CompressionPlugin({
            test: /\.(js|css)/,
            deleteOriginalAssets: true
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
                            localIdentName: "[hash:base64:5]"
                        }
                    }
                ]
            }
        ]
    }
});
