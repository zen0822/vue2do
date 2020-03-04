"use strict";
/**
 * fold(折叠) motion component
 *
 * @prop height - 被过渡的元素高度
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
 *
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var prop_1 = require("../../util/dom/prop");
var base_1 = __importDefault(require("../../mixin/base"));
var motion_1 = __importDefault(require("../../mixin/motion"));
exports.default = {
    name: 'MotionFold',
    mixins: [base_1.default, motion_1.default],
    props: {
        height: Number
    },
    data: function () {
        this.moving = false; // 是否正在执行过渡动画
        return {
            motionHeight: 0
        };
    },
    computed: {
        transition: function () {
            return "height " + this.transitionTime + " ease-out";
        }
    },
    watch: {
        height: function (val) {
            return this.setHeight(val);
        }
    },
    methods: {
        _setDataOpt: function () {
            this.motionHeight = this.height;
        },
        _initComp: function () {
            if (this.height === undefined) {
                this.motionHeight = prop_1.prop(this.$el).offsetHeight;
            }
        },
        /**
         * 设置高度
         *
         * @param { Number }
         */
        setHeight: function (height) {
            this.motionHeight = height;
        },
        beforeEnter: function (_a) {
            var _this = this;
            var code = (_a === void 0 ? {} : _a).code;
            this.$emit('beforeEnter');
            var el = this.$el;
            Object.assign(el.style, {
                height: 0,
                overflow: 'hidden',
                transition: this.transition
            });
            return new Promise(function (resolve, reject) {
                try {
                    setTimeout(function () {
                        code === _this.code && (el.style.display = '');
                        resolve();
                    }, 218);
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
            el.style.height = this.motionHeight + "px";
            this.$emit('entering');
            return new Promise(function (resolve, reject) {
                try {
                    setTimeout(function () {
                        resolve();
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
                height: '',
                overflow: '',
                transition: ''
            });
            this.$emit('afterEnter');
        },
        beforeLeave: function () {
            var el = this.$el;
            this.$emit('beforeLeave');
            Object.assign(el.style, {
                height: this.motionHeight + "px",
                overflow: 'hidden',
                transition: this.transition
            });
            return this.leaveing();
        },
        leaveing: function (_a) {
            var _this = this;
            var code = (_a === void 0 ? {} : _a).code;
            var el = this.$el;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            var height = el.offsetHeight;
            this.$emit('leaving');
            Object.assign(el.style, {
                height: 0
            });
            return new Promise(function (resolve, reject) {
                try {
                    setTimeout(function () {
                        code === _this.code && (el.style.display = 'none');
                        return resolve();
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
                height: '',
                overflow: ''
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
//# sourceMappingURL=MotionFold.js.map