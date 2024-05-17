"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var componentChildren_1 = __importDefault(require("./componentChildren"));
// const routerLazyLoad = (filename) => {
//   return () => {
//     try {
//       return import(/* webpackChunkName: "[request]" */`../component/page${filename}`)
//     } catch (error) {
//       console.error(error)
//     }
//   }
// }
exports.default = [{
        path: '/',
        component: function () { return Promise.resolve().then(function () { return __importStar(require('../component/page/Welcome/Welcome')); }); },
        meta: {
            title: '主页'
        }
    }, {
        path: '/hello',
        component: function () { return Promise.resolve().then(function () { return __importStar(require('../component/page/Hello/Hello')); }); },
        meta: {
            title: 'soulemate'
        }
    }, {
        path: '/build',
        component: function () { return Promise.resolve().then(function () { return __importStar(require('../component/page/Build/Build')); }); },
        meta: {
            title: '构建'
        }
    }, {
        path: '/about',
        component: function () { return Promise.resolve().then(function () { return __importStar(require('../component/page/About/About')); }); },
        meta: {
            title: '构建'
        }
    }, {
        path: '/blog',
        component: function () { return Promise.resolve().then(function () { return __importStar(require('../component/page/Blog/Blog')); }); },
        meta: {
            title: '文章'
        }
    }, {
        path: '/component',
        component: function () { return Promise.resolve().then(function () { return __importStar(require('../component/page/Component/Component')); }); },
        children: componentChildren_1.default
    }, {
        path: '*',
        component: function () { return Promise.resolve().then(function () { return __importStar(require('../component/404/404')); }); },
        meta: {
            title: '404'
        }
    }];
//# sourceMappingURL=route.js.map