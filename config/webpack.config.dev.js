import path from "path"
import webpack from "webpack"
import { fileURLToPath } from 'url'

import HtmlWebpackPlugin from "html-webpack-plugin"
import { CleanWebpackPlugin }from "clean-webpack-plugin"
import { VueLoaderPlugin } from 'vue-loader'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
    mode: "development",
    devtool: 'inline-source-map',
    entry: {
        main: path.resolve(__dirname, "..", 'src/index.js')
    },
    output: {
        path: path.resolve(__dirname, "..", 'dist'),
        filename: '[name].bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions:[".json",".js"],
        alias: {
            "@":path.resolve(__dirname,"..", "src")
        }
    },
    devServer: {
        static: path.resolve(__dirname, "..",'dist'),
        historyApiFallback: true,
        open: true,
        compress: true,
        hot: true,
        port: 3000,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Weather',
            template: path.resolve(__dirname, "..",'./public/index.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin()
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
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
            },
        ]
    }
}