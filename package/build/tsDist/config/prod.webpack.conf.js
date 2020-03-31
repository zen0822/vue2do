"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
var clean_webpack_plugin_1 = require("clean-webpack-plugin");
var terser_webpack_plugin_1 = __importDefault(require("terser-webpack-plugin"));
var path_1 = __importDefault(require("path"));
var base_webpack_conf_1 = __importDefault(require("./base.webpack.conf"));
function default_1(_a) {
    var config = _a.config;
    return __awaiter(this, void 0, void 0, function () {
        var projectConfig, pureJs, baseWebpackChain, template, prodWebpackConf, CompressionWebpackPlugin;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    projectConfig = config.project;
                    pureJs = projectConfig.pure;
                    baseWebpackChain = base_webpack_conf_1.default({
                        config: config,
                        extractScss: true,
                        bundleAnalyzer: projectConfig.bundleAnalyzer
                    });
                    template = projectConfig.tpl ?
                        path_1.default.resolve(projectConfig.root, "./index.html") :
                        path_1.default.resolve(__dirname, "../tpl/index.html");
                    prodWebpackConf = {
                        mode: 'production',
                        devtool: config.prod.sourceMap,
                        output: {
                            path: config.prod.outDir,
                            publicPath: config.prod.assetPublicPath
                        },
                        plugin: {
                            clean: {
                                plugin: clean_webpack_plugin_1.CleanWebpackPlugin,
                                args: [{
                                        // dry: true,
                                        verbose: true
                                    }]
                            }
                        }
                    };
                    baseWebpackChain.merge(prodWebpackConf);
                    if (!config.prod.gzip) return [3 /*break*/, 2];
                    return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('compression-webpack-plugin')); })];
                case 1:
                    CompressionWebpackPlugin = _b.sent();
                    baseWebpackChain
                        .plugin('compression')
                        .use(CompressionWebpackPlugin, [{
                            filename: '[path].gz[query]',
                            algorithm: 'gzip',
                            test: new RegExp("\\.(" + config.prod.gzipExt.join('|') + ")$"),
                            threshold: 10240,
                            minRatio: 0.8
                        }]);
                    _b.label = 2;
                case 2:
                    baseWebpackChain
                        .optimization
                        .minimize(true)
                        .minimizer('terser')
                        .use(terser_webpack_plugin_1.default, [{
                            test: /\.m?js(\?.*)?$/i
                        }]);
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
                        return [2 /*return*/, projectConfig.webpack(baseWebpackChain)];
                    }
                    return [2 /*return*/, baseWebpackChain];
            }
        });
    });
}
exports.default = default_1;
//# sourceMappingURL=prod.webpack.conf.js.map