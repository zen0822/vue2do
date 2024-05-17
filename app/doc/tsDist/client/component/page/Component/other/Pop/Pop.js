"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./Pop.scss");
var Pop_pug_1 = __importDefault(require("./Pop.pug"));
var mixin_1 = __importDefault(require("../../mixin"));
exports.default = {
    name: 'PageCompPop',
    template: Pop_pug_1.default(),
    mixins: [mixin_1.default],
    data: function () {
        return {
            testName: 'test'
        };
    },
    methods: {
        showPop: function () {
            this.testName = 'dddasfdddd sadfa sdfsa sdfsaf asdfasdf dfasdf sadfa';
            this.$refs.pop.show();
        },
        hidePop: function () {
            this.$refs.pop.hide();
        }
    }
};
//# sourceMappingURL=Pop.js.map