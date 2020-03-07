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
Object.defineProperty(exports, "__esModule", { value: true });
var mock_db_1 = __importDefault(require("./mock.db"));
var mock_config_js_1 = __importDefault(require("../../mock.config.js"));
importScripts('https://zen0822.github.io/lib/workbox/workbox-sw.js');
workbox.setConfig({
    modulePathPrefix: 'https://zen0822.github.io/lib/workbox',
    debug: process.env.SW_DEBUG === 'true'
});
var workboxCore = workbox.core, workboxRouting = workbox.routing, workboxStrategies = workbox.strategies, workboxPrecaching = workbox.precaching;
var self2 = self;
var addEventListener = self2.addEventListener, registration = self2.registration;
var ServiceWorkerMain = /** @class */ (function () {
    function ServiceWorkerMain() {
        workboxCore.setCacheNameDetails({
            precache: 'precache',
            prefix: 'vue2do-doc',
            suffix: 'v1'
        });
        workboxCore.skipWaiting();
        workboxCore.clientsClaim();
        this.init();
        this.registerRoute();
    }
    ServiceWorkerMain.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                workboxRouting.registerRoute(new RegExp('https://localhost/#/'), process.env.SW_ENV === 'development'
                    ? new workboxStrategies.NetworkFirst()
                    : new workboxStrategies.StaleWhileRevalidate());
                workboxPrecaching.precacheAndRoute(self2.__precacheManifest);
                addEventListener('push', function (event) {
                    var title = 'Get Started With Workbox';
                    var options = {
                        body: event.data.text()
                    };
                    event.waitUntil(registration.showNotification(title, options));
                });
                return [2 /*return*/];
            });
        });
    };
    ServiceWorkerMain.prototype.registerRoute = function () {
        var _this = this;
        mock_config_js_1.default.api.forEach(function (item) { return __awaiter(_this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, mock_db_1.default.mock.put({
                                data: item.data,
                                api: item.path,
                                name: item.name
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.warn(error_1);
                        return [3 /*break*/, 3];
                    case 3:
                        workboxRouting.registerRoute(function (_a) {
                            var url = _a.url;
                            if (url.href.includes(item.path)) {
                                return {
                                    name: item.name,
                                    data: item.data
                                };
                            }
                            return false;
                        }, function (_a) {
                            var url = _a.url, params = _a.params;
                            return new Response(JSON.stringify({
                                url: url,
                                data: params.data
                            }), {
                                status: 200,
                                headers: new Headers({
                                    'Accept-Charset': 'utf-8',
                                    'Content-Type': 'application/json',
                                    'Cache-Control': 'max-age=3600'
                                })
                            });
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    };
    return ServiceWorkerMain;
}());
exports.serviceWorkerMain = new ServiceWorkerMain();
//# sourceMappingURL=sw.worker.js.map