"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./Btn.scss");
var Btn_pug_1 = __importDefault(require("./Btn.pug"));
var mixin_1 = __importDefault(require("../../mixin"));
exports.default = {
    name: 'PageCompBtn',
    template: Btn_pug_1.default(),
    mixins: [mixin_1.default],
    data: function () {
        return {
            testName: 'test',
            btnRadius: 'S',
            btnType: 'button',
            btnSize: 'S'
        };
    },
    mounted: function () {
        var _this = this;
        this.$refs.btnRadius.$on('change', function (_a) {
            var value = _a.value;
            return (_this.btnRadius = value);
        });
        this.$refs.btnSize.$on('change', function (_a) {
            var value = _a.value;
            return (_this.btnSize = value);
        });
        this.$refs.btnType.$on('change', function (_a) {
            var value = _a.value;
            return (_this.btnType = value);
        });
    }
};
//# sourceMappingURL=Btn.js.map