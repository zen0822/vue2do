"use strict";
/**
 * Get configuration
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("../config"));
var base_webpack_conf_1 = __importDefault(require("../config/base.webpack.conf"));
var dev_webpack_conf_1 = __importDefault(require("../config/dev.webpack.conf"));
var prod_webpack_conf_1 = __importDefault(require("../config/prod.webpack.conf"));
function default_1(_a) {
    var _b = _a.projectConfig, projectConfig = _b === void 0 ? {} : _b, projectConfigPath = _a.projectConfigPath;
    var config = config_1.default({
        projectConfig: projectConfig,
        projectConfigPath: projectConfigPath
    });
    var baseWebpackChain = base_webpack_conf_1.default({
        config: config
    });
    var devWebpackChain = dev_webpack_conf_1.default({
        config: config
    });
    var prodWebpackChain = prod_webpack_conf_1.default({
        config: config
    });
    return {
        base: baseWebpackChain,
        dev: devWebpackChain,
        prod: prodWebpackChain
    };
}
exports.default = default_1;
//# sourceMappingURL=getConfig.js.map