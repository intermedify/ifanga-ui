const path = require('path');

const ASSET_PATH = './src';
const ENTRY_FILE = 'ifanga.entry';
const DEST_PATH = 'dist';
const BUNDLE_FILE = 'ifanga.bundle';

module.exports = (env = {}) => {
    return {
        entry: [`${ASSET_PATH}/${ENTRY_FILE}.js`, `${ASSET_PATH}/${ENTRY_FILE}.scss`],
        output: {
            filename: `${DEST_PATH}/${BUNDLE_FILE}.js`,
        },
        module: {
            rules: [
                {
                    test: /.scss$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
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
        devServer: {
            contentBase: [path.join(__dirname, 'test'), path.join(__dirname, 'dist')],
            compress: true,
            port: 9000,
            disableHostCheck: true,
            lazy: true,
            historyApiFallback: true,
            hot: true,
        },
    };
};
