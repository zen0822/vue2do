"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./App.scss");
var composition_api_1 = require("@vue/composition-api");
var store_1 = require("../vuex/store");
var type_json_1 = __importDefault(require("../vuex/module/common/type.json"));
var LayoutHeader_1 = __importDefault(require("../component/layout/LayoutHeader/LayoutHeader"));
var LayoutFooter_1 = __importDefault(require("../component/layout/LayoutFooter/LayoutFooter"));
require('file-loader?name=favicon.ico!../asset/img/favicon.png');
var store = store_1.useStore();
exports.default = composition_api_1.defineComponent({
    name: 'App',
    props: {
        testData: String
    },
    setup: function () {
        var appContentRef = composition_api_1.ref(null);
        var headerRef = composition_api_1.ref(null);
        var footerRef = composition_api_1.ref(null);
        var contentHeight = composition_api_1.ref(0);
        var windowProps = store_1.useState(type_json_1.default.window.get);
        var deviceSize = store_1.useState(type_json_1.default.deviceSize);
        var appStyle = store_1.useState(type_json_1.default.deviceSize);
        composition_api_1.onMounted(function () {
            store.dispatch(type_json_1.default.window.add, {
                prop: 'innerHeight',
                value: window.innerHeight
            });
            store.dispatch(type_json_1.default.appContent.add, appContentRef.value);
        });
        composition_api_1.watch(windowProps, function (val) {
            var _a, _b, _c, _d;
            if (val) {
                contentHeight.value = (_d = (_b = val.innerHeight
                    - ((_a = headerRef === null || headerRef === void 0 ? void 0 : headerRef.value) === null || _a === void 0 ? void 0 : _a.$el.offsetHeight)) !== null && _b !== void 0 ? _b : 0
                    - ((_c = footerRef === null || footerRef === void 0 ? void 0 : footerRef.value) === null || _c === void 0 ? void 0 : _c.$el.offsetHeight)) !== null && _d !== void 0 ? _d : 0;
            }
        });
        return {
            appContentRef: appContentRef,
            deviceSize: deviceSize,
            headerRef: headerRef,
            footerRef: footerRef,
            appStyle: appStyle
        };
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    render: function (h) {
        var _a = this, appStyle = _a.appStyle, deviceSize = _a.deviceSize;
        return (<div class='app-container' data-size={deviceSize}>
        <LayoutHeader_1.default ref='headerRef'/>
        <div class='app-content' style={appStyle} ref='appContentRef'>
          <router-view />
        </div>
        <LayoutFooter_1.default ref='footerRef'/>
      </div>);
    }
});
//# sourceMappingURL=App.jsx.map