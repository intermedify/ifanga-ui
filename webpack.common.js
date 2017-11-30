const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const ASSET_PATH = './src';
const ENTRY_FILE = 'ifanga.entry';
const DEST_PATH = 'dist';
const BUNDLE_FILE = 'ifanga.min';

module.exports = (env = {}) => {
    return {
        devtool: 'cheap-module-source-map',
        entry: [`${ASSET_PATH}/${ENTRY_FILE}.js`, `${ASSET_PATH}/${ENTRY_FILE}.scss`],
        output: {
            filename: `${DEST_PATH}/${BUNDLE_FILE}.js`,
            hotUpdateChunkFilename: 'runtime/hot-update.js',
            hotUpdateMainFilename: 'runtime/hot-update.json',
        },
        resolveLoader: {
            modules: [path.join(__dirname, 'node_modules')],
            moduleExtensions: ['-loader'],
        },
        resolve: {
            modules: [path.resolve(__dirname, 'src'), 'node_modules'],
            descriptionFiles: ['package.json'],
            moduleExtensions: ['-loader'],
            extensions: ['.js', '.scss', '.css'],
        },
        module: {
            loaders: [
                {
                    test: /\.(ttf|eot|woff|woff2)$/,
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name].[ext]?[hash]',
                    },
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    include: [path.resolve(__dirname, './src')],
                    loader: 'babel-loader',
                },
            ],
            rules: [
                {
                    test: /\.js$/,
                    use: ['babel'],
                    exclude: [],
                },
                {
                    test: /\.(woff2?|ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name].[ext]?[hash]',
                    },
                },
                {
                    test: /.scss$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                sourceMap: true,
                                name: `${BUNDLE_FILE}.css`,
                                outputPath: `${DEST_PATH}/`,
                            },
                        },
                        {
                            loader: 'extract-loader',
                        },
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader: 'postcss-loader',
                        },
                        {
                            loader: 'sass-loader',
                        },
                    ],
                },
            ],
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new CopyWebpackPlugin([
                {
                    from: path.join(__dirname, 'src/fonts/'),
                    to: path.join(__dirname, 'dist/fonts/'),
                    force: true,
                },
            ]),
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false,
            }),
        ],
        node: {
            fs: 'empty',
            vm: 'empty',
            net: 'empty',
            tls: 'empty',
        },
    };
};
