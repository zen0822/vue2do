"use strict";
/**
 * form 混入
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    methods: {
        /**
         * 表单控件的value值
         * @return {Number, Object}
         */
        val: function (newVal) {
            if (newVal || newVal === 0 || newVal === '') {
                this.value = newVal;
                return this;
            }
            return this.value;
        },
        /**
         * 表单控件的text值
         * @return {String, Array, Object}
         */
        txt: function (newTxt) {
            if (newTxt || newTxt === 0 || newTxt === '') {
                this.text = newTxt;
            }
            return this.text;
        }
    }
};
//# sourceMappingURL=form.js.map