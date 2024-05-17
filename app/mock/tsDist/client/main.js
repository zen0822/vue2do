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
require("./sw/main");
var app_1 = require("./app");
var _a = app_1.createApp(), app = _a.app, router = _a.router;
router.onReady(function () {
    app.$mount('#app');
});
//# sourceMappingURL=main.js.map