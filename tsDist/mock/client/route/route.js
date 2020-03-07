"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [{
        path: '/',
        component: function () { return Promise.resolve().then(function () { return __importStar(require('../component/page/Mock/Mock')); }); },
        meta: {
            title: 'Min Mock'
        }
    }, {
        path: '*',
        component: function () { return Promise.resolve().then(function () { return __importStar(require('../component/404/404')); }); },
        meta: {
            title: '404'
        }
    }];
//# sourceMappingURL=route.js.map