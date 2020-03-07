"use strict";
/**
 * the main file that the client of app
 */
Object.defineProperty(exports, "__esModule", { value: true });
// import 'font-awesome-sass-loader'
require("core-js/stable");
require("regenerator-runtime/runtime");
require("@vue2do/component/dist/util.css");
require("./scss/main.scss");
var app_1 = require("./app");
if (process.env.NODE_ENV === 'production') {
    window._hmt = window._hmt || [];
    var hm = document.createElement('script');
    hm.src = 'https://hm.baidu.com/hm.js?25a6196bf29fc95bf16136b45038ae6a';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(hm, s);
}
var _a = app_1.createApp(), app = _a.app, router = _a.router;
router.onReady(function () {
    app.$mount('#app');
});
//# sourceMappingURL=main.js.map