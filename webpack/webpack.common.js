const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require('dotenv-webpack');
const srcDir = path.join(__dirname, "..", "src");

module.exports = {
    entry: {
      menu: path.join(srcDir, 'menu.tsx'),
      selectListener: path.join(srcDir, 'selectListener.ts'),
      contentScript: path.join(srcDir, 'contentScript.tsx'),
    },
    output: {
        path: path.join(__dirname, "../dist/js"),
        filename: "[name].js",
    },
    optimization: {
        splitChunks: {
            name: "vendor",
            chunks(chunk) {
              return chunk.name !== 'selectListener';
            }
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: ".", to: "../", context: "public" }],
            options: {},
        }),
        new Dotenv({
            path: './.env',
        }),
    ],
};
