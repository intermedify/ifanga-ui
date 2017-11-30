const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const ASSET_PATH = './src';
const ENTRY_FILE = 'ifanga.entry';
const DEST_PATH = 'dist';
const BUNDLE_FILE = 'ifanga.min';

module.exports = merge(common, {
    output: {
        filename: `${DEST_PATH}/${BUNDLE_FILE}.js`,
    },
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
