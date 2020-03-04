"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./Tab.scss");
var Tab_pug_1 = __importDefault(require("./Tab.pug"));
var mixin_1 = __importDefault(require("../../mixin"));
exports.default = {
    name: 'PageCompTab',
    template: Tab_pug_1.default(),
    mixins: [mixin_1.default],
    data: function () {
        return {
            testName: 'test'
        };
    }
};
//# sourceMappingURL=Tab.js.map