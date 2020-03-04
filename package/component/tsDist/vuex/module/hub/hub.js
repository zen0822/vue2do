"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
var type_json_1 = __importDefault(require("./type.json"));
exports.default = {
    state: {
        select: [],
        input: []
    },
    getters: (_a = {},
        _a[type_json_1.default.input.get] = function (state) {
            return state.input;
        },
        _a),
    actions: (_b = {},
        _b[type_json_1.default.input.add] = function (_a, component) {
            var commit = _a.commit;
            return commit(type_json_1.default.input.add, component);
        },
        _b[type_json_1.default.select.add] = function (_a, component) {
            var commit = _a.commit;
            return commit(type_json_1.default.select.add, component);
        },
        _b),
    mutations: (_c = {},
        _c[type_json_1.default.input.add] = function (state, component) {
            state.input.push(component);
        },
        _c[type_json_1.default.select.add] = function (state, component) {
            state.select.push(component);
        },
        _c)
};
//# sourceMappingURL=hub.js.map