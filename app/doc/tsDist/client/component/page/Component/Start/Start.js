"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./Start.scss");
var Start_pug_1 = __importDefault(require("./Start.pug"));
var mixin_1 = __importDefault(require("../mixin"));
exports.default = {
    name: 'PageCompStart',
    template: Start_pug_1.default(),
    mixins: [mixin_1.default],
    data: function () {
        return {
            testName: 'testd'
        };
    }
};
//# sourceMappingURL=Start.js.map