"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
var type_json_1 = __importDefault(require("./type.json"));
exports.default = {
    state: {
        ex: ''
    },
    getters: (_a = {},
        _a[type_json_1.default.ex.add] = function (state) {
            return state.ex;
        },
        _a),
    actions: (_b = {},
        _b[type_json_1.default.ex.add] = function (_a, item) {
            var commit = _a.commit;
            return commit(type_json_1.default.ex.add, item);
        },
        _b),
    mutations: (_c = {},
        _c[type_json_1.default.ex.add] = function (state, str) {
            state.ex = str;
        },
        _c)
};
//# sourceMappingURL=common.js.map