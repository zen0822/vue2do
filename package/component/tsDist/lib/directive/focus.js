"use strict";
/**
 * 获取焦点指令
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = __importDefault(require("vue"));
var focusDirective = {
    priority: 1000,
    inserted: function (el, binding) {
        binding.zBound = true;
        binding.zFocus = function () {
            if (binding.zBound) {
                el.focus();
            }
        };
        binding.zBlur = function () {
            if (binding.zBound) {
                el.blur();
            }
        };
    },
    update: function (el, binding) {
        if (binding.value) {
            vue_1.default.nextTick(binding.zFocus);
        }
        else {
            vue_1.default.nextTick(binding.zBlur);
        }
    },
    unbind: function (el, binding) {
        binding.zBound = false;
    }
};
vue_1.default.directive('focus', focusDirective);
//# sourceMappingURL=focus.js.map