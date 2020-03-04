"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 判断是否有滚动条
 *
 * @param {DOMElement} el - dom 元素
 * @param {string} type - 默认是垂直方向的滚动条（可选 x: 水平方向，y：垂直方向）
 */
var hasScroller = function (el, type) {
    if (el === void 0) { el = document.body; }
    if (type === void 0) { type = 'y'; }
    var style = window.getComputedStyle(el);
    if (style.getPropertyValue('overflow') === 'hidden') {
        return false;
    }
    if (type === 'y') {
        if (style.getPropertyValue('overflow-y') === 'hidden') {
            return false;
        }
        return el.scrollHeight > window.innerHeight;
    }
    else {
        if (style.getPropertyValue('overflow-x') === 'hidden') {
            return false;
        }
        return el.scrollWidth > window.innerWidth;
    }
};
exports.hasScroller = hasScroller;
/**
 * 查找指定的祖先元素
 *
 * @param {Object} parent - 组件的爸爸
 * @param {String} grandpaName
 */
var findGrandpa = function (parent, grandpaName) {
    function checkGrandpa(parent) {
        if (parent === void 0) { parent = {}; }
        if (parent.compName === grandpaName) {
            return parent;
        }
        else if (parent.constructor.name === 'VueComponent') {
            return checkGrandpa(parent.$parent);
        }
        else {
            return false;
        }
    }
    return checkGrandpa(parent);
};
exports.findGrandpa = findGrandpa;
//# sourceMappingURL=index.js.map