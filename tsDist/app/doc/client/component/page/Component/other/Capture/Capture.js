"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./Capture.scss");
var Capture_pug_1 = __importDefault(require("./Capture.pug"));
var mixin_1 = __importDefault(require("../../mixin"));
exports.default = {
    name: 'PageCompCapture',
    template: Capture_pug_1.default(),
    mixins: [mixin_1.default],
    data: function () {
        return {
            testName: 'test',
            photoData: '',
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
        };
    },
    methods: {
        captureChange: function (_a) {
            var data = _a.data;
            this.photoData = data;
        },
        startCamera: function () {
            return this.$refs.capture.start();
        }
    }
};
//# sourceMappingURL=Capture.js.map