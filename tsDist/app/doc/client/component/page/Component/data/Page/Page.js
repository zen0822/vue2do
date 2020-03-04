"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./Page.scss");
var Page_tpl_1 = __importDefault(require("./Page.tpl"));
var mixin_1 = __importDefault(require("../../mixin"));
exports.default = {
    name: 'PageCompPage',
    template: Page_tpl_1.default,
    mixins: [mixin_1.default],
    data: function () {
        return {
            pageData: {
                length: 24,
                size: 5
            }
        };
    }
};
//# sourceMappingURL=Page.js.map