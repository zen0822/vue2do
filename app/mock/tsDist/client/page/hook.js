"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var store_1 = require("../vuex/store");
var type_json_1 = __importDefault(require("../vuex/module/common/type.json"));
var composition_api_1 = require("@vue/composition-api");
var testOptTemp = [];
for (var i = 0, len = 33; i < len; i++) {
    testOptTemp.push({
        text: 'test-' + i,
        name: 'name-' + i,
        size: 'size-' + i,
        en: 'en-' + i,
        value: i
    });
}
var testOpt = composition_api_1.ref(testOptTemp);
exports.testOpt = testOpt;
var exData = store_1.useState(type_json_1.default.ex.add);
exports.exData = exData;
//# sourceMappingURL=hook.js.map