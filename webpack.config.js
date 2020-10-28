const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const autoprefixer = require('autoprefixer');
const postcssFlexbugs = require('postcss-flexbugs-fixes');
const postcssPresetEnv = require('postcss-preset-env');
const postcssNormalize = require('postcss-normalize');

const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');

// Monaco Editor
// const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';
const ie11 = process.env.IE11 === 'true';

const publicPath = devMode ? '/' : '/extms/';

const imageInlineSizeLimit = parseInt(
    process.env.IMAGE_INLINE_SIZE_LIMIT || '10000'
);

const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
        devMode && require.resolve('style-loader'),
        !devMode && {
            loader: MiniCssExtractPlugin.loader,
        },
        {
            loader: require.resolve('css-loader'),
            options: {
                importLoaders: 1,
                sourceMap: !devMode,
            },
        },
        {
            loader: require.resolve('postcss-loader'),
            options: {
                ident: 'postcss',
                plugins: () => [
                    postcssFlexbugs,
                    postcssPresetEnv({
                        autoprefixer: {
                            flexbox: 'no-2009',
                        },
                        stage: 3,
                    }),
                    postcssNormalize(),
                ],
                sourceMap: !devMode,
            },
        },
    ].filter(Boolean);

    if (preProcessor) {
        loaders.push(
            {
                loader: require.resolve('resolve-url-loader'),
                options: {
                    sourceMap: !devMode,
                },
            },
            {
                loader: require.resolve(preProcessor),
                options: {
                    sourceMap: true,
                },
            }
        );
    }

    return loaders;
}

module.exports = () => {

    return {
        mode: devMode ? 'development' : 'production',

        bail: !devMode,

        entry: {
            app: [
                devMode && !ie11 && require.resolve('react-dev-utils/webpackHotDevClient'), // ie11 작동을 위해
                devMode && !ie11 && 'react-hot-loader/patch', // ie11 작동을 위해
                path.resolve(__dirname, 'src/index.js'),
            ].filter(Boolean),
        },
    
        output: {
            filename: devMode 
                ? '[name].[hash].js' 
                : 'js/[name].[chunkhash:8].js',
            chunkFilename: devMode
                ? '[name].chunk.js'
                : 'js/[name].[chunkhash:8].chunk.js',
            path: devMode 
                ? path.resolve(__dirname, 'public')
                : path.resolve(__dirname, 'build'),
            pathinfo: devMode,
            publicPath: publicPath,
        },
    
        module: {
            rules: [
                {
                    test: /\.(js|mjs|jsx)$/,
                    enforce: 'pre',
                    use: [
                        {
                            loader: require.resolve('eslint-loader'),
                            options: {
                                formatter: require.resolve('react-dev-utils/eslintFormatter'),
                                eslintPath: require.resolve('eslint'),
                                quiet: true,
                            },
                        },
                    ],
                    exclude: /node_modules/,
                    // include: [
                    //     path.resolve(__dirname, 'src'),
                    //     // path.resolve(__dirname, 'examples'),
                    // ],
                },
                {
                    oneOf: [
                        {
                            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                            loader: require.resolve('url-loader'),
                            options: {
                              limit: imageInlineSizeLimit,
                              name: 'static/media/[name].[hash:8].[ext]',
                            },
                        },
                        {
                            test: /\.(js|mjs|jsx)$/,
                            exclude: path.resolve(__dirname, 'node_modules'),
                            loader: require.resolve('babel-loader'),
                            options: {
                                plugins: ['react-hot-loader/babel'],
                                cacheDirectory: true,
                                cacheCompression: true,
                                compact: true,
                            },
                        },
                        {
                            test: /\.css$/,
                            // use: devMode ? cssuse : MiniCssExtractPlugin.loader,
                            use: getStyleLoaders({
                                importLoaders: 1,
                                sourceMap: !devMode,
                            }),
                            sideEffects: true,
                        },
                        {
                            test: /\.(scss|sass)$/,
                            use: getStyleLoaders(
                                {
                                    importLoaders: 3,
                                    sourceMap: !devMode,
                                },
                                'sass-loader',
                            ),
                            sideEffects: true,
                        },
                        {
                            test: /\.less$/, // less module v2.7.3 설치해야 함(antd .bezierEasingMixin() 에러남)
                            use: [
                                // {
                                //     loader: 'style-loader', // creates style nodes from JS strings
                                // }, {
                                //     loader: 'css-loader', // translates CSS into CommonJS
                                // }, {
                                //     loader: 'less-loader', // compiles Less to CSS
                                // },
                                require.resolve('style-loader'),
                                {
                                    loader: require.resolve('css-loader'),
                                    options: {
                                        importLoaders: 1,
                                        sourceMap: true,
                                    },
                                },
                                // autoprefixer 패치버전 나오면 주석 제거(Fix text-decoration-skip-ink support.)
                                // 패치버전 나와서 주석 제거함
                                {
                                    loader: require.resolve('postcss-loader'),
                                    options: {
                                        ident: 'postcss',
                                        plugins: () => [
                                            postcssFlexbugs,
                                            postcssPresetEnv({
                                                autoprefixer: {
                                                    flexbox: 'no-2009',
                                                },
                                                stage: 3,
                                            }),
                                        ],
                                        sourceMap: true,
                                    },
                                },
                                {
                                    loader: require.resolve('less-loader'), // compiles Less to CSS
                                    options: {
                                        sourceMap: true,
                                    },
                                },
                            ],
                        },
                        {
                            loader: require.resolve('file-loader'),
                            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
                            options: {
                              name: 'static/media/[name].[hash:8].[ext]',
                            },
                          },
                    ]
                },
            ],
        },
    
        resolve: {
            alias: {
                actions: path.resolve(__dirname, 'src/actions/'),
                commons: path.resolve(__dirname, 'src/commons/'),
                pages: path.resolve(__dirname, 'src/pages/'),
                apis: path.resolve(__dirname, 'src/apis/'),
                mobxStore: path.resolve(__dirname, 'src/mobxStore/'),
                styles: path.resolve(__dirname, 'styles/'),
                'react-dom': '@hot-loader/react-dom',
            },
            extensions: ['.js'],
        },
    
        devtool: devMode ? 'inline-source-map' : 'cheap-module-source-map', // cheap-module-source-map, eval-source-map, inline-source-map, source-map
    
        devServer: {
            inline: true,
            host: '0.0.0.0',
            port: 8080,
            hot: true,
            disableHostCheck: true,
            historyApiFallback: true,
            contentBase: path.resolve(__dirname, 'public'),
            publicPath: publicPath,
            transportMode: 'ws',
            injectClient: false,
        },
    
        optimization: {
            minimize: !devMode,
            minimizer: [
                // This is only used in production mode
                new TerserPlugin({
                    terserOptions: {
                        parse: {
                            // we want terser to parse ecma 8 code. However, we don't want it
                            // to apply any minfication steps that turns valid ecma 5 code
                            // into invalid ecma 5 code. This is why the 'compress' and 'output'
                            // sections only apply transformations that are ecma 5 safe
                            // https://github.com/facebook/create-react-app/pull/4234
                            ecma: 8,
                        },
                        compress: {
                            ecma: 5,
                            warnings: false,
                            // Disabled because of an issue with Uglify breaking seemingly valid code:
                            // https://github.com/facebook/create-react-app/issues/2376
                            // Pending further investigation:
                            // https://github.com/mishoo/UglifyJS2/issues/2011
                            comparisons: false,
                            // Disabled because of an issue with Terser breaking valid code:
                            // https://github.com/facebook/create-react-app/issues/5250
                            // Pending futher investigation:
                            // https://github.com/terser-js/terser/issues/120
                            inline: 2,
                        },
                        mangle: {
                            safari10: true,
                        },
                        output: {
                            ecma: 5,
                            comments: false,
                            // Turned on because emoji and regex is not minified properly using default
                            // https://github.com/facebook/create-react-app/issues/2488
                            ascii_only: true,
                        },
                    },
                    // Use multi-process parallel running to improve the build speed
                    // Default number of concurrent runs: os.cpus().length - 1
                    parallel: true,
                    // Enable file caching
                    cache: true,
                    sourceMap: true,
                }),
                // This is only used in production mode
                new OptimizeCSSAssetsPlugin({
                    cssProcessorOptions: {
                        parser: safePostCssParser,
                        map: {
                            // `inline: false` forces the sourcemap to be output into a
                            // separate file
                            inline: false,
                            // `annotation: true` appends the sourceMappingURL to the end of
                            // the css file, helping the browser find the sourcemap
                            annotation: true,
                        },
                    },
                }),
            ],
            // Automatically split vendor and commons
            // https://twitter.com/wSokra/status/969633336732905474
            // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
            splitChunks: {
                chunks: 'all',
                name: false,
            },
            // Keep the runtime chunk separated to enable long term caching
            // https://twitter.com/wSokra/status/969679223278505985
            runtimeChunk: {
                name: 'runtime',
            },
        },
    
        plugins: [
            devMode && new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({
                inject: true,
                template: path.resolve(__dirname, 'src/index.html'),
            }),
            !devMode && new MiniCssExtractPlugin({
                filename: 'static/[name].[contenthash].css', // '[name].css'
                chunkFilename: 'static/[id].[contenthash].css', // '[id].css'
            }),
            // new MonacoWebpackPlugin(),
        ].filter(Boolean),
    }
};
