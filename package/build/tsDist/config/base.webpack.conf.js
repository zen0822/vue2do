"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var webpack_1 = __importDefault(require("webpack"));
var glob_1 = __importDefault(require("glob"));
var mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
var purgecss_webpack_plugin_1 = __importDefault(require("purgecss-webpack-plugin"));
var fork_ts_checker_webpack_plugin_1 = __importDefault(require("fork-ts-checker-webpack-plugin"));
var webpack_bundle_analyzer_1 = require("webpack-bundle-analyzer");
var webpack_chain_1 = __importDefault(require("webpack-chain"));
var wc_pnp_webpack_plugin_1 = __importDefault(require("@vue2do/wc-pnp-webpack-plugin"));
var pnp_webpack_plugin_1 = __importDefault(require("pnp-webpack-plugin"));
var util_1 = __importDefault(require("../script/util"));
var PnpWebpackPlugin = wc_pnp_webpack_plugin_1.default(pnp_webpack_plugin_1.default);
var webpackChainConfig = new webpack_chain_1.default();
function default_1(_a) {
    var _b;
    var _c = _a.config, config = _c === void 0 ? {} : _c, _d = _a.extractScss, extractScss = _d === void 0 ? false : _d, _e = _a.purgeCss, purgeCss = _e === void 0 ? false : _e, _f = _a.bundleAnalyzer, bundleAnalyzer = _f === void 0 ? false : _f;
    var babelLoader = {
        loader: require.resolve('babel-loader'),
        options: {
            presets: [
                require.resolve('babel-preset-vca-jsx'),
                require.resolve('@vue/babel-preset-app'),
                [require.resolve('@babel/preset-env'), {
                        modules: false,
                        loose: true,
                        targets: {
                            browsers: ['last 2 versions', 'ie >= 10', 'iOS >= 8']
                        }
                    }]
            ],
            plugins: [
                require.resolve('@babel/plugin-syntax-dynamic-import'),
                require.resolve('@babel/plugin-transform-runtime'),
                require.resolve('babel-plugin-transform-object-rest-spread')
            ]
        }
    };
    var utils = util_1.default({
        config: config
    });
    var projectConfig = config.project;
    var appName = projectConfig.name;
    var globalRoot = config.global.root;
    var projectPath = projectConfig.root;
    var extractTextScss = null;
    if (extractScss) {
        extractTextScss = new mini_css_extract_plugin_1.default({
            filename: utils.assetsPath('css/[name].[hash].css')
        });
    }
    var commonRule = {
        include: [
            projectPath,
            path_1.default.resolve(__dirname, '../util'),
            // path.resolve(__dirname, '../../component'),
            /package\/component/,
            /@vue2do/
        ]
    };
    var entryConfig = {};
    var configRule = {
        'vue': __assign(__assign({}, commonRule), { test: /\.vue$/, use: {
                vuecss: {
                    loader: require.resolve('vue'),
                    options: {
                        loaders: utils.cssLoaders()
                    }
                },
                vue: {
                    loader: require.resolve('vue-loader'),
                    options: {
                        esModule: true
                    }
                }
            } }),
        'pre,jsx|tsx': __assign(__assign({}, commonRule), { test: /\.(j|t)sx?$/, enforce: 'pre', use: {
                eslint: {
                    loader: require.resolve('eslint-loader')
                }
            } }),
        'ts|tsx': __assign(__assign({}, commonRule), { test: /\.tsx?$/, use: {
                babel: babelLoader,
                ts: {
                    loader: require.resolve('ts-loader'),
                    options: PnpWebpackPlugin.tsLoaderOptions({
                        appendTsxSuffixTo: [/\.vue$/],
                        transpileOnly: true,
                        experimentalWatchApi: true,
                        compilerOptions: {
                            module: 'es6',
                            target: 'es6',
                            noEmit: true
                        }
                    })
                }
            } }),
        'js|jsx': __assign(__assign({}, commonRule), { test: /\.jsx?$/, use: {
                babel: babelLoader
            } }),
        css: __assign(__assign({}, commonRule), { test: /\.(css)$/, use: {
                style: {
                    loader: extractScss ? mini_css_extract_plugin_1.default.loader : require.resolve('style-loader')
                },
                css: {
                    loader: require.resolve('css-loader')
                },
                postcss: {
                    loader: require.resolve('postcss-loader')
                }
            } }),
        scss: __assign(__assign({}, commonRule), { test: /\.(scss)$/, use: {
                style: {
                    loader: extractScss ? mini_css_extract_plugin_1.default.loader : require.resolve('style-loader')
                },
                css: {
                    loader: require.resolve('css-loader')
                },
                postcss: {
                    loader: require.resolve('postcss-loader')
                },
                sass: {
                    loader: require.resolve('sass-loader')
                }
            } }),
        less: __assign(__assign({}, commonRule), { test: /\.(less)$/, use: {
                style: {
                    loader: extractScss ? mini_css_extract_plugin_1.default.loader : require.resolve('style-loader')
                },
                css: {
                    loader: require.resolve('css-loader')
                },
                postcss: {
                    loader: require.resolve('postcss-loader')
                },
                sass: {
                    loader: require.resolve('less-loader')
                }
            } }),
        img: __assign(__assign({}, commonRule), { test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/, use: {
                url: {
                    loader: require.resolve('url-loader'),
                    options: {
                        limit: 10000,
                        name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                    }
                }
            } }),
        media: __assign(__assign({}, commonRule), { test: /\.(mp3|aac|ogg)(\?.*)?$/, use: {
                file: {
                    loader: require.resolve('file-loader')
                }
            } }),
        'html|tpl': __assign(__assign({}, commonRule), { test: /\.(html|tpl)$/, use: {
                file: {
                    loader: require.resolve('html-loader')
                }
            } }),
        'pug': __assign(__assign({}, commonRule), { test: /\.(pug)$/, use: {
                file: {
                    loader: require.resolve('pug-loader')
                }
            } })
    };
    if (projectConfig.type === 'map') {
        var entryHub = utils.entryHub(path_1.default.resolve(projectPath, "./entry"));
        entryHub.forEach(function (entryName) {
            var _a;
            entryConfig = __assign(__assign({}, entryConfig), (_a = {}, _a[entryName] = [
                path_1.default.resolve(projectPath, "./entry/" + entryName + ".tsx")
            ], _a));
        });
    }
    else {
        entryConfig = __assign(__assign({}, entryConfig), (_b = {}, _b[appName] = [
            path_1.default.resolve(projectPath, projectConfig.execute || './index')
        ], _b));
    }
    var baseConf = {
        entry: entryConfig,
        module: {
            rule: configRule
        },
        output: {
            path: config.prod.outDir,
            filename: utils.assetsPath('js/[name].bundle.[hash:7].js')
        },
        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    },
                    styles: {
                        name: 'styles',
                        test: /\.css$/,
                        chunks: 'all',
                        enforce: true
                    }
                }
            }
        },
        plugin: {
            forkTsChecker: {
                plugin: fork_ts_checker_webpack_plugin_1.default,
                args: [PnpWebpackPlugin.forkTsCheckerOptions({
                        useTypescriptIncrementalApi: false,
                        eslint: true,
                        async: true,
                        watch: [projectPath],
                        reportFiles: [projectPath]
                    })]
            }
        },
        performance: {
            maxEntrypointSize: 104857600,
            maxAssetSize: 10485760
        },
        stats: 'normal',
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            alias: {
                'vue$': 'vue/dist/vue.esm.js'
            },
            plugin: {
                pnp: {
                    plugin: PnpWebpackPlugin
                }
            }
        },
        resolveLoader: {
            plugin: {
                pnp: {
                    plugin: PnpWebpackPlugin.moduleLoader(module)
                }
            }
        }
    };
    webpackChainConfig.merge(baseConf);
    if (projectConfig.type === 'spa') {
        webpackChainConfig.output.chunkFilename(utils.assetsPath('js/[name].bundle.[hash:7].js'));
    }
    if (config.zepto) {
        webpackChainConfig.module
            .rule('exportZepto')
            .test(require.resolve(path_1.default.resolve(globalRoot, './lib/zepto/zepto1.2.0.min.js')))
            .use('exports')
            .loader('exports-loader?window.$!script-loader');
        webpackChainConfig
            .plugin('webpackProvide')
            .use(webpack_1.default.ProvidePlugin, [{
                $: require.resolve(path_1.default.resolve(__dirname, globalRoot + "/lib/zepto/zepto1.2.0.min.js"))
            }]);
    }
    if (extractScss) {
        webpackChainConfig
            .plugin('extractTextScss')
            .use(extractTextScss);
    }
    if (purgeCss) {
        webpackChainConfig
            .plugin('purgeCss')
            .use(purgecss_webpack_plugin_1.default, [{
                paths: function () { return glob_1.default.sync([
                    projectPath + "/**/*",
                    path_1.default.resolve(__dirname, '../../component') + "/**/*",
                    "!" + path_1.default.resolve(__dirname, '../../component') + "/node_modules/**/*"
                ].join(''), { nodir: true }); }
            }]);
    }
    if (bundleAnalyzer) {
        webpackChainConfig
            .plugin('bundleAnalyzer')
            .use(webpack_bundle_analyzer_1.BundleAnalyzerPlugin, [{
                analyzerMode: 'static',
                reportFilename: 'webpack-bundle-report.html',
                defaultSizes: 'parsed',
                openAnalyzer: false,
                generateStatsFile: false,
                statsFilename: 'stats.json',
                statsOptions: null,
                logLevel: 'info'
            }]);
    }
    return webpackChainConfig;
}
exports.default = default_1;
//# sourceMappingURL=base.webpack.conf.js.map