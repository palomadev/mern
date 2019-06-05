const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PUBLIC_DIR = __dirname + '/public';
const DIST_DIR = PUBLIC_DIR + '/dist';
const devMode = process.env.NODE_ENV !== 'production';

const config = {
    mode: devMode ? 'development' : 'production',
    entry: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', 'regenerator-runtime/runtime', __dirname + '/app/client/index.js'],
    output: {
        path: DIST_DIR,
        filename: 'app.bundled.js',
        publicPath: 'dist/',
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
                test: /\.(css|scss|sass)$/,
                exclude: /node_modules/,
                loaders: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true,
                            importLoaders: 1,
                            localIdentName: '[local]-[hash:base64:9]',
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
            filename: PUBLIC_DIR + '/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].[hash].css' : '[name].css',
            chunkFilename: devMode ? '[id].[hash].css' : '[id].css',
        }),
    ],
};

module.exports = config;
