const ASSET_PATH = './src';
const ENTRY_FILE = 'ifanga.entry';
const DEST_PATH 'dist';
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
                                name: '[name].css',
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
    };
};
