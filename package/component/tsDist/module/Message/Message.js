"use strict";
/**
 * message 提示组件
 *
 * @prop align - 信息的两边对齐方式 （left, center, right)
 * @prop message - 信息
 * @prop direction - 信息出现方向
 * @prop position - 信息展示的位置
 * @prop type - 信息(pop | bar | header)
 *
 * @slot - 弹窗的主体内容
 *
 * @event show - 显示之后的钩子函数
 * @event hide - 隐藏之后的钩子函数
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./Message.scss");
require("./Message.m.scss");
var Message_render_1 = __importDefault(require("./Message.render"));
var base_1 = __importDefault(require("../../mixin/base"));
var Pop_1 = __importDefault(require("../Pop/Pop"));
var prop_1 = require("../../util/dom/prop");
var TIP_DISPLAY_TIME = 1500;
var messageComp = {
    name: 'Message',
    render: Message_render_1.default,
    mixins: [base_1.default],
    watch: {
        'align': function (val) {
            this.stateAlign = val;
        }
    },
    components: {
        pop: Pop_1.default
    },
    computed: {
        cPrefix: function () {
            return this.compPrefix + "-message";
        },
        headerClass: function () {
            var _a;
            return _a = {},
                _a[this.cPrefix + "-no-header"] = !this.headerDisplay,
                _a[this.cPrefix + "-no-header-title"] = !this.popHeaderName,
                _a;
        },
        footerClass: function () {
            var _a;
            return _a = {},
                _a[this.cPrefix + "-no-footer"] = !this.footerDisplay,
                _a;
        }
    },
    props: {
        align: {
            type: String,
            default: 'left'
        },
        type: {
            type: String,
            default: 'pop'
        },
        direction: {
            type: String,
            default: 'south',
            validator: function (val) {
                return ['north', 'east', 'west', 'south'].includes(val);
            }
        },
        message: {
            type: String,
            default: ''
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
        return {
            stateAlign: 'left',
            stateMessage: '',
            messageType: '',
            messageDisplay: false,
            hideCb: null
        };
    },
    methods: {
        _initmessage: function () {
            var _this = this;
            prop_1.handleEleDisplay({
                element: this.$el,
                cb: function () {
                    _this.$refs.pop.computePosition();
                }
            });
        },
        /**
         * 设置数据
         */
        _setDataOpt: function () {
            this.stateMessage = this.message;
            this.stateAlign = this.align;
        },
        /**
         * 显示
         *
         * @param {Object} opt - 选项
         *                       {Function} cb - 显示之后的回调函数
         * @return {Promise}
         */
        show: function (_a) {
            var _this = this;
            var cb = (_a === void 0 ? {} : _a).cb;
            this.messageDisplay = true;
            return this.$nextTick(function () {
                _this.$refs.pop.show({
                    cb: function () {
                        setTimeout(function () {
                            _this.hide();
                        }, TIP_DISPLAY_TIME);
                        cb === null || cb === void 0 ? void 0 : cb();
                        return _this.$emit('hide');
                    }
                });
                return _this;
            });
        },
        /**
         * 隐藏pop
         *
         * @param {Object} opt - 选项
         *                       {Function} cb - 隐藏之后的回调函数
         * @return {Object}
         */
        hide: function (_a) {
            var _this = this;
            var cb = (_a === void 0 ? {} : _a).cb;
            return this.$refs.pop.hide({
                cb: function () {
                    _this.messageDisplay = false;
                    _this.isMousedown = false;
                    _this.hideCb && _this.hideCb();
                    cb === null || cb === void 0 ? void 0 : cb();
                    return _this.$emit('hide');
                }
            });
        },
        /**
         * alert, confirm 弹窗的文字信息
         *
         * @param {String} - 需要设置的值
         * @return {Object, String}
         */
        info: function (text) {
            if (text === '' || text) {
                this.stateMessage = text;
            }
            return this;
        },
        /**
         * 设置各个组件的配置数据
         *
         * @param {Object} opt - 选项
         *                       {Function} hideCb - 隐藏之后的回调函数
         *                       {String} type - 组件类型
         *                       {Function} message - 需要展示的信息
         */
        set: function (_a) {
            var _b = _a === void 0 ? {} : _a, hideCb = _b.hideCb, _c = _b.type, type = _c === void 0 ? 'pop' : _c, _d = _b.message, message = _d === void 0 ? '' : _d, align = _b.align;
            this.stateMessage = message;
            this.hideCb = hideCb;
            this.messageType = type;
            align && (this.stateAlign = align);
            return this;
        }
    }
};
exports.default = messageComp;
//# sourceMappingURL=Message.js.map