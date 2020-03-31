"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./LayoutHeader.scss");
var composition_api_1 = require("@vue/composition-api");
var mixin_1 = require("../mixin");
var Row_1 = __importDefault(require("@vue2do/component/module/Row"));
var Col_1 = __importDefault(require("@vue2do/component/module/Col"));
var Icon_1 = __importDefault(require("@vue2do/component/module/Icon"));
var Input_1 = __importDefault(require("@vue2do/component/module/Input"));
var Nav_1 = __importDefault(require("@vue2do/component/module/Nav"));
var favicon_png_1 = __importDefault(require("../../../asset/img/favicon.png"));
exports.default = composition_api_1.defineComponent({
    name: 'LayoutHeader',
    setup: function () {
        var mobileMenuRef = composition_api_1.ref(null);
        var sortIconDisplay = composition_api_1.ref(false);
        var menuOpt = composition_api_1.ref([{
                'name': '组件',
                'route': '/component/start'
            }, {
                'name': '构建',
                'route': '/build'
            }, {
                'name': '关于',
                'route': '/about'
            }]);
        function showMenu() {
            var _a;
            sortIconDisplay.value = false;
            (_a = mobileMenuRef === null || mobileMenuRef === void 0 ? void 0 : mobileMenuRef.value) === null || _a === void 0 ? void 0 : _a.show();
        }
        function hideMenu() {
            sortIconDisplay.value = true;
        }
        return {
            hideMenu: hideMenu,
            menuOpt: menuOpt,
            showMenu: showMenu,
            sortIconDisplay: sortIconDisplay,
            typeUI: mixin_1.typeUI,
            typeTheme: mixin_1.typeTheme
        };
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    render: function (h) {
        var _a = this, hideMenu = _a.hideMenu, menuOpt = _a.menuOpt, showMenu = _a.showMenu, sortIconDisplay = _a.sortIconDisplay, typeUI = _a.typeUI, typeTheme = _a.typeTheme;
        return (<div class='header-layout-stage'>
        <Row_1.default class='nav-box' justify='justify'>
          <Col_1.default width='calc(100% - 400px)'>
            <router-link to='/'>
              <img class='logo-box' src={favicon_png_1.default}/>
            </router-link>
          </Col_1.default>
          <Col_1.default width='calc(400px)'>
            <Row_1.default class='nav-menu-box' justify='justify'>
              <Col_1.default span={3}>
                <router-link to='/component/start'>组件</router-link>
              </Col_1.default>
              <Col_1.default span={3}>
                <router-link to='/build'>构建</router-link>
              </Col_1.default>
              <Col_1.default span={3}>
                <router-link to='/about'>关于</router-link>
              </Col_1.default>
              <Col_1.default span={3}>
                <a href='//github.com/zen0822/vue2do'>
                  <Icon_1.default size='L' theme='grey' kind='github'/>
                </a>
              </Col_1.default>
            </Row_1.default>
          </Col_1.default>
        </Row_1.default>

        <Row_1.default class='nav-box nav-box-mobile'>
          <Col_1.default span={4}>
            <div onClick={function () { return showMenu(); }}>
              <Icon_1.default kind='sort' v-show={sortIconDisplay}/>
            </div>
          </Col_1.default>
          <Col_1.default class='z-css-text-center' span={4}>
            <img class='logo-box' src={favicon_png_1.default}/>
          </Col_1.default>
          <Col_1.default class='z-css-text-right' span={4}>
            <div onClick={function () { return showMenu(); }}>
              <Icon_1.default kind='search'/>
            </div>
          </Col_1.default>
        </Row_1.default>

        <Nav_1.default class='mobile-menu' ref='mobileMenu' {...{ on: { hide: hideMenu } }} initOpt={menuOpt} ui={typeUI} theme={typeTheme}>
          <div class='menu-search' slot='end'>
            <Input_1.default placeholder='search in vue2do' block>
              <Icon_1.default slot='header' kind='search' size='xs'/>
            </Input_1.default>
          </div>
        </Nav_1.default>
      </div>);
    }
});
//# sourceMappingURL=LayoutHeader.jsx.map