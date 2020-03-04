"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var addClass = function (el, classHub) {
    if (!((Array.isArray(classHub) && classHub.length > 0) ||
        typeof classHub === 'string')) {
        return false;
    }
    var localClass = el.className.split(' ');
    var classSet;
    if (Array.isArray(classHub)) {
        classSet = new Set(localClass.concat(classHub));
    }
    else if (typeof classHub === 'string') {
        classSet = new Set(localClass.concat(classHub.trim().split(' ')));
    }
    el.className = __spreadArrays(classSet).join(' ');
};
exports.addClass = addClass;
var delClass = function (el, classHub) {
    if (!((Array.isArray(classHub) && classHub.length > 0) ||
        typeof classHub === 'string')) {
        return false;
    }
    var localClass = new Set(el.className.split(' '));
    var classSet;
    if (Array.isArray(classHub)) {
        classSet = new Set(classHub);
    }
    else if (typeof classHub === 'string') {
        classSet = new Set(classHub.trim().split(' '));
    }
    classSet.forEach(function (item) {
        localClass.delete(item);
    });
    el.className = __spreadArrays(localClass).join(' ');
};
exports.delClass = delClass;
var childrenHeight = function (el) {
    var children = el.children;
    var totalHeight = 0;
    for (var i = 0, len = children.length; i < len; i++) {
        totalHeight += children[i].offsetHeight;
    }
    return totalHeight;
};
exports.childrenHeight = childrenHeight;
//# sourceMappingURL=attr.js.map