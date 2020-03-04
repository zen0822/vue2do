"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var type_json_1 = __importDefault(require("../../vuex/module/common/type.json"));
var store_1 = require("../../vuex/store");
var vue_1 = __importDefault(require("vue"));
var composition_api_1 = __importDefault(require("@vue/composition-api"));
vue_1.default.use(composition_api_1.default);
var typeUI = store_1.useState(type_json_1.default.typeUI.get);
exports.typeUI = typeUI;
var typeTheme = store_1.useState(type_json_1.default.typeTheme.get);
exports.typeTheme = typeTheme;
//# sourceMappingURL=mixin.js.map