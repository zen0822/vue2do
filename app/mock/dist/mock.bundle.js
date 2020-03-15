(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["mock"],{

/***/ "./app/mock/client lazy recursive ^\\.\\/page.*$":
/*!************************************************************!*\
  !*** ./app/mock/client lazy ^\.\/page.*$ namespace object ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./page/404/404": [
		"./app/mock/client/page/404/404.js",
		9,
		"page-404-404"
	],
	"./page/404/404.js": [
		"./app/mock/client/page/404/404.js",
		9,
		"page-404-404"
	],
	"./page/Mock/Mock": [
		"./app/mock/client/page/Mock/Mock.tsx",
		9,
		"page-mock"
	],
	"./page/Mock/Mock.scss": [
		"./app/mock/client/page/Mock/Mock.scss",
		7,
		"page-Mock-Mock-scss"
	],
	"./page/Mock/Mock.tsx": [
		"./app/mock/client/page/Mock/Mock.tsx",
		9,
		"page-mock"
	],
	"./page/hook": [
		"./app/mock/client/page/hook.ts",
		9,
		"page-hook"
	],
	"./page/hook.ts": [
		"./app/mock/client/page/hook.ts",
		9,
		"page-hook"
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return __webpack_require__.e(ids[2]).then(function() {
		return __webpack_require__.t(id, ids[1])
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./app/mock/client lazy recursive ^\\.\\/page.*$";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./app/mock/client/App/App.pug":
/*!*************************************!*\
  !*** ./app/mock/client/App/App.pug ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(/*! ../../../../package/build/node_modules/pug-runtime/index.js */ "./package/build/node_modules/pug-runtime/index.js");

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"app-container\"\u003E\u003Cdiv class=\"app-content\" ref=\"appContent\"\u003E\u003Crouter-view\u003E\u003C\u002Frouter-view\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
module.exports = template;

/***/ }),

/***/ "./app/mock/client/App/App.scss":
/*!**************************************!*\
  !*** ./app/mock/client/App/App.scss ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./app/mock/client/App/App.ts":
/*!************************************!*\
  !*** ./app/mock/client/App/App.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.scss */ "./app/mock/client/App/App.scss");
/* harmony import */ var _App_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_App_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _App_pug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.pug */ "./app/mock/client/App/App.pug");
/* harmony import */ var _App_pug__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_App_pug__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _vuex_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../vuex/store */ "./app/mock/client/vuex/store.ts");
/* harmony import */ var _vue_composition_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @vue/composition-api */ "./node_modules/@vue/composition-api/dist/vue-composition-api.module.js");





__webpack_require__(/*! file-loader?name=favicon.ico!../asset/img/favicon.ico */ "./package/build/node_modules/file-loader/dist/cjs.js?name=favicon.ico!./app/mock/client/asset/img/favicon.ico");

/* harmony default export */ __webpack_exports__["default"] = (Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_3__["defineComponent"])({
  name: 'App',
  store: _vuex_store__WEBPACK_IMPORTED_MODULE_2__["default"],
  template: _App_pug__WEBPACK_IMPORTED_MODULE_1___default()(),
  setup: function setup() {
    var contentHeight = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_3__["ref"])(0);
    return {
      contentHeight: contentHeight
    };
  }
}));

/***/ }),

/***/ "./app/mock/client/app.ts":
/*!********************************!*\
  !*** ./app/mock/client/app.ts ***!
  \********************************/
/*! exports provided: createApp, useLang, useApollo, useRoute, useRouter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createApp", function() { return createApp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useLang", function() { return useLang; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useApollo", function() { return useApollo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useRoute", function() { return useRoute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useRouter", function() { return useRouter; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var vue_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-i18n */ "./node_modules/vue-i18n/dist/vue-i18n.esm.js");
/* harmony import */ var apollo_boost__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! apollo-boost */ "./app/mock/node_modules/apollo-boost/lib/bundle.esm.js");
/* harmony import */ var vue_apollo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue-apollo */ "./app/mock/node_modules/vue-apollo/dist/vue-apollo.esm.js");
/* harmony import */ var _vue_composition_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @vue/composition-api */ "./node_modules/@vue/composition-api/dist/vue-composition-api.module.js");
/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vue-router */ "./node_modules/vue-router/dist/vue-router.esm.js");
/* harmony import */ var _App_App__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./App/App */ "./app/mock/client/App/App.ts");
/* harmony import */ var _route_route__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./route/route */ "./app/mock/client/route/route.ts");
/* harmony import */ var _vue2do_component_index_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @vue2do/component/index.js */ "./node_modules/@vue2do/component/index.js");
/* harmony import */ var _vue2do_component_language_en_US_json__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @vue2do/component/language/en-US.json */ "./node_modules/@vue2do/component/language/en-US.json");
var _vue2do_component_language_en_US_json__WEBPACK_IMPORTED_MODULE_9___namespace = /*#__PURE__*/__webpack_require__.t(/*! @vue2do/component/language/en-US.json */ "./node_modules/@vue2do/component/language/en-US.json", 1);
var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};











vue__WEBPACK_IMPORTED_MODULE_0__["default"].use(vue_router__WEBPACK_IMPORTED_MODULE_5__["default"]);
vue__WEBPACK_IMPORTED_MODULE_0__["default"].use(vue_i18n__WEBPACK_IMPORTED_MODULE_1__["default"]);
vue__WEBPACK_IMPORTED_MODULE_0__["default"].use(vue_apollo__WEBPACK_IMPORTED_MODULE_3__["default"]);
vue__WEBPACK_IMPORTED_MODULE_0__["default"].use(_vue_composition_api__WEBPACK_IMPORTED_MODULE_4__["default"]);
vue__WEBPACK_IMPORTED_MODULE_0__["default"].use(_vue2do_component_index_js__WEBPACK_IMPORTED_MODULE_8__["default"], {
  prefix: 'z'
});
var vue2doLang = new vue_i18n__WEBPACK_IMPORTED_MODULE_1__["default"]({
  locale: Object.keys(_vue2do_component_language_en_US_json__WEBPACK_IMPORTED_MODULE_9__)[0],
  messages: _vue2do_component_language_en_US_json__WEBPACK_IMPORTED_MODULE_9__
});
var apolloProvider = new vue_apollo__WEBPACK_IMPORTED_MODULE_3__["default"]({
  defaultClient: new apollo_boost__WEBPACK_IMPORTED_MODULE_2__["default"]({
    uri: 'http://localhost:5168'
  })
});
var router = new vue_router__WEBPACK_IMPORTED_MODULE_5__["default"]({
  routes: _route_route__WEBPACK_IMPORTED_MODULE_7__["default"]
});
function createApp() {
  router.beforeEach(function (to, _from, next) {
    document.title = to.meta.title;
    next();
  });
  var app = new vue__WEBPACK_IMPORTED_MODULE_0__["default"](__assign(__assign({}, _App_App__WEBPACK_IMPORTED_MODULE_6__["default"]), {
    apolloProvider: apolloProvider,
    i18n: vue2doLang,
    router: router
  }));
  return {
    app: app,
    router: router
  };
}
var useLang = function useLang() {
  return vue2doLang;
};
var useApollo = function useApollo() {
  return apolloProvider;
};
var useRoute = function useRoute() {
  return router;
};
var useRouter = function useRouter() {
  return router;
};

/***/ }),

/***/ "./app/mock/client/main.ts":
/*!*********************************!*\
  !*** ./app/mock/client/main.ts ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_stable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/stable */ "./node_modules/core-js/stable/index.js");
/* harmony import */ var core_js_stable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_stable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! regenerator-runtime/runtime */ "./package/build/node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _vue2do_component_dist_util_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @vue2do/component/dist/util.css */ "./node_modules/@vue2do/component/dist/util.css");
/* harmony import */ var _vue2do_component_dist_util_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_vue2do_component_dist_util_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scss/main.scss */ "./app/mock/client/scss/main.scss");
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_scss_main_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app */ "./app/mock/client/app.ts");
/**
 * the main file that the client of app
 */
// import 'font-awesome-sass-loader'



 // import './sw/main'



var _a = Object(_app__WEBPACK_IMPORTED_MODULE_4__["createApp"])(),
    app = _a.app,
    router = _a.router;

router.onReady(function () {
  app.$mount('#app');
});

/***/ }),

/***/ "./app/mock/client/route/route.ts":
/*!****************************************!*\
  !*** ./app/mock/client/route/route.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var routerLazyLoad = function routerLazyLoad(filename) {
  return function () {
    try {
      return __webpack_require__("./app/mock/client lazy recursive ^\\.\\/page.*$")("./page" + filename);
    } catch (error) {
      console.error(error);
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = ([{
  path: '/',
  component: function component() {
    return __webpack_require__.e(/*! import() | page-mock */ "page-mock").then(__webpack_require__.bind(null, /*! ../page/Mock/Mock */ "./app/mock/client/page/Mock/Mock.tsx"));
  },
  meta: {
    title: 'Min Mock'
  }
}, {
  path: '*',
  component: routerLazyLoad('/404/404'),
  meta: {
    title: '404'
  }
}]);

/***/ }),

/***/ "./app/mock/client/scss/main.scss":
/*!****************************************!*\
  !*** ./app/mock/client/scss/main.scss ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./app/mock/client/sw/main.ts":
/*!************************************!*\
  !*** ./app/mock/client/sw/main.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * the main file that the server of app
 */

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

function init() {
  return __awaiter(this, void 0, Promise, function () {
    var Workbox, wb_1;

    var _this = this;

    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          if (!('serviceWorker' in navigator)) return [3
          /*break*/
          , 2];
          return [4
          /*yield*/
          , __webpack_require__.e(/*! import() */ "vendors").then(__webpack_require__.bind(null, /*! workbox-window */ "./app/mock/node_modules/workbox-window/build/workbox-window.prod.es5.mjs"))];

        case 1:
          Workbox = _a.sent().Workbox;
          wb_1 = new Workbox('/sw.js');
          window.addEventListener('load', function () {
            return __awaiter(_this, void 0, void 0, function () {
              var error_1;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    wb_1.register().then(function (registration) {
                      registration.pushManager.subscribe({
                        userVisibleOnly: true
                      }).catch(function (error) {
                        console.warn(error);
                      });
                    }).catch(function (registrationError) {
                      console.warn('SW of mock registration failed: ', registrationError);
                    });
                    _a.label = 1;

                  case 1:
                    _a.trys.push([1, 3,, 4]);

                    return [4
                    /*yield*/
                    , Notification.requestPermission()];

                  case 2:
                    _a.sent();

                    return [3
                    /*break*/
                    , 4];

                  case 3:
                    error_1 = _a.sent();
                    console.warn(error_1);
                    return [3
                    /*break*/
                    , 4];

                  case 4:
                    return [2
                    /*return*/
                    ];
                }
              });
            });
          });
          _a.label = 2;

        case 2:
          return [2
          /*return*/
          ];
      }
    });
  });
}

init();

/***/ }),

/***/ "./app/mock/client/vuex/module/common/common.js":
/*!******************************************************!*\
  !*** ./app/mock/client/vuex/module/common/common.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./package/build/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _type_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./type.json */ "./app/mock/client/vuex/module/common/type.json");
var _type_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./type.json */ "./app/mock/client/vuex/module/common/type.json", 1);


/* harmony default export */ __webpack_exports__["default"] = ({
  state: {
    ex: ''
  },
  getters: _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, _type_json__WEBPACK_IMPORTED_MODULE_1__.ex.add, function (state) {
    return state.ex;
  }),
  actions: _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, _type_json__WEBPACK_IMPORTED_MODULE_1__.ex.add, function (_ref, item) {
    var commit = _ref.commit;
    return commit(_type_json__WEBPACK_IMPORTED_MODULE_1__.ex.add, item);
  }),
  mutations: _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, _type_json__WEBPACK_IMPORTED_MODULE_1__.ex.add, function (state, str) {
    state.ex = str;
  })
});

/***/ }),

/***/ "./app/mock/client/vuex/module/common/type.json":
/*!******************************************************!*\
  !*** ./app/mock/client/vuex/module/common/type.json ***!
  \******************************************************/
/*! exports provided: ex, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"ex\":{\"add\":\"ex/add\"}}");

/***/ }),

/***/ "./app/mock/client/vuex/store.ts":
/*!***************************************!*\
  !*** ./app/mock/client/vuex/store.ts ***!
  \***************************************/
/*! exports provided: useStore, useState, default, common */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useStore", function() { return useStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useState", function() { return useState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "common", function() { return commonStore; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _vue_composition_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @vue/composition-api */ "./node_modules/@vue/composition-api/dist/vue-composition-api.module.js");
/* harmony import */ var _module_common_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./module/common/common */ "./app/mock/client/vuex/module/common/common.js");
// 组装不同的 store 并暴露出来




vue__WEBPACK_IMPORTED_MODULE_0__["default"].use(vuex__WEBPACK_IMPORTED_MODULE_1__["default"]);
var commonStore = new vuex__WEBPACK_IMPORTED_MODULE_1__["default"].Store({
  modules: {
    common: _module_common_common__WEBPACK_IMPORTED_MODULE_3__["default"]
  }
});
function useStore() {
  return commonStore;
}
function useState(name) {
  return Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_2__["computed"])(function () {
    return commonStore.getters[name];
  });
}
/* harmony default export */ __webpack_exports__["default"] = (commonStore);


/***/ }),

/***/ "./app/mock/main.ts":
/*!**************************!*\
  !*** ./app/mock/main.ts ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _client_main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./client/main */ "./app/mock/client/main.ts");
/* harmony import */ var _client_sw_main__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./client/sw/main */ "./app/mock/client/sw/main.ts");
/* harmony import */ var _client_sw_main__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_client_sw_main__WEBPACK_IMPORTED_MODULE_1__);
/**
 * the lunch file of app
 */



/***/ }),

/***/ "./package/build/node_modules/file-loader/dist/cjs.js?name=favicon.ico!./app/mock/client/asset/img/favicon.ico":
/*!*********************************************************************************************************************!*\
  !*** ./package/build/node_modules/file-loader/dist/cjs.js?name=favicon.ico!./app/mock/client/asset/img/favicon.ico ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "favicon.ico";

/***/ }),

/***/ 0:
/*!********************************!*\
  !*** multi ./app/mock/main.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\zen_n\git\vue2do\app\mock\main.ts */"./app/mock/main.ts");


/***/ }),

/***/ 1:
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[[0,"runtime","vendors"]]]);
//# sourceMappingURL=mock.bundle.js.map