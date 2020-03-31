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
var chalk_1 = __importDefault(require("chalk"));
var plugin_1 = __importDefault(require("webpack-dashboard/plugin"));
var html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
var progress_bar_webpack_plugin_1 = __importDefault(require("progress-bar-webpack-plugin"));
var base_webpack_conf_1 = __importDefault(require("./base.webpack.conf"));
function default_1(_a) {
    var _b;
    var config = _a.config;
    var appName = config.project.name;
    var pureJs = config.project.pure;
    var projectConfig = config.project;
    var baseWebpackChain = base_webpack_conf_1.default({
        config: config,
        extractScss: false,
        purgeCss: false
    });
    var template = projectConfig.tpl ?
        path_1.default.resolve(projectConfig.root, "./index.html") :
        path_1.default.resolve(__dirname, "../tpl/index.html");
    var baseEntry = {};
    if (projectConfig.type === 'spa') {
        baseEntry = baseWebpackChain.entryPoints.get(appName).values();
    }
    else {
        // Object.keys(baseWebpackConfig.entry).forEach((entryName) => {
        //   Object.assign(baseEntry, {
        //     [entryName]: baseWebpackConfig.entry[entryName].concat([
        //       `webpack-dev-server/client?http://0.0.0.0:${config.dev.port}`,
        //       'webpack/hot/dev-server',
        //       'react-hot-loader/patch'
        //     ])
        //   })
        // })
    }
    var commonRule = {
        include: [
            projectConfig.root,
            path_1.default.resolve(__dirname, '../util'),
            path_1.default.resolve(__dirname, '../../component')
        ]
    };
    var devConf = {
        devtool: '#eval-source-map',
        mode: 'development',
        entry: (_b = {},
            _b[appName] = baseEntry,
            _b),
        module: {
            rules: {
                less: __assign(__assign({}, commonRule), { test: /(grid|util)\.scss$/, use: {
                        style: {
                            loader: 'style-loader'
                        },
                        css: {
                            loader: 'css-loader'
                        },
                        postcss: {
                            loader: 'postcss-loader'
                        },
                        sass: {
                            loader: 'less-loader'
                        }
                    } })
            }
        },
        output: {
            publicPath: config.dev.assetPublicPath
        },
        optimization: {
            usedExports: true
        },
        plugin: {
            dashboard: {
                plugin: plugin_1.default
            },
            webpackLoaderOptions: {
                plugin: webpack_1.default.LoaderOptionsPlugin,
                args: [{
                        debug: true
                    }]
            },
            webpackHotModuleReplacement: {
                plugin: webpack_1.default.HotModuleReplacementPlugin
            },
            webpackNamedModules: {
                plugin: webpack_1.default.NamedModulesPlugin
            },
            webpackNoEmitOnErrors: {
                plugin: webpack_1.default.NoEmitOnErrorsPlugin
            },
            webpackOptimizeOccurrenceOrder: {
                plugin: webpack_1.default.optimize.OccurrenceOrderPlugin
            },
            progressBar: {
                plugin: progress_bar_webpack_plugin_1.default,
                args: [{
                        format: "build [:bar] " + chalk_1.default.green.bold(':percent') + "  (:elapsed \u79D2)",
                        complete: '>',
                        incomplete: '-',
                        clear: false
                    }]
            }
        },
        devServer: {
            clientLogLevel: 'info',
            disableHostCheck: true,
            hot: true,
            historyApiFallback: true,
            headers: {
                'X-Custom-Header': 'yes'
            },
            inline: true,
            proxy: config.dev.proxyTable,
            watchOptions: {
                aggregateTimeout: 300,
                poll: 1000
            },
            stats: 'errors-warnings'
        }
    };
    baseWebpackChain.merge(devConf);
    if (!pureJs) {
        baseWebpackChain
            .plugin('html')
            .use(html_webpack_plugin_1.default, [{
                filename: (projectConfig.htmlName ? projectConfig.htmlName : 'index') + ".html",
                template: template,
                title: projectConfig.htmlTitle,
                inject: true,
                favicon: projectConfig.favicon && path_1.default.resolve(projectConfig.root, projectConfig.favicon)
            }]);
    }
    if (typeof projectConfig.webpack === 'function') {
        return projectConfig.webpack(baseWebpackChain);
    }
    return baseWebpackChain;
}
exports.default = default_1;
//# sourceMappingURL=dev.webpack.conf.js.map