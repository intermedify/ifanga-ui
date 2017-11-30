const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const ASSET_PATH = './src';
const ENTRY_FILE = 'ifanga.entry';

module.exports = merge(common, {
    entry: [`${ASSET_PATH}/${ENTRY_FILE}.js`, `${ASSET_PATH}/${ENTRY_FILE}.scss`],
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"',
            },
        }),
        new UglifyJsPlugin({
            parallel: true,
            sourceMap: true,
            cache: true,
            include: /\.min\.js$/,
        }),
    ],
});
