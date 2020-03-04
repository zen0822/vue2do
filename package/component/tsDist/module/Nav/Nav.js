"use strict";
/**
 * nav 组件
 *
 * @prop animate - 菜单显示动画()
 * @prop noSwitch - 菜单不要根据设备响应式切换
 * @prop initOpt - 菜单的数据
 * @prop kind - 菜单的种类
 * @prop only - 手风琴模式，一次只能打开一个面板
 * @prop trigger - 2，3 级菜单的触发模式
 * @prop type - 布局类型
 * @prop spreadAll - 打开全部一级菜单
 * @prop title - 菜单标题
 *
 * @event hide - 隐藏 nav - 点击导航链接
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../../scss/common/main.scss");
require("./Nav.scss");
require("./Nav.m.scss");
var Nav_render_js_1 = __importDefault(require("./Nav.render.js"));
var base_1 = __importDefault(require("../../mixin/base"));
var Fold_1 = __importDefault(require("../Fold/Fold"));
var FoldTitle_1 = __importDefault(require("../Fold/FoldTitle"));
var FoldContent_1 = __importDefault(require("../Fold/FoldContent"));
var MotionFold_1 = __importDefault(require("../MotionFold/MotionFold"));
var MotionSlide_1 = __importDefault(require("../MotionSlide/MotionSlide"));
var Icon_1 = __importDefault(require("../Icon/Icon"));
var Row_1 = __importDefault(require("../Row/Row"));
var Col_1 = __importDefault(require("../Col/Col"));
exports.default = {
    name: 'Nav',
    mixins: [base_1.default],
    render: Nav_render_js_1.default,
    components: {
        fold: Fold_1.default,
        'fold-title': FoldTitle_1.default,
        'fold-content': FoldContent_1.default,
        'motion-fold': MotionFold_1.default,
        'motion-slide': MotionSlide_1.default,
        row: Row_1.default,
        column: Col_1.default,
        icon: Icon_1.default
    },
    props: {
        animate: String,
        noSwitch: {
            type: Boolean,
            default: false
        },
        initOpt: Array,
        gap: {
            type: Number,
            default: 0
        },
        kind: {
            type: String,
            default: 'center'
        },
        only: {
            type: Boolean,
            default: false
        },
        spreadAll: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: 'horizontal'
        },
        trigger: {
            type: String,
            default: 'no'
        },
        title: {
            type: String,
            default: ''
        }
    },
    data: function () {
        return {
            isActive: false,
            navAnimate: ''
        };
    },
    computed: {
        cPrefix: function () {
            return this.compPrefix + "-nav";
        },
        isSmallDevice: function () {
            return this.deviceSize === 's' || this.deviceSize === 'xs';
        },
        isVerticalType: function () {
            return this.type === 'vertical';
        },
        isFoldAnimate: function () {
            return this.navAnimate === 'fold';
        }
    },
    watch: {
        deviceSize: function (val) {
            if (!val) {
                return false;
            }
            this.changeByDeviceSize(val);
        }
    },
    methods: {
        _setDataOpt: function () {
            if (this.type === 'vertical') {
                this.navAnimate = this.animate ? this.animate : 'fold';
            }
            else if (this.type === 'horizontal') {
                this.navAnimate = this.animate ? this.animate : 'slide';
            }
        },
        show: function () {
            var transitionRef = this.$refs.motion;
            this.isActive = true;
            if (this.isFoldAnimate) {
                // TODO: 离开时 height 还是等于零如果这时候取值就会是不正确的
                // 所以要先置为空
                transitionRef.$el.style.height = '';
                var transitionHeight = this.elementProp(transitionRef.$el).offsetHeight;
                transitionRef.setHeight(transitionHeight);
            }
            transitionRef.enter();
            this.$emit('show');
        },
        hide: function () {
            this.$refs.motion.leave();
            this.isActive = false;
            this.$emit('hide');
        },
        toggle: function () {
            this.isActive = !this.isActive;
            if (this.isActive) {
                return this.show();
            }
            else {
                return this.hide();
            }
        },
        changeByDeviceSize: function () {
            if (this.noSwitch) {
                return false;
            }
            this.isSmallDevice ? this.hide() : this.show();
            this.$refs.fold.$on('ready', function () { });
        }
    },
    mounted: function () {
        this.changeByDeviceSize();
    }
};
//# sourceMappingURL=Nav.js.map