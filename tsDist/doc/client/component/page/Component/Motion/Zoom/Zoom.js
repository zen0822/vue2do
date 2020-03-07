"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Zoom_pug_1 = __importDefault(require("./Zoom.pug"));
var mixin_1 = __importDefault(require("../../mixin"));
exports.default = {
    name: 'PageCompMotionZoom',
    template: Zoom_pug_1.default(),
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
        }
    }
};
//# sourceMappingURL=Zoom.js.map