"use strict";
/**
 * slide motion component - 滑动过度效果
 *
 * @prop offset - 元素滑动的偏移值,
 *                direction 为 south：实例顶部距离实例的 offsetParent 的顶部的偏移值
 *                direction 为 north：实例低部距离实例的 offsetParent 的低部的偏移值
 *                direction 为 west：实例右边距离实例的 offsetParent 的右边的偏移值
 *                direction 为 east：实例左边距离实例的 offsetParent 的左边的偏移值
 * @prop direction - 滑动方向(north | east | west | south)
 * @prop global - 元素的位置是否是以可视界面的相对定位 (fixed)，默认为否（绝对定位 absolute）
 * @prop speed - 淡出速度
 * @prop display - 默认一开始是隐藏（进来之前的状态）
 * @prop sync - 当处于进来动画，再次调用进来动画是否执行，同离开动画
 * @prop once - 当处于进来的状态时不可以再触发进来的动画，同离开动画
 * @prop type - none: 没动画，opacity：淡进淡入，默认是 transform
 *
 * @event beforeEnter - 进来过渡之前
 * @event enter - 进来过渡期间
 * @event afterEnter - 进来过渡完成
 * @event beforeLeave - 离开过渡之前
 * @event leave - 离开过渡期间
 * @event afterLeave - 离开过渡之后
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var motion_1 = __importDefault(require("../../mixin/motion"));
exports.default = {
    name: 'MotionSlide',
    mixins: [motion_1.default],
    props: {
        direction: {
            type: String,
            default: 'south',
            validator: function (val) {
                return ['north', 'east', 'west', 'south'].includes(val);
            }
        },
        global: {
            type: Boolean,
            default: false
        },
        offset: {
            type: Number,
            default: 0
        },
        type: {
            type: String,
            default: 'transform',
            validator: function (val) {
                return ['transform', 'opacity', 'none'].includes(val);
            }
        }
    },
    data: function () {
        this.moving = false; // 是否正在执行过渡动画
        return {
            transiting: false,
            isEnter: false,
            isLeaving: false,
            slideOffset: {}
        };
    },
    computed: {
        translate: function () {
            return this._getTranslate();
        },
        transition: function () {
            if (this.type === 'none') {
                return '';
            }
            else if (this.type === 'transform') {
                return "transform " + this.transitionTime + " ease-out";
            }
            else {
                return "opacity " + this.transitionTime + " ease-out";
            }
        },
        positionType: function () {
            return this.global ? 'fixed' : 'absolute';
        }
    },
    methods: {
        /**
         *
         * @param {Object} opt -
         *                      {Number} top
         *                      {Number} left
         * @return {String} - 过渡的样式声明
         *
         */
        _getTranslate: function () {
            switch (this.direction) {
                case 'south':
                    return "translateY(-100%) translateY(-" + this.slideOffset + "px)";
                case 'north':
                    return "translateY(100%) translateY(" + this.slideOffset + "px)";
                case 'east':
                    return "translateX(-100%) translateY(-" + this.slideOffset + "px)";
                case 'west':
                    return "translateX(100%) translateY(" + this.slideOffset + "px)";
                default:
                    return "translateY(-100%) translateY(-" + this.slideOffset + "px)";
            }
        },
        /**
         * 设置 offset 属性
         */
        setOffset: function (value) {
            this.slideOffset = value;
            return this;
        },
        beforeEnter: function (_a) {
            var _this = this;
            var code = (_a === void 0 ? {} : _a).code;
            this.$emit('beforeEnter');
            var el = this.$el;
            Object.assign(el.style, {
                'position': this.positionType,
                'transition': this.transition,
                'transform': this._getTranslate()
            });
            return new Promise(function (resolve, reject) {
                try {
                    setTimeout(function () {
                        code === _this.code && (el.style.display = '');
                        resolve();
                    }, 78);
                }
                catch (error) {
                    reject(error);
                }
            });
        },
        entering: function () {
            var _this = this;
            var el = this.$el;
            // HACK: trigger browser reflow
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            var height = el.offsetHeight;
            this.$emit('entering');
            Object.assign(el.style, {
                'transform': ''
            });
            return new Promise(function (resolve, reject) {
                try {
                    setTimeout(function () {
                        return resolve();
                    }, _this.time);
                }
                catch (error) {
                    reject(error);
                }
            });
        },
        afterEnter: function () {
            var el = this.$el;
            Object.assign(el.style, {
                'position': '',
                'transition': ''
            });
            this.$emit('afterEnter');
        },
        beforeLeave: function () {
            var el = this.$el;
            this.$emit('beforeLeave');
            return Object.assign(el.style, {
                'position': this.positionType,
                'transition': this.transition,
                'transform': ''
            });
        },
        leaveing: function (_a) {
            var _this = this;
            var code = (_a === void 0 ? {} : _a).code;
            var el = this.$el;
            this.$emit('leaving');
            Object.assign(el.style, {
                'transform': this.translate
            });
            return new Promise(function (resolve, reject) {
                try {
                    setTimeout(function () {
                        code === _this.code && (el.style.display = 'none');
                        resolve();
                    }, _this.time);
                }
                catch (error) {
                    reject(error);
                }
            });
        },
        afterLeave: function () {
            var el = this.$el;
            Object.assign(el.style, {
                'position': '',
                'transition': '',
                'transform': ''
            });
            return this.$emit('afterLeave');
        }
    },
    render: function (h) {
        return h('transition', this.$slots.default);
    },
    created: function () {
        this.slideOffset = this.offset;
    },
    mounted: function () {
        if (!this.display) {
            this.$el.style.display = 'none';
        }
    }
};
//# sourceMappingURL=MotionSlide.js.map