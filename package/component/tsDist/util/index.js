"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 函数防抖
 * 在一个周期内，调用多次只执行一次
 * 如果在这个周期又调用重新计算直到周期结束执行一次
 *
 * ex: 渲染一个Markdown格式的评论预览, 当窗口停止改变大小之后重新计算布局
 *
 * @param {Object} func - 执行函数
 * @param {Number} wait - 间隔时间，默认 1000 毫秒
 */
var debounce = function (func, wait) {
    if (wait === void 0) { wait = 1000; }
    var timeout = null;
    var debounced = function () {
        var argu = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            argu[_i] = arguments[_i];
        }
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            func.apply(void 0, argu);
        }, wait);
    };
    debounced.cancel = function () {
        clearTimeout(timeout);
        timeout = null;
    };
    return debounced;
};
exports.debounce = debounce;
/**
 * 函数节流
 * 在一个周期内多次调用只能执行一次，且是周期的开始执行一次
 * 周期结束重新开始
 *
 * @param {Object} func - 执行函数
 * @param {Number} wait - 间隔时间
 */
var throttle = function (func, wait) {
    if (wait === void 0) { wait = 1000; }
    var startTime = Date.now();
    var throttled = function () {
        var argu = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            argu[_i] = arguments[_i];
        }
        var time = Date.now();
        if (startTime + wait - time <= 0) {
            startTime = time;
            func.apply(void 0, argu);
            return true;
        }
        return false;
    };
    throttled.cancel = function () {
        startTime = Date.now();
    };
    return throttled;
};
exports.throttle = throttle;
//# sourceMappingURL=index.js.map