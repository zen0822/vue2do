"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
exports.default = {
    autoWatch: false,
    basePath: '../',
    browsers: ['Chrome'],
    captureTimeout: 120000,
    colors: true,
    coverageIstanbulReporter: {
        reports: ['html', 'lcovonly', 'text-summary'],
        fixWebpackSourcePaths: true,
        dir: path_1.default.join(__dirname, 'coverage')
    },
    devtool: 'inline-cheap-module-source-map',
    exclude: ['./tsDist/**'],
    frameworks: ['mocha', 'sinon-chai', 'source-map-support'],
    files: [],
    output: {
        devtoolModuleFilenameTemplate: '[absolute-resource-path]',
        devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
    },
    preprocessors: {},
    port: 9877,
    reporters: ['spec', 'coverage-istanbul'],
    singleRun: false
};
//# sourceMappingURL=karma.config.js.map