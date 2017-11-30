const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');

const ASSET_PATH = './src';
const ENTRY_FILE = 'ifanga.entry';
const DEV_SERVER_CONTENT_BASE = path.join(__dirname, 'docs');
const DEV_SERVER_DIST_BASE = path.join(__dirname, 'dist');

module.exports = merge(common, {
    entry: [`${ASSET_PATH}/${ENTRY_FILE}.js`, `${ASSET_PATH}/${ENTRY_FILE}.scss`],
    devtool: 'inline-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"',
            },
        }),
    ],
    devServer: {
        contentBase: [DEV_SERVER_CONTENT_BASE, DEV_SERVER_DIST_BASE],
        compress: true,
        port: 9000,
        disableHostCheck: true,
        lazy: true,
        historyApiFallback: true,
        hot: true,
    },
});
