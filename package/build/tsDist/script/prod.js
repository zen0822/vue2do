"use strict";
/**
 * @param appName { string } - project name
 * @param opt { Object } - the options that start the development project
 */
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
Object.defineProperty(exports, "__esModule", { value: true });
var webpack_1 = __importDefault(require("webpack"));
var ora_1 = __importDefault(require("ora"));
var config_1 = __importDefault(require("../config"));
var prod_webpack_conf_1 = __importDefault(require("../config/prod.webpack.conf"));
var spinner = ora_1.default('building for production...');
function default_1(_a) {
    var _b = _a.projectConfig, projectConfig = _b === void 0 ? {} : _b, projectConfigPath = _a.projectConfigPath, onSuccess = _a.onSuccess;
    return __awaiter(this, void 0, void 0, function () {
        var config, webpackConfig;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, config_1.default({
                        projectConfig: projectConfig,
                        projectConfigPath: projectConfigPath
                    })];
                case 1:
                    config = _c.sent();
                    return [4 /*yield*/, prod_webpack_conf_1.default({
                            config: config
                        })];
                case 2:
                    webpackConfig = _c.sent();
                    console.log("\u6784\u5EFA\u6587\u4EF6\u5C06\u4FDD\u5B58\u5230 " + config.prod.outDir + " \u76EE\u5F55\u4E0B");
                    spinner.start();
                    webpack_1.default(webpackConfig.toConfig(), function (err, stats) {
                        spinner.stop();
                        if (err) {
                            console.error(err.stack || err);
                            if (err.details) {
                                console.error(err.details);
                            }
                            return;
                        }
                        var info = stats.toJson();
                        if (stats.hasErrors()) {
                            console.error(info.errors);
                        }
                        if (stats.hasWarnings()) {
                            console.warn(info.warnings);
                        }
                        console.log(stats.toString({
                            colors: true,
                            modules: false,
                            children: false,
                            chunks: false,
                            chunkModules: false
                        }));
                        // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
                        onSuccess && onSuccess();
                        return process.exit();
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = default_1;
//# sourceMappingURL=prod.js.map