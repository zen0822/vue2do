"use strict";
/**
 * base 混入
 *
 * @prop id - 用户定义的唯一标识符
 * @prop name - 用户定义的实例名字
 * @prop theme - 主题 (primary | success | warning | danger | orange | blue | light | dark)
 * @prop ui - ui 规范 (material | bootstrap | metro |apple)
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_json_1 = __importDefault(require("../config/index.json"));
var store_1 = __importDefault(require("../vuex/store"));
var type_json_1 = __importDefault(require("../vuex/module/common/type.json"));
var composition_api_1 = require("@vue/composition-api");
var prop_1 = require("../util/dom/prop");
var attr_1 = require("../util/dom/attr");
var util_1 = require("../util");
var props = {
    id: [String, Number],
    name: {
        type: String,
        default: ''
    },
    theme: {
        type: String,
        default: index_json_1.default.defaultTheme,
        validator: function (val) {
            return [
                'primary', 'grey', 'warning', 'success',
                'danger', 'blue', 'orange', 'light', 'dark', 'white', 'black'
            ].includes(val);
        }
    },
    ui: {
        type: String,
        default: index_json_1.default.defaultUI,
        validator: function (val) {
            return ['material', 'bootstrap', 'metro', 'apple', 'pure'].includes(val);
        }
    }
};
exports.props = props;
// computed
var uiClass = function (ui) { return (composition_api_1.computed(function () { return ui.value ? "ui-" + ui.value : ''; })); };
exports.uiClass = uiClass;
var themeClass = function (theme) { return (composition_api_1.computed(function () { return "theme-" + theme.value; })); };
exports.themeClass = themeClass;
var compClass = function (uiClass, themeClass) { return (composition_api_1.computed(function () { return [uiClass.value, themeClass.value]; })); };
exports.compClass = compClass;
var compPrefix = index_json_1.default.prefix;
exports.compPrefix = compPrefix;
var deviceSize = function (store) { return store.getters[type_json_1.default.deviceSize]; };
exports.deviceSize = deviceSize;
var css4 = window.CSS && window.CSS.supports && window.CSS.supports('--a', 0);
exports.css4 = css4;
// methods
var xclass = function (cPrefix, className) {
    if (Array.isArray(className)) {
        var classArr = className.map(function (item) {
            return cPrefix + "-" + item;
        });
        return classArr.join(' ');
    }
    else if (className === '' || className === undefined) {
        return cPrefix;
    }
    else {
        return cPrefix + "-" + className;
    }
};
exports.xclass = xclass;
exports.default = {
    store: store_1.default,
    props: {
        id: [String, Number],
        name: {
            type: String,
            default: ''
        },
        theme: {
            type: String,
            default: index_json_1.default.defaultTheme,
            validator: function (val) {
                return [
                    'primary', 'grey', 'warning', 'success',
                    'danger', 'blue', 'orange', 'light', 'dark', 'white', 'black'
                ].includes(val);
            }
        },
        ui: {
            type: String,
            default: index_json_1.default.defaultUI,
            validator: function (val) {
                return ['material', 'bootstrap', 'metro', 'apple', 'pure'].includes(val);
            }
        }
    },
    directives: {
        'xclass': function (el, binding) {
            attr_1.addClass(el, binding.value);
        }
    },
    computed: {
        compClass: function () {
            return [this.uiClass, this.themeClass];
        },
        compPrefix: function () {
            return index_json_1.default.prefix;
        },
        deviceSize: function () {
            return this.$store.getters[type_json_1.default.deviceSize];
        },
        deviceRange: function () {
            return this._deviceTypeRange();
        },
        uiClass: function () {
            return this.ui ? "ui-" + this.ui : '';
        },
        themeClass: function () {
            return "theme-" + this.theme;
        },
        UIMaterial: function () {
            return this.ui === 'material';
        },
        UIBootstrap: function () {
            return this.ui === 'bootstrap';
        },
        UIPure: function () {
            return this.ui === 'pure';
        }
    },
    methods: {
        /**
         * 安装完组件后初始化实例
         */
        _initComp: function () {
            // TODO
        },
        /**
         * 绑定相关事件
         */
        _binder: function () {
            // TODO
        },
        /**
         * 设置 data 选项的默认值
         */
        _setDataOpt: function () {
            // TODO
        },
        // 设备尺寸范围
        _deviceTypeRange: function (type) {
            if (type === void 0) { type = this.deviceSize; }
            switch (type) {
                case 'xs':
                    return 575;
                case 's':
                    return 765;
                case 'm':
                    return 991;
                case 'l':
                    return 1911;
                default:
                    return Number.MAX_VALUE;
            }
        },
        /**
         * 获取元素相关的属性（无论是否是隐藏状态）
         *
         * @param {Element} element - dom 节点
         */
        elementProp: function (element) {
            if (element === void 0) { element = this.$el; }
            return prop_1.prop(element);
        },
        /**
         * 为组件里面的类名增加前缀
         **/
        prefix: function (className) {
            if (Array.isArray(className)) {
                for (var i = 0, len = className.length; i < len; i++) {
                    className[i] = this.compPrefix + "-" + className[i];
                }
                return className.join(' ');
            }
            else {
                return this.compPrefix + "-" + className;
            }
        },
        /**
         * 为组件里面的类名增加组件前缀
         **/
        xclass: function (className) {
            var _this = this;
            if (Array.isArray(className)) {
                var classArr = className.map(function (item) {
                    return _this.cPrefix + "-" + item;
                });
                return classArr.join(' ');
            }
            else {
                return this.cPrefix + "-" + className;
            }
        },
        /**
         * 初始化 slot 的 option
         *
         * @param { String } compName - 组件名字
         * @return { Array } option - 返回在 slot 取得的 option
         */
        _initOptionSlot: function (opt) {
            if (opt === void 0) { opt = {}; }
            var $defaultSlotContent = this.$slots.default;
            // slot default 没数据就退出
            if (!Array.isArray($defaultSlotContent) || $defaultSlotContent.length === 0) {
                return false;
            }
            var option = [];
            $defaultSlotContent.forEach(function (item) {
                if (!item.elm) {
                    return false;
                }
                if (item.elm.className === opt.compClass) {
                    var el = item.elm;
                    var elAttr_1 = el.attributes;
                    var attrKeys = Object.keys(elAttr_1);
                    var attrs_1 = {};
                    attrKeys.forEach(function (item) {
                        var _a;
                        var attr = elAttr_1[item];
                        Object.assign(attrs_1, (_a = {},
                            _a[attr.name] = attr.value,
                            _a));
                    });
                    option.push(Object.assign(attrs_1, {
                        text: el.innerText
                    }));
                }
            });
            $(opt.slotRef).remove();
            return option;
        }
    },
    created: function () {
        this.$slotKey = Object.keys(this.$slots);
        this._setDataOpt();
    },
    mounted: function () {
        var _this = this;
        this.$nextTick(function () {
            _this._binder();
            _this._initComp();
        });
        var deviceSizeClass = index_json_1.default.prefix + "-css-device-size";
        if (document.getElementsByClassName(deviceSizeClass).length === 0) {
            if (!document.querySelector('.' + deviceSizeClass)) {
                // 添加存储设备尺寸的 dom 到页面上
                var deviceSizeEle_1 = document.createElement('div');
                deviceSizeEle_1.className = deviceSizeClass;
                document.body.appendChild(deviceSizeEle_1);
                var updateDeviceSize = function () {
                    var content = window.getComputedStyle(deviceSizeEle_1, ':after').getPropertyValue('content');
                    _this.$store.dispatch(type_json_1.default.deviceSize, content);
                };
                window.addEventListener('resize', util_1.debounce(updateDeviceSize, 100));
                updateDeviceSize();
            }
        }
    }
};
//# sourceMappingURL=base.js.map