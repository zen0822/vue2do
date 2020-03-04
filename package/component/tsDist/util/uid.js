"use strict";
/**
 * 产生唯一的 ID
 */
Object.defineProperty(exports, "__esModule", { value: true });
function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
function uid() {
    return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
}
exports.default = uid;
//# sourceMappingURL=uid.js.map