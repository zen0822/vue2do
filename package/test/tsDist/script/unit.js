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
var glob_1 = __importDefault(require("glob"));
var karma_1 = require("karma");
var karma_config_1 = __importDefault(require("../config/karma.config"));
var build_1 = require("@vue2do/build");
var chalk_1 = __importDefault(require("chalk"));
function default_1(_a) {
    var _b;
    var _c = _a.projectConfig, projectConfig = _c === void 0 ? {} : _c, projectConfigPath = _a.projectConfigPath;
    console.log(chalk_1.default.green('@vue2do/test') + ": Starting unit testing server.");
    var projectConfigDir = projectConfig.root || '';
    if (projectConfigPath) {
        projectConfigDir = path_1.default.dirname(projectConfigPath);
        projectConfig = __assign(__assign({}, require(projectConfigPath)), projectConfig);
    }
    var baseWebpackChain = build_1.getConfig({
        config: {
            root: projectConfigDir
        }
    }).base;
    // babel add config
    // env: {
    //   testing: {
    //     plugins: [require.resolve('babel-plugin-istanbul')]
    //   }
    // },
    baseWebpackChain.devtool('#inline-source-map');
    baseWebpackChain.module
        .rule('istanbul_js|jsx')
        .test(/\.js$|\.jsx$/)
        .include
        .add(path_1.default.resolve('./unit/'))
        .end()
        .use('istanbul')
        .loader('istanbul-instrumenter-loader')
        .end();
    var baseWebpackConfig = baseWebpackChain.toConfig();
    delete baseWebpackConfig.entry;
    delete baseWebpackConfig.optimization;
    var karmaServer = new karma_1.Server(__assign(__assign(__assign({}, karma_config_1.default), { files: glob_1.default.sync(path_1.default.resolve(projectConfigDir, './**/__tests__/*.test.@(js|ts)'), {
            ignore: '**/node_modules/**',
            nodir: true
        }), preprocessors: (_b = {},
            _b[path_1.default.resolve(projectConfigDir, './**/__tests__/*.test.js')] = ['webpack', 'sourcemap'],
            _b[path_1.default.resolve(projectConfigDir, './**/__tests__/*.test.ts')] = ['webpack', 'sourcemap'],
            _b), webpack: baseWebpackConfig, webpackMiddleware: {
            stats: 'minimal'
        } }), projectConfig));
    karmaServer.start();
}
exports.default = default_1;
//# sourceMappingURL=unit.js.map