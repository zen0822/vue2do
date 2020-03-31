"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var workbox_webpack_plugin_1 = __importDefault(require("workbox-webpack-plugin"));
var gqlPort = 5168;
exports.default = {
    apiUrl: '//example.com',
    baseUrl: './',
    execute: './main.ts',
    bundleAnalyzer: true,
    favicon: './client/asset/img/favicon.ico',
    gzip: true,
    path: path_1.default.resolve(__dirname, '../../../app/mock/'),
    port: 80,
    htmlName: 'index',
    htmlTitle: 'mock',
    name: 'mock',
    outDir: './dist',
    proxy: {
        '/gql': {
            target: "http://localhost:" + gqlPort,
            pathRewrite: {
                '^/gql': ''
            }
        },
        '/api/**': {
            target: "http://localhost"
        },
        '/sw.js': "http://localhost:5169"
    },
    staticDir: 'static',
    tpl: true,
    type: 'spa',
    webpack: function (config) {
        var swPath = path_1.default.resolve(__dirname, '../../../app/mock/dist/sw/sw.js');
        if (process.env.NODE_ENV === 'development') {
            config.devServer
                .contentBase([path_1.default.resolve(__dirname, '../../../app/mock/dist/sw/')])
                .watchContentBase(true);
            // .stats('normal')
        }
        if (process.env.NODE_ENV === 'production') {
            try {
                fs_1.default.accessSync(swPath, fs_1.default.constants.F_OK);
                config
                    .plugin('workbox')
                    .use(workbox_webpack_plugin_1.default.InjectManifest, [{
                        mode: 'production',
                        swSrc: swPath,
                        maximumFileSizeToCacheInBytes: 20000000
                    }]);
            }
            catch (error) {
                console.warn("\n\u5728\u5E94\u7528\u7684 dist/sw \u672A\u627E\u5230 sw.js \u6587\u4EF6\uFF0C\u9700\u8981\u5148\u8FD0\u884C npm run mock:sw.prod:M \u751F\u6210\u5BF9\u5E94\u6587\u4EF6\uFF0C\u4E0D\u7136\u8FD0\u884C\u4E0D\u4E86 mock:sw \u670D\u52A1\u3002\n");
            }
        }
        config
            .module
            .rule('pre,jsx|tsx')
            .exclude
            .add([/sw.js/])
            .end()
            .rule('js|jsx')
            .exclude
            .add([/sw.js/]);
        return config;
    }
};
//# sourceMappingURL=project.config.js.map