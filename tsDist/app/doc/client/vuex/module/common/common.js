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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
var type_json_1 = __importDefault(require("./type.json"));
exports.default = {
    state: {
        window: null,
        appContent: null,
        compStage: null,
        typeUI: 'bootstrap',
        typeTheme: 'primary',
        deviceSize: ''
    },
    getters: (_a = {},
        _a[type_json_1.default.window.get] = function (state) {
            return state.window;
        },
        _a[type_json_1.default.appContent.get] = function (state) {
            return state.appContent;
        },
        _a[type_json_1.default.compStage.get] = function (state) {
            return state.compStage;
        },
        _a[type_json_1.default.typeUI.get] = function (state) {
            return state.typeUI;
        },
        _a[type_json_1.default.typeTheme.get] = function (state) {
            return state.typeTheme;
        },
        _a[type_json_1.default.deviceSize] = function (state) {
            return state.deviceSize.replace(/('|")/g, '');
        },
        _a),
    actions: (_b = {},
        _b[type_json_1.default.window.add] = function (_a, item) {
            var commit = _a.commit;
            return commit(type_json_1.default.window.add, item);
        },
        _b[type_json_1.default.appContent.add] = function (_a, item) {
            var commit = _a.commit;
            return commit(type_json_1.default.appContent.add, item);
        },
        _b[type_json_1.default.compStage.add] = function (_a, item) {
            var commit = _a.commit;
            return commit(type_json_1.default.compStage.add, item);
        },
        _b[type_json_1.default.typeTheme.add] = function (_a, value) {
            var commit = _a.commit;
            return commit(type_json_1.default.typeTheme.add, value);
        },
        _b[type_json_1.default.typeUI.add] = function (_a, value) {
            var commit = _a.commit;
            return commit(type_json_1.default.typeUI.add, value);
        },
        _b[type_json_1.default.deviceSize] = function (_a, sizeName) {
            var commit = _a.commit;
            return commit(type_json_1.default.deviceSize, sizeName);
        },
        _b),
    mutations: (_c = {},
        _c[type_json_1.default.window.add] = function (state, _a) {
            var _b;
            var prop = _a.prop, value = _a.value;
            state.window = __assign(__assign({}, state.window), (_b = {}, _b[prop] = value, _b));
        },
        _c[type_json_1.default.appContent.add] = function (state, vm) {
            state.appContent = vm;
        },
        _c[type_json_1.default.compStage.add] = function (state, vm) {
            state.compStage = vm.$el;
        },
        _c[type_json_1.default.typeUI.add] = function (state, value) {
            state.typeUI = value;
        },
        _c[type_json_1.default.typeTheme.add] = function (state, value) {
            state.typeTheme = value;
        },
        _c[type_json_1.default.deviceSize] = function (state, sizeName) {
            state.deviceSize = sizeName;
        },
        _c)
};
//# sourceMappingURL=common.js.map