// Bring in deps
const path = require('path');
const webpack = require('webpack');

// Bring in our plugins
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const WebpackErrorNotificationPlugin = require('webpack-error-notification');

// The output path for all "built" files
const outputPath = path.join(__dirname, '/www', '[hash]');
const nodeModulePath = path.join(__dirname, 'node_modules');

// Webpack config
module.exports = {
    entry: {
        app: './app.js',
        vendor: './vendor.js',
    },
    output: {
        path: outputPath,
        publicPath: 'www/[hash]',
        filename: '[name].[hash].bundle.js',
        chunkFilename: '[id].[hash].bundle.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style', 'css', 'resolve-url?fail']
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass', 'resolve-url?fail', 'sass?sourceMap'],
            },
            {
                test: /\.js$/,
                loaders: ['babel-loader', 'ng-annotate?add=true&map=false'],
                exclude: nodeModulePath
            },
            {
                test: /\.jpe?g|\.gif$|\.png|\.svg|\.woff|\.eot|\.ttf/,
                loader: 'url-loader'
            }
        ],
    },
    resolve: {
        extensions: ['', '.js'],
        root: [ path.join(__dirname, 'components') ]
    },
    sassLoader: {
        includePaths: [path.resolve(__dirname, './scss')],
    },
    plugins: [
        new ProgressBarPlugin(),
        new WebpackErrorNotificationPlugin()
    ]
};
