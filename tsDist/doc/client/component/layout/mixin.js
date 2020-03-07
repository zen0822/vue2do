"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var store_1 = __importDefault(require("../../vuex/store"));
var type_json_1 = __importDefault(require("../../vuex/module/common/type.json"));
exports.default = {
    store: store_1.default,
    computed: {
        typeUI: function () {
            return this.$store.getters[type_json_1.default.typeUI.get];
        },
        typeTheme: function () {
            return this.$store.getters[type_json_1.default.typeTheme.get];
        }
    }
};
//# sourceMappingURL=mixin.js.map