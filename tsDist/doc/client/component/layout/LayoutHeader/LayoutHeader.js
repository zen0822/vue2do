"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./LayoutHeader.scss");
var LayoutHeader_pug_1 = __importDefault(require("./LayoutHeader.pug"));
var mixin_1 = __importDefault(require("../mixin"));
exports.default = {
    name: 'header-layout',
    template: LayoutHeader_pug_1.default(),
    mixins: [mixin_1.default],
    data: function () {
        return {
            logoUrl: require('file-loader?name=favicon.ico!../../../asset/img/favicon.ico'),
            menuOpt: [{
                    'name': '组件',
                    'route': '/component/start'
                }, {
                    'name': '构建',
                    'route': '/build'
                }, {
                    'name': '关于',
                    'route': '/about'
                }],
            sortIconDisplay: true
        };
    },
    methods: {
        showMenu: function () {
            this.sortIconDisplay = false;
            this.$refs.mobileMenu.show();
        },
        hideMenu: function () {
            this.sortIconDisplay = true;
        }
    }
};
//# sourceMappingURL=LayoutHeader.js.map