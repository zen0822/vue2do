"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./Motion.scss");
var Motion_pug_1 = __importDefault(require("./Motion.pug"));
var mixin_1 = __importDefault(require("../mixin"));
exports.default = {
    name: 'PageCompMotion',
    template: Motion_pug_1.default(),
    mixins: [mixin_1.default],
    data: function () {
        return {
            testName: 'test'
        };
    },
    methods: {
        zoomIn: function () {
            this.$refs.zoom.enter();
        },
        zoomOut: function () {
            this.$refs.zoom.leave();
        },
        slideIn: function () {
            this.$refs.slide.enter();
        },
        slideOut: function () {
            this.$refs.slide.leave();
        },
        fadeIn: function () {
            this.$refs.fade.enter();
        },
        fadeOut: function () {
            this.$refs.fade.leave();
        },
        unfold: function () {
            this.$refs.fold.enter();
        },
        fold: function () {
            this.$refs.fold.leave();
        },
        rip: function () {
            this.$refs.rip.enter();
        }
    }
};
//# sourceMappingURL=Motion.js.map