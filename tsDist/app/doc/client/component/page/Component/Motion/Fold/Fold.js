"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Fold_pug_1 = __importDefault(require("./Fold.pug"));
var mixin_1 = __importDefault(require("../../mixin"));
exports.default = {
    name: 'PageCompMotionFold',
    template: Fold_pug_1.default(),
    mixins: [mixin_1.default],
    data: function () {
        return {
            testName: 'test'
        };
    },
    methods: {
        unfold: function () {
            this.$refs.fold.enter();
        },
        fold: function () {
            this.$refs.fold.leave();
        }
    }
};
//# sourceMappingURL=Fold.js.map