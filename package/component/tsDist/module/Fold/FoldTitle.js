"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = __importDefault(require("../../mixin/base"));
exports.default = {
    name: 'FoldTitle',
    mixins: [base_1.default],
    computed: {
        // 组件类名的前缀
        cPrefix: function () {
            return this.compPrefix + "-fold-title";
        }
    },
    render: function (h) {
        return h('div', {
            class: [this.cPrefix]
        }, this.$slots.default);
    }
};
//# sourceMappingURL=FoldTitle.js.map