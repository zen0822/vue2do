"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
var type_json_1 = __importDefault(require("./type.json"));
exports.default = {
    state: {
        alert: null,
        confirm: null,
        tip: null,
        toast: null,
        tooltip: null,
        deviceSize: ''
    },
    getters: (_a = {},
        _a[type_json_1.default.alert.get] = function (state) {
            return state.alert;
        },
        _a[type_json_1.default.confirm.get] = function (state) {
            return state.confirm;
        },
        _a[type_json_1.default.tip.get] = function (state) {
            return state.tip;
        },
        _a[type_json_1.default.toast.get] = function (state) {
            return state.toast;
        },
        _a[type_json_1.default.tooltip.get] = function (state) {
            return state.tooltip;
        },
        _a[type_json_1.default.deviceSize] = function (state) {
            return state.deviceSize.replace(/('|")/g, '');
        },
        _a),
    actions: (_b = {},
        _b[type_json_1.default.alert.add] = function (_a, component) {
            var commit = _a.commit;
            return commit(type_json_1.default.alert.add, component);
        },
        _b[type_json_1.default.confirm.add] = function (_a, component) {
            var commit = _a.commit;
            return commit(type_json_1.default.confirm.add, component);
        },
        _b[type_json_1.default.tip.add] = function (_a, component) {
            var commit = _a.commit;
            return commit(type_json_1.default.tip.add, component);
        },
        _b[type_json_1.default.toast.add] = function (_a, component) {
            var commit = _a.commit;
            return commit(type_json_1.default.toast.add, component);
        },
        _b[type_json_1.default.tooltip.add] = function (_a, component) {
            var commit = _a.commit;
            return commit(type_json_1.default.tooltip.add, component);
        },
        _b[type_json_1.default.deviceSize] = function (_a, sizeName) {
            var commit = _a.commit;
            return commit(type_json_1.default.deviceSize, sizeName);
        },
        _b),
    mutations: (_c = {},
        _c[type_json_1.default.alert.add] = function (state, component) {
            state.alert = component;
        },
        _c[type_json_1.default.tip.add] = function (state, component) {
            state.tip = component;
        },
        _c[type_json_1.default.confirm.add] = function (state, component) {
            state.confirm = component;
        },
        _c[type_json_1.default.toast.add] = function (state, component) {
            state.toast = component;
        },
        _c[type_json_1.default.tooltip.add] = function (state, component) {
            state.tooltip = component;
        },
        _c[type_json_1.default.deviceSize] = function (state, sizeName) {
            state.deviceSize = sizeName;
        },
        _c)
};
//# sourceMappingURL=common.js.map