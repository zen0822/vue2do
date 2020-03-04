"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 相对于浏览器可视界面的偏移值
 *
 * @param {*} el
 * @param {*} options
 */
var offset = function (el) {
    if (!el) {
        return;
    }
    // 只有 IE <=11 会, 不然会报错
    if (!el.getClientRects().length) {
        return {
            top: 0,
            left: 0
        };
    }
    var rect = el.getBoundingClientRect();
    var win = el.ownerDocument.defaultView;
    return {
        top: rect.top + win.pageYOffset,
        left: rect.left + win.pageXOffset
    };
};
exports.offset = offset;
/**
 * 相对于 offsetParent 的偏移值
 *
 * @param {*} el
 */
var position = function (el) {
    if (!el) {
        return;
    }
    var offsetParent;
    var offset;
    var doc;
    var parentOffset = {
        top: 0,
        left: 0
    };
    var elStyle = getComputedStyle(el);
    if (elStyle.position === 'fixed') {
        offset = el.getBoundingClientRect();
    }
    else {
        offset = offset(el);
        doc = el.ownerDocument;
        offsetParent = el.offsetParent || doc.documentElement;
        var parentStyle = getComputedStyle(offsetParent);
        while (offsetParent &&
            (offsetParent === doc.body || offsetParent === doc.documentElement) &&
            parentStyle.position === 'static') {
            offsetParent = offsetParent.parentNode;
        }
        if (offsetParent && offsetParent !== el && offsetParent.nodeType === 1) {
            parentOffset = offset(offsetParent);
            parentOffset.top += parentStyle.borderTopWidth;
            parentOffset.left += parentStyle.borderLeftWidth;
        }
    }
    return {
        top: offset.top - parentOffset.top - elStyle.marginTop,
        left: offset.left - parentOffset.left - elStyle.marginLeft
    };
};
exports.position = position;
//# sourceMappingURL=position.js.map