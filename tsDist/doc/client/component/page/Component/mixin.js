"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var store_1 = require("../../../vuex/store");
var type_json_1 = __importDefault(require("../../../vuex/module/common/type.json"));
var util_1 = require("@vue2do/component/util");
var composition_api_1 = require("@vue/composition-api");
var store = store_1.useStore();
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
var varPrefix = composition_api_1.ref('VUE2DO');
var testOpt = composition_api_1.ref(testOptTemp);
exports.testOpt = testOpt;
var appContent = store_1.useState(type_json_1.default.appContent.get);
exports.appContent = appContent;
var compStage = store_1.useState(type_json_1.default.compStage.get);
exports.compStage = compStage;
var deviceSize = store_1.useState(type_json_1.default.deviceSize.get);
exports.deviceSize = deviceSize;
var typeUI = store_1.useState(type_json_1.default.typeUI.get);
exports.typeUI = typeUI;
var typeTheme = store_1.useState(type_json_1.default.typeTheme.get);
exports.typeTheme = typeTheme;
var goAnchor = function (evt) {
    var anchor = evt.currentTarget;
    compStage.scrollTop = anchor.offsetTop;
};
exports.goAnchor = goAnchor;
var anchorLink = function (route, name) {
    return route.path + '#' + name;
};
exports.anchorLink = anchorLink;
var mounted = function () {
    var updateDeviceSize = function () {
        var deviceSizeEle = document.querySelector('.z-css-device-size');
        var deviceType = '';
        if (deviceSizeEle) {
            deviceType = getComputedStyle(deviceSizeEle, ':after').getPropertyValue('content');
            store.dispatch(type_json_1.default.deviceSize, deviceType);
        }
    };
    window.addEventListener('resize', util_1.debounce(updateDeviceSize, 100));
    updateDeviceSize();
};
exports.mounted = mounted;
exports.mixinConf = {
    store: store,
    methods: {
        _initComp: function () {
            // TODO
        },
        anchorLink: function (name) {
            return this.$route.path + '#' + name;
        },
        goAnchor: function (evt) {
            var anchor = evt.currentTarget;
            this.compStage.scrollTop = anchor.offsetTop;
        }
    },
    computed: {
        varPrefix: function () {
            return varPrefix;
        },
        testOpt: function () {
            return testOptTemp;
        },
        appContent: function () {
            return this.$store.getters[type_json_1.default.appContent.get];
        },
        compStage: function () {
            return this.$store.getters[type_json_1.default.compStage.get];
        },
        typeUI: function () {
            return this.$store.getters[type_json_1.default.typeUI.get];
        },
        typeTheme: function () {
            return this.$store.getters[type_json_1.default.typeTheme.get];
        },
        deviceSize: function () {
            return this.$store.getters[type_json_1.default.deviceSize];
        }
    },
    mounted: function () {
        var _this = this;
        this._initComp();
        var updateDeviceSize = function () {
            var deviceSizeEle = document.querySelector('.z-css-device-size');
            var deviceType = '';
            if (deviceSizeEle) {
                deviceType = getComputedStyle(deviceSizeEle, ':after').getPropertyValue('content');
                _this.$store.dispatch(type_json_1.default.deviceSize, deviceType);
            }
        };
        window.addEventListener('resize', util_1.debounce(updateDeviceSize, 100));
        updateDeviceSize();
    }
};
exports.default = exports.mixinConf;
//# sourceMappingURL=mixin.js.map