"use strict";
/**
 * row 组件
 *
 * @prop align - 定义了列在行上垂直方向上的对齐方式，对应 flex 的 align-items 属性
 *    可选值[start, end, center]
 * @prop gap - 每列的间隔是多少（px）-- 草案
 * @prop justify - 定义了列在行上的水平空间的对齐方式，对应 flex 的 justify-content 属性
 *    可选值[start, end, center, justify]
 * @prop wrap - 定义列的换行模式，对应 flex 的 flex-wrap 属性（nowrap | wrap）
 * @prop type - 布局类型
 *
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import './Row.scss'
var Row_render_js_1 = __importDefault(require("./Row.render.js"));
var base_1 = __importDefault(require("../../mixin/base"));
exports.default = {
    name: 'Row',
    mixins: [base_1.default],
    render: Row_render_js_1.default,
    props: {
        align: {
            type: String,
            default: 'center'
        },
        gap: {
            type: Number,
            default: 0
        },
        justify: {
            type: String,
            default: 'justify'
        },
        wrap: {
            type: String,
            default: 'wrap'
        },
        type: {
            type: String,
            default: 'flow'
        }
    },
    computed: {
        // 组件类名的前缀
        cPrefix: function () {
            return this.compPrefix + "-row";
        },
        compClass: function () {
            var compClass = this.xclass([
                "align-" + this.align,
                "justify-" + this.justify,
                this.wrap
            ]);
            return [compClass, this.cPrefix];
        }
    }
};
//# sourceMappingURL=Row.js.map