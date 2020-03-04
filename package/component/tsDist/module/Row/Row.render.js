"use strict";
/**
 * row.render.js
 */
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(h) {
    var $slots = this.$slots.default;
    $slots = !Array.isArray($slots) ? null : $slots.filter(function (item) {
        return !item.text;
    });
    return h('div', {
        class: this.compClass
    }, $slots);
}
exports.default = default_1;
//# sourceMappingURL=Row.render.js.map