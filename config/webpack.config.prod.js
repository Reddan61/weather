import path from "path"
import { fileURLToPath } from 'url'

import HtmlWebpackPlugin from "html-webpack-plugin"
import { CleanWebpackPlugin }from "clean-webpack-plugin"
import { VueLoaderPlugin } from 'vue-loader'
import MiniCssExtractPlugin from "mini-css-extract-plugin"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
    mode: "production",
    entry: {
        main: path.resolve(__dirname, "..", 'src/index.js')
    },
    output: {
        path: path.resolve(__dirname, "..", 'dist'),
        filename: '[name].bundle.js'
    },
    resolve: {
        extensions:[".json",".js"],
        alias: {
            "@":path.resolve(__dirname,"..", "src")
        }
    },
    optimization: {
        chunkIds: "size",
        moduleIds: "size",
        mangleExports: "size",
        minimize: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Weather',
            template: path.resolve(__dirname, "..",'./public/index.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            },
            {
                test: /\.vue$/,
                use: 'vue-loader',
                exclude: /node_modules/,
            },

            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },

            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },

            {
                test: /\.(scss|css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
            },
        ]
    }
}