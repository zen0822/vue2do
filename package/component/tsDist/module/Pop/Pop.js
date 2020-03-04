"use strict";
/**
 * pop 弹出层组件
 *
 * @prop direction - 只有当 position 为 center 生效，弹出方向（north | east | west | south）
 * @prop part - 在一个父类元素弹出，默认为否即在当前文档之外弹窗
 * @prop position - 弹出层最终的所在位置 (top | right | bottom | left | center)
 * @prop speed - 弹出速度(slow|normal|fast)
 * @prop type - 弹出类型(none | slide* | fade)
 *
 * @slot - 弹出层的主体内容
 *
 * @event show - 显示之后的钩子函数
 * @event showing - 正要开始显示的钩子函数
 * @event hide - 隐藏之后的钩子函数
 * @event hiding - 正要开始隐藏的钩子函数
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./Pop.scss");
require("./Pop.m.scss");
var Pop_render_1 = __importDefault(require("./Pop.render"));
var base_1 = __importDefault(require("../../mixin/base"));
var MotionSlide_1 = __importDefault(require("../MotionSlide/MotionSlide"));
var MotionFade_1 = __importDefault(require("../MotionFade/MotionFade"));
var dom_1 = require("../../util/dom");
var scrollBarWidth = 20;
var popComp = {
    name: 'Pop',
    render: Pop_render_1.default,
    mixins: [base_1.default],
    components: {
        'motion-slide': MotionSlide_1.default,
        'motion-fade': MotionFade_1.default
    },
    props: {
        type: {
            type: String,
            default: 'slide',
            validator: function (val) {
                return ['none', 'slide', 'fade'].includes(val);
            }
        },
        direction: {
            type: String,
            default: 'south',
            validator: function (val) {
                return ['north', 'east', 'west', 'south'].includes(val);
            }
        },
        speed: {
            type: String,
            default: 'normal',
            validator: function (val) {
                return ['slow', 'normal', 'fast'].includes(val);
            }
        },
        part: {
            type: Boolean,
            default: false
        },
        position: {
            type: String,
            default: 'center',
            validator: function (val) {
                return ['top', 'right', 'bottom', 'left', 'center'].includes(val);
            }
        }
    },
    data: function () {
        this.compName = 'pop';
        this.popDisplay = false; // 弹出层显示状态
        return {
            popDetail: {
                top: 0,
                left: 0
            },
            popDirection: 'south' // 弹出层的方向
        };
    },
    computed: {
        // 组件类名的前缀
        cPrefix: function () {
            return this.compPrefix + "-pop";
        },
        // 组件类组合
        compClass: function () {
            var _a;
            return [
                this.cPrefix,
                this.xclass("direction-" + this.popDirection),
                this.xclass("type-" + this.type),
                this.xclass("speed-" + this.speed),
                (_a = {},
                    _a[this.xclass('part')] = this.part,
                    _a)
            ];
        },
        // 弹出层的位置样式
        positionStyle: function () {
            return {
                top: this.popDetail.top + 'px',
                left: this.popDetail.left + 'px'
            };
        }
    },
    watch: {
        direction: function (val) {
            this.popDirection = val;
        }
    },
    methods: {
        _setDataOpt: function () {
            this.popDirection = this.direction;
            if (this.position !== 'center') {
                switch (this.position) {
                    case 'bottom':
                        this.popDirection = 'north';
                        break;
                    case 'top':
                        this.popDirection = 'south';
                        break;
                    case 'right':
                        this.popDirection = 'west';
                        break;
                    case 'left':
                        this.popDirection = 'east';
                        break;
                    default:
                        this.popDirection = 'south';
                        break;
                }
            }
        },
        _binder: function () {
            var _this = this;
            this.$refs.transition.$on('entering', function () {
                return _this.$emit('showing');
            });
            this.$refs.transition.$on('afterEnter', function () {
                _this.showCb && _this.showCb();
                _this.popDisplay = true;
                return _this.$emit('show');
            });
            this.$refs.transition.$on('leaving', function () {
                return _this.$emit('hiding');
            });
            this.$refs.transition.$on('afterLeave', function () {
                _this.hideCb && _this.hideCb();
                _this.popDisplay = false;
                return _this.$emit('hide');
            });
        },
        /**
         * 初始化弹出层
         */
        initPop: function () {
            var ele = this.elementProp(this.$el);
            var parentWidth = window.innerWidth;
            var parentHeight = window.innerHeight;
            var height = ele.offsetHeight;
            var width = ele.offsetWidth;
            var slideOffset = 0;
            var popStyle = {};
            if (this.position !== 'center') {
                switch (this.position) {
                    case 'bottom':
                        popStyle = {
                            top: dom_1.hasScroller(undefined, 'horizontal') ?
                                parentHeight - height - scrollBarWidth : parentHeight - height,
                            left: (parentWidth - width) / 2
                        };
                        break;
                    case 'top':
                        popStyle = {
                            top: 0,
                            left: (parentWidth - width) / 2
                        };
                        break;
                    case 'right':
                        popStyle = {
                            top: (parentHeight - height) / 2,
                            left: parentWidth - width
                        };
                        break;
                    case 'left':
                        popStyle = {
                            top: (parentHeight - height) / 2,
                            left: 0
                        };
                        break;
                    default:
                        popStyle = {
                            top: 0,
                            left: (parentWidth - width) / 2
                        };
                }
                slideOffset = 0;
            }
            else {
                var top_1 = (parentHeight - height) / 2;
                var left = (parentWidth - width) / 2;
                switch (this.popDirection) {
                    case 'north':
                    case 'south':
                        slideOffset = top_1;
                        break;
                    case 'west':
                    case 'east':
                        slideOffset = left;
                        break;
                    default:
                        slideOffset = top_1;
                }
                popStyle = {
                    top: top_1,
                    left: left
                };
            }
            this.popDetail = __assign(__assign({}, this.popDetail), popStyle);
            Object.assign(this.$el.style, popStyle);
            this.$refs.transition.setOffset(slideOffset);
        },
        /**
         * 计算弹出层的位置
         */
        computePosition: function () {
            return this.initPop();
        },
        /**
         * 显示pop
         *
         * @param {Object} opt - 选项
         *                       {Function} cb - 显示之后的回调函数
         * @return {Object}
         */
        show: function (_a) {
            var cb = (_a === void 0 ? {} : _a).cb;
            if (!this.part) {
                this.computePosition();
            }
            this.showCb = cb;
            this.$refs.transition.enter();
            return this;
        },
        /**
         * 隐藏pop
         *
         * @param {Object} opt - 选项
         *                       {Function} cb - 隐藏之后的回调函数
         * @return {Object}
         */
        hide: function (_a) {
            var cb = (_a === void 0 ? {} : _a).cb;
            this.hideCb = cb;
            this.$refs.transition.leave();
            return this;
        }
    },
    mounted: function () {
        this.computePosition();
    }
};
exports.default = popComp;
//# sourceMappingURL=Pop.js.map