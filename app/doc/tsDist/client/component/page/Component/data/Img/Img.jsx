"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./Img.scss");
var Img_pug_1 = __importDefault(require("./Img.pug"));
var composition_api_1 = require("@vue/composition-api");
var mixin_1 = require("../../mixin");
var exImg_jpg_1 = __importDefault(require("./static/exImg.jpg"));
exports.default = composition_api_1.defineComponent({
    name: 'PageCompImg',
    template: Img_pug_1.default(),
    setup: function () {
        composition_api_1.onMounted(function () {
            mixin_1.mounted();
        });
        return {
            anchorLink: mixin_1.anchorLink,
            exImg: exImg_jpg_1.default,
            goAnchor: mixin_1.goAnchor,
            testOpt: mixin_1.testOpt,
            typeTheme: mixin_1.typeTheme,
            typeUI: mixin_1.typeUI
        };
    }
});
//# sourceMappingURL=Img.jsx.map