"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Fade_pug_1 = __importDefault(require("./Fade.pug"));
var mixin_1 = __importDefault(require("../../mixin"));
exports.default = {
    name: 'PageCompMotionFade',
    template: Fade_pug_1.default(),
    mixins: [mixin_1.default],
    data: function () {
        return {
            testName: 'test'
        };
    },
    methods: {
        fadeIn: function () {
            this.$refs.fade.enter();
        },
        fadeOut: function () {
            this.$refs.fade.leave();
        }
    }
};
//# sourceMappingURL=Fade.js.map