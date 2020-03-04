"use strict";
/**
 * fade motion component
 *
 * @prop speed - 淡出速度
 * @prop opacity - 使用 css 定义的 opacity 淡入淡出
 * @prop display - 默认一开始是隐藏（进来之前的状态）
 * @prop speed - 动画速度
 * @prop sync - 当处于进来动画，再次调用进来动画是否执行，同离开动画
 * @prop once - 当处于进来的状态时不可以再触发进来的动画，同离开动画
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
    name: 'MotionFade',
    mixins: [motion_1.default],
    props: {
        opacity: {
            tyep: Boolean,
            default: false
        }
    },
    computed: {
        transition: function () {
            return "opacity " + this.transitionTime + " ease-out";
        }
    },
    methods: {
        beforeEnter: function (_a) {
            var _this = this;
            var code = (_a === void 0 ? {} : _a).code;
            this.$emit('beforeEnter');
            var el = this.$el;
            Object.assign(el.style, {
                transition: this.transition,
                opacity: 0
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
            this.$emit('entering');
            return new Promise(function (resolve, reject) {
                try {
                    setTimeout(function () {
                        Object.assign(el.style, {
                            opacity: _this.opacity ? '' : 1
                        });
                        setTimeout(function () {
                            return resolve();
                        }, _this.time);
                    }, 10);
                }
                catch (error) {
                    reject(error);
                }
            });
        },
        afterEnter: function () {
            var el = this.$el;
            Object.assign(el.style, {
                transition: '',
                opacity: ''
            });
            this.$emit('afterEnter');
        },
        beforeLeave: function () {
            var el = this.$el;
            this.$emit('beforeLeave');
            Object.assign(el.style, {
                transition: this.transition
            });
            if (!this.opacity) {
                el.style.opacity = 1;
            }
            return this.leaveing();
        },
        leaveing: function (_a) {
            var _this = this;
            var code = (_a === void 0 ? {} : _a).code;
            var el = this.$el;
            this.$emit('leaving');
            Object.assign(el.style, {
                opacity: 0
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
                transition: '',
                opacity: ''
            });
            return this.$emit('afterLeave');
        }
    },
    render: function (h) {
        return h('transition', this.$slots.default);
    },
    mounted: function () {
        if (!this.display) {
            this.$el.style.display = 'none';
        }
    }
};
//# sourceMappingURL=MotionFade.js.map