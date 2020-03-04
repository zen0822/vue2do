"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./App.scss");
var App_pug_1 = __importDefault(require("./App.pug"));
var store_1 = __importDefault(require("../vuex/store"));
var type_json_1 = __importDefault(require("../vuex/module/common/type.json"));
var LayoutHeader_1 = __importDefault(require("../component/layout/LayoutHeader/LayoutHeader"));
var LayoutFooter_1 = __importDefault(require("../component/layout/LayoutFooter/LayoutFooter"));
require('file-loader?name=favicon.ico!../asset/img/favicon.ico');
exports.default = {
    name: 'App',
    store: store_1.default,
    data: function () {
        return {
            contentHeight: 0
        };
    },
    template: App_pug_1.default(),
    components: {
        'header-layout': LayoutHeader_1.default,
        'footer-layout': LayoutFooter_1.default
    },
    computed: {
        windowProps: function () {
            return this.$store.getters[type_json_1.default.window.get];
        },
        deviceSize: function () {
            return this.$store.getters[type_json_1.default.deviceSize];
        },
        appStyle: function () {
            if (this.contentHeight === 0 || this.deviceSize === 'xs') {
                return {};
            }
            return {
                height: this.contentHeight + "px"
            };
        }
    },
    watch: {
        'windowProps': function (val) {
            this.contentHeight = val.innerHeight - this.$refs.header.$el.offsetHeight - this.$refs.footer.$el.offsetHeight;
        }
    },
    mounted: function () {
        this.$store.dispatch(type_json_1.default.window.add, {
            prop: 'innerHeight',
            value: window.innerHeight
        });
        this.$store.dispatch(type_json_1.default.appContent.add, this.$refs.appContent);
    }
};
//# sourceMappingURL=App.js.map