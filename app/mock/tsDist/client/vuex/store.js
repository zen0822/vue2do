"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 组装不同的 store 并暴露出来
var vue_1 = __importDefault(require("vue"));
var vuex_1 = __importDefault(require("vuex"));
var composition_api_1 = require("@vue/composition-api");
var common_1 = __importDefault(require("./module/common/common"));
vue_1.default.use(vuex_1.default);
var commonStore = new vuex_1.default.Store({
    modules: {
        common: common_1.default
    }
});
exports.common = commonStore;
function useStore() {
    return commonStore;
}
exports.useStore = useStore;
function useState(name) {
    return composition_api_1.computed(function () { return commonStore.getters[name]; });
}
exports.useState = useState;
exports.default = commonStore;
//# sourceMappingURL=store.js.map