"use strict";
/**
 * icon 组件
 *
 * @prop theme - 主题
 * @prop fontSize - 自定义字体图标大小
 * @prop size - 大小(xs, s, m, l, xl), 默认 s
 * @prop color - 颜色 16 进制
 * @prop type - 字符图标类型 (字符图标的 class 名的前缀，用户自己引入的字符图标的前缀)
 * @prop kind - 图标的种类（ex：fa-circle -> kind='circle'，ali-fold -> kind='fold')
 *
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../../asset/icon/iconfont.svg.js"); // iconfont 的 svg 图标文件
require("./Icon.scss");
var Icon_render_js_1 = __importDefault(require("./Icon.render.js"));
var base_1 = __importDefault(require("../../mixin/base"));
var TYPE_ALI = 'ali';
exports.default = {
    name: 'Icon',
    render: Icon_render_js_1.default,
    mixins: [base_1.default],
    props: {
        color: {
            type: String,
            default: ''
        },
        fontSize: {
            type: Number
        },
        size: {
            type: String,
            default: 's',
            validator: function (val) {
                return ['xs', 's', 'm', 'l', 'xl'].includes(val.toLowerCase());
            }
        },
        type: {
            type: String,
            default: TYPE_ALI
        },
        kind: {
            type: String,
            require: true
        }
    },
    computed: {
        cPrefix: function () {
            return this.compPrefix + "-icon";
        },
        sizeClass: function () {
            return this.compPrefix + "-icon-size-" + this.size.toLowerCase();
        },
        isAli: function () {
            return this.type === 'ali';
        },
        typeClass: function () {
            return this.isAli ? this.compPrefix + "-icon-" + this.type : this.type;
        },
        nameClass: function () {
            return this.isAli ? "ali-icon-" + this.kind : "fa-" + this.kind;
        }
    }
};
//# sourceMappingURL=Icon.js.map