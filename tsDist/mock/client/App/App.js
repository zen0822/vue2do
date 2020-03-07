"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./App.scss");
var App_pug_1 = __importDefault(require("./App.pug"));
var store_1 = __importDefault(require("../vuex/store"));
require('file-loader?name=favicon.ico!../asset/img/favicon.ico');
exports.default = {
    name: 'App',
    store: store_1.default,
    data: function () {
        return {
            contentHeight: 0
        };
    },
    template: App_pug_1.default()
};
//# sourceMappingURL=App.js.map