"use strict";
exports.__esModule = true;
var object_1 = require("@act2do/component/util/data/object");
var apiPath = function getApiPath(apiData, apiPrefix) {
    return object_1.deepReplaceVal({
        obj: apiData,
        cb: function (apiUrl) {
            if (/^(http|https|\/\/)/.test(apiUrl)) {
                return apiUrl;
            }
            return "" + apiPrefix + apiUrl;
        }
    });
};
exports.api = apiPath;
exports["default"] = apiPath;
