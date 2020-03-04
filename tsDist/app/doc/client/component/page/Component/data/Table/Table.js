"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./Table.scss");
var Table_pug_1 = __importDefault(require("./Table.pug"));
var mixin_1 = __importDefault(require("../../mixin"));
exports.default = {
    name: 'PageCompTable',
    template: Table_pug_1.default(),
    mixins: [mixin_1.default],
    data: function () {
        return {
            testName: 'test'
        };
    }
};
//# sourceMappingURL=Table.js.map