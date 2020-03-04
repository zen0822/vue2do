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
        path: 'zoom',
        component: function () { return Promise.resolve().then(function () { return __importStar(require('../component/page/Component/Motion/Zoom/Zoom')); }); },
        meta: {
            title: '缩放过渡组件'
        }
    }, {
        path: 'slide',
        component: function () { return Promise.resolve().then(function () { return __importStar(require('../component/page/Component/Motion/Slide/Slide')); }); },
        meta: {
            title: '滑动过渡组件'
        }
    }, {
        path: 'fade',
        component: function () { return Promise.resolve().then(function () { return __importStar(require('../component/page/Component/Motion/Fade/Fade')); }); },
        meta: {
            title: '淡淡过渡组件'
        }
    }, {
        path: 'fold',
        component: function () { return Promise.resolve().then(function () { return __importStar(require('../component/page/Component/Motion/Fold/Fold')); }); },
        meta: {
            title: '折叠过渡组件'
        }
    }, {
        path: 'rip',
        component: function () { return Promise.resolve().then(function () { return __importStar(require('../component/page/Component/Motion/Rip/Rip')); }); },
        meta: {
            title: '涟漪过渡组件'
        }
    }];
//# sourceMappingURL=motionChildren.js.map