(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["page-hook"],{

/***/ "./app/mock/client/page/hook.ts":
/*!**************************************!*\
  !*** ./app/mock/client/page/hook.ts ***!
  \**************************************/
/*! exports provided: exData, testOpt */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exData", function() { return exData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "testOpt", function() { return testOpt; });
/* harmony import */ var _vuex_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../vuex/store */ "./app/mock/client/vuex/store.ts");
/* harmony import */ var _vuex_module_common_type_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../vuex/module/common/type.json */ "./app/mock/client/vuex/module/common/type.json");
var _vuex_module_common_type_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../vuex/module/common/type.json */ "./app/mock/client/vuex/module/common/type.json", 1);
/* harmony import */ var _vue_composition_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @vue/composition-api */ "./node_modules/@vue/composition-api/dist/vue-composition-api.module.js");



var testOptTemp = [];

for (var i = 0, len = 33; i < len; i++) {
  testOptTemp.push({
    text: 'test-' + i,
    name: 'name-' + i,
    size: 'size-' + i,
    en: 'en-' + i,
    value: i
  });
}

var testOpt = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_2__["ref"])(testOptTemp);
var exData = Object(_vuex_store__WEBPACK_IMPORTED_MODULE_0__["useState"])(_vuex_module_common_type_json__WEBPACK_IMPORTED_MODULE_1__.ex.add);


/***/ })

}]);
//# sourceMappingURL=page-hook.bundle.js.map