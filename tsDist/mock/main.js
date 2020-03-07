"use strict";
/**
 * the lunch file of app
 */
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./client/main");
if (process.env.SW_ENV === 'development') {
    Promise.resolve().then(function () { return __importStar(require('./client/sw/main')); });
}
//# sourceMappingURL=main.js.map