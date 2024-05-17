"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./Check.scss");
var Check_pug_1 = __importDefault(require("./Check.pug"));
var mixin_1 = __importDefault(require("../../mixin"));
exports.default = {
    name: 'PageCompCheck',
    template: Check_pug_1.default(),
    mixins: [mixin_1.default],
    computed: {
        testOpt: function () {
            return [{
                    value: 1,
                    text: 'a'
                }, {
                    value: 2,
                    text: 'b',
                    disabled: true
                }, {
                    value: 3,
                    text: 'c'
                }, {
                    value: 4,
                    text: 'd',
                    disabled: true
                }, {
                    value: 5,
                    text: 'e',
                    disabled: true
                }, {
                    value: 6,
                    text: 'g'
                }];
        },
        testOpt2: function () {
            return [{
                    value: 1,
                    text: 'a'
                }, {
                    value: 2,
                    text: 'b'
                }, {
                    value: 3,
                    text: 'c'
                }, {
                    value: 4,
                    text: 'd'
                }, {
                    value: 5,
                    text: 'e'
                }, {
                    value: 6,
                    text: 'g'
                }];
        }
    },
    data: function () {
        return {
            testName: 'test'
        };
    }
};
//# sourceMappingURL=Check.js.map