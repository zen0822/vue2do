"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./App.scss");
var App_pug_1 = __importDefault(require("./App.pug"));
var store_1 = __importDefault(require("../vuex/store"));
var composition_api_1 = require("@vue/composition-api");
require('file-loader?name=favicon.ico!../asset/img/favicon.ico');
exports.default = composition_api_1.defineComponent({
    name: 'App',
    store: store_1.default,
    template: App_pug_1.default(),
    setup: function () {
        var contentHeight = composition_api_1.ref(0);
        return {
            contentHeight: contentHeight
        };
    }
});
//# sourceMappingURL=App.js.map