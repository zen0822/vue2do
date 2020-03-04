"use strict";
/**
 * input api
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tip_1 = __importDefault(require("../Message/tip"));
exports.default = {
    methods: {
        /**
         * 验证数据格式
         *
         * @param {Boolean} - 是否是第一次验证
         * @return {Object} - this - 组件
         */
        verify: function (firstVerify) {
            var _this = this;
            var verified = true;
            var verifiedHint = '';
            var returnFun = function () {
                if (!verified) {
                    _this.$el.offsetParent.scrollTop = _this.$el.offsetTop;
                }
                _this.verified = verified;
                _this.verifiedHint = verifiedHint;
                return verified;
            };
            if (!this.number) {
                this.stateValue = this.stateValue.trim();
            }
            if (!this.stateValue && this.stateValue !== 0) {
                var verifyEmpty = this._verifyEmpty();
                verified = verifyEmpty.verified;
                verifiedHint = verifyEmpty.verifiedHint;
                return returnFun();
            }
            else {
                if (this.number && isNaN(this.stateValue)) {
                    verifiedHint = this.errorMsg + "\u8BF7\u8F93\u5165\u6570\u5B57\u7C7B\u578B";
                    verified = false;
                    return returnFun();
                }
                if (this.min) {
                    if (this.number) {
                        verified = this.min <= this.stateValue;
                        verifiedHint = verified ? '' : this.name + "\u4E0D\u80FD\u5C0F\u4E8E" + this.min + "!";
                    }
                    else {
                        verified = this.min <= this.stateValue.toString().length;
                        verifiedHint = verified ? '' : this.name + "\u957F\u5EA6\u4E0D\u80FD\u5C0F\u4E8E" + this.min + "\u4E2A\u5B57\u7B26!";
                    }
                    if (!verified) {
                        return returnFun();
                    }
                }
                if (this.max) {
                    verified = this.max >= this.stateValue.toString().length;
                    verifiedHint = verified ? '' : this.name + "\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E" + this.max + "\u4E2A\u5B57\u7B26!";
                    if (!verified) {
                        return returnFun();
                    }
                }
                if (this.minNum && this.number) {
                    var value = Number(this.stateValue);
                    verified = this.minNum <= value;
                    verifiedHint = verified ? '' : this.name + "\u4E0D\u80FD\u5C0F\u4E8E" + this.minNum + "!";
                    if (!verified) {
                        return returnFun();
                    }
                }
                if (this.maxNum && this.number) {
                    var value = Number(this.stateValue);
                    verified = this.maxNum >= value;
                    verifiedHint = verified ? '' : this.name + "\u4E0D\u80FD\u5927\u4E8E" + this.maxNum + "!";
                    if (!verified) {
                        return returnFun();
                    }
                }
                if ((this.regex || this.verifiedType) && !this.regexObj.test(this.stateValue)) {
                    verified = false;
                    if (firstVerify) {
                        verifiedHint = '';
                    }
                    else {
                        verifiedHint = this.formatText ? this.formatText : this._formatMessage;
                    }
                    return returnFun();
                }
            }
            return returnFun();
        },
        /**
         * 验证数据格式并且弹出错误
         *
         * @return {Object} - this - 组件
         */
        validate: function () {
            this.verify();
            if (!this.verified) {
                tip_1.default(this.verifiedHint);
                return false;
            }
            return this;
        },
        /**
         * 获取当前值
         *
         * @return {String, Number} - 输入框的值
         */
        val: function () {
            return this.stateValue;
        }
    }
};
//# sourceMappingURL=Input.api.js.map