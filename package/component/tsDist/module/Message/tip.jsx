"use strict";
/**
 * tip 组件
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
var vue_1 = __importDefault(require("vue"));
var Message_1 = __importDefault(require("./Message"));
var store_1 = __importDefault(require("../../vuex/store"));
var type_json_1 = __importDefault(require("../../vuex/module/common/type.json"));
var base_1 = __importDefault(require("../../mixin/base"));
var tiping = false;
var tipHub = [];
/**
 * 创建 tip 组件的实例
 **/
var createTip = function () {
    var tipCompVm = new vue_1.default({
        name: 'tip',
        mixins: [base_1.default],
        computed: {
            cPrefix: function () {
                return this.compPrefix + "-tip";
            }
        },
        components: {
            message: Message_1.default
        },
        store: store_1.default,
        render: function () {
            return (<div class={[this.cPrefix]}>
          <Message_1.default align='center' ref='tip'/>
        </div>);
        },
        mounted: function () {
            this.$store.dispatch(type_json_1.default.tip.add, this);
        }
    }).$mount();
    document.body.appendChild(tipCompVm.$el);
};
var commonVuex = new vue_1.default({
    store: store_1.default
});
/**
 * 调用 tip
 *
 * @param {string, object} option -
 *                                 message - 信息
 *                                 align - 信息的两边对齐方式 （left, center, right)
 **/
var tip = function (opt) {
    if (opt === void 0) { opt = ''; }
    if (tiping) {
        tipHub.push(opt);
        return false;
    }
    tiping = true;
    var option = {};
    if (typeof opt === 'string') {
        option = {
            message: opt.toString()
        };
    }
    else {
        option = __assign(__assign({}, option), opt);
    }
    return commonVuex
        .$store
        .getters[type_json_1.default.tip.get]
        .$refs
        .tip
        .set({
        message: option.message,
        type: option.type,
        align: option.align,
        hideCb: function () {
            tiping = false;
            option.cb && option.cb();
            if (tipHub.length > 0) {
                return tip(tipHub.shift());
            }
        }
    })
        .show();
};
createTip();
exports.default = tip;
//# sourceMappingURL=tip.jsx.map