const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PUBLIC_DIR = __dirname + '/public';
const DIST_DIR = PUBLIC_DIR + '/dist';

const config = {
    entry: ['regenerator-runtime/runtime', __dirname + '/app/client/index.js'],
    output: {
        path: DIST_DIR,
        filename: 'app.bundled.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: 'file-loader',
            },
            {
                test: /\.svg$/,
                exclude: /node_modules/,
                loader: 'svg-react-loader',
            },
            {
                test: /\.css/,
                loaders: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(scss|sass)$/,
                exclude: /node_modules/,
                loaders: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            minimize: true,
                            sourceMap: true,
                            importLoaders: 1,
                            localIdentName: '[local]___[hash:base64:5]',
                        },
                    },
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: PUBLIC_DIR + '/index.template.html',
            filename: '../index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css',
        }),
    ],
};

module.exports = config;
