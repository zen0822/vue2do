"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var position_1 = require("./position");
exports.offset = position_1.offset;
exports.position = position_1.position;
/**
 * 让元素展示处于显示状态，来获得实际的元素特性
 *
 * @param {Object} opt - 选项
 *                     @param {Element} element
 *                     @param {Function} cb
 */
var handleEleDisplay = function (_a) {
    var _b = _a === void 0 ? {} : _a, element = _b.element, cb = _b.cb;
    if (!element || element.nodeType !== 1) {
        return false;
    }
    var elDisplay = getComputedStyle(element).display;
    var cssDisplay = element.style.display;
    function handleElDisplay(show) {
        if (show === void 0) { show = true; }
        if (elDisplay === 'none' && cssDisplay === 'none') {
            Object.assign(element.style, {
                visibility: show ? 'hidden' : '',
                display: show ? '' : 'none'
            });
        }
        else if (elDisplay === 'none' && cssDisplay !== 'none') {
            Object.assign(element.style, {
                visibility: show ? 'hidden' : '',
                display: ''
            });
        }
        return element;
    }
    handleElDisplay();
    cb && cb(element);
    handleElDisplay(false);
    return element;
};
exports.handleEleDisplay = handleEleDisplay;
/**
 * 获取元素高度宽度等相关特性（无论是否是隐藏状态）
 *
 * @param {Element} element - dom 节点
 */
var prop = function (element) {
    if (element && element.nodeType !== 1) {
        return false;
    }
    var eleProp = {};
    handleEleDisplay({
        element: element,
        cb: function (element) {
            Object.assign(eleProp, {
                clientWidth: element.clientWidth,
                clientHeight: element.clientHeight,
                offsetWidth: element.offsetWidth,
                offsetHeight: element.offsetHeight,
                offsetParent: element.offsetParent,
                offsetTop: element.offsetTop,
                offsetLeft: element.offsetLeft,
                scrollWidth: element.scrollWidth,
                scrollHeight: element.scrollHeight,
                borderWidth: element.clientTop
            });
        }
    });
    return eleProp;
};
exports.prop = prop;
/**
 *
 * @param {*} el - dom 节点
 */
var childrenHeight = function (el) {
    var children = el.children;
    var totalHeight = 0;
    for (var i = 0, len = children.length; i < len; i++) {
        totalHeight += children[i].offsetHeight;
    }
    return totalHeight;
};
exports.childrenHeight = childrenHeight;
//# sourceMappingURL=prop.js.map