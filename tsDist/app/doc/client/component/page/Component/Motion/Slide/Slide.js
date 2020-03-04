"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Slide_pug_1 = __importDefault(require("./Slide.pug"));
var mixin_1 = __importDefault(require("../../mixin"));
exports.default = {
    name: 'PageCompMotionSlide',
    template: Slide_pug_1.default(),
    mixins: [mixin_1.default],
    data: function () {
        return {
            testName: 'test'
        };
    },
    methods: {
        slideIn: function () {
            this.$refs.slide.enter();
        },
        slideOut: function () {
            this.$refs.slide.leave();
        }
    }
};
//# sourceMappingURL=Slide.js.map