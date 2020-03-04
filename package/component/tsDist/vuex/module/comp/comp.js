"use strict";
/**
 * 具有唯一 id 的组件
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
var type_json_1 = __importDefault(require("./type.json"));
exports.default = {
    state: {
        menu: {},
        select: {},
        input: {}
    },
    getters: (_a = {},
        _a[type_json_1.default.common.get] = function (state) {
            return state.input;
        },
        _a),
    actions: (_b = {},
        _b[type_json_1.default.common.add] = function (_a, compOpt) {
            var commit = _a.commit;
            return commit(type_json_1.default.common.add, compOpt);
        },
        _b),
    mutations: (_c = {},
        _c[type_json_1.default.common.add] = function (state, _a) {
            var vm = _a.vm, name = _a.name, id = _a.id;
            state[name][id] = vm;
        },
        _c)
};
//# sourceMappingURL=comp.js.map