"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 组装不同的 store 并暴露出来
var vue_1 = __importDefault(require("vue"));
var vuex_1 = __importDefault(require("vuex"));
var common_1 = __importDefault(require("./module/common/common"));
var hub_1 = __importDefault(require("./module/hub/hub"));
var comp_1 = __importDefault(require("./module/comp/comp"));
vue_1.default.use(vuex_1.default);
var commonStore = new vuex_1.default.Store({
    modules: {
        common: common_1.default,
        hub: hub_1.default,
        comp: comp_1.default
    }
});
exports.common = commonStore;
exports.default = commonStore;
//# sourceMappingURL=store.js.map