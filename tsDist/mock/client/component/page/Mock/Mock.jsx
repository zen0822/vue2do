"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./Mock.scss");
require("vue-router");
var graphql_tag_1 = __importDefault(require("graphql-tag"));
var vue_class_component_1 = __importStar(require("vue-class-component"));
var vue_property_decorator_1 = require("vue-property-decorator");
var MixinPageComponent_1 = __importDefault(require("../../MixinPageComponent"));
var PageMock = /** @class */ (function (_super) {
    __extends(PageMock, _super);
    /**
     * 声明业务组件 PageMock 并且继承（混入）MixinPageComponent 类
     */
    function PageMock() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.articleId = '';
        _this.testData = '';
        _this.links = [];
        return _this;
    }
    /**
     * 监听 links 状态变量
     *
     * @param val
     */
    PageMock.prototype.onLinksChanged = function (val) {
        console.log(val);
    };
    PageMock.prototype.text = function () {
        return this.testData;
    };
    PageMock.prototype.fetchSWMock = function () {
        fetch(new Request('/api/ex', {
            headers: new Headers({
                'Accept': 'application/json'
            })
        })).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
        });
    };
    /**
     * 获取所有 Link
     */
    PageMock.prototype.queryLinks = function () {
        return this.$apollo.queries.links.refetch();
    };
    /**
     * 添加 link
     */
    PageMock.prototype.addLink = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.$apollo.mutate({
                    mutation: graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n          mutation ($msg: String!, $description: String!) {\n            postLink(\n              url: $msg,\n              description: $description\n            ) {\n              id,\n              url\n            }\n          }\n        "], ["\n          mutation ($msg: String!, $description: String!) {\n            postLink(\n              url: $msg,\n              description: $description\n            ) {\n              id,\n              url\n            }\n          }\n        "]))),
                    variables: {
                        msg: 'zen0822.github.io',
                        description: 'vue2do doc'
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    /**
     * 组件安装完成之后执行的函数
     */
    PageMock.prototype.mounted = function () {
        this.articleId = this.$route.params.id;
    };
    /**
     * dom 渲染
     *
     * @param h
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    PageMock.prototype.render = function (h) {
        var _this = this;
        return (<div class='p-mock-p'>
        <z-btn class='z-css-m-r' onClick={function () { return _this.addLink(); }}>增加 link</z-btn>

        <z-btn theme='success' onClick={function () { return _this.queryLinks(); }}>获取 link</z-btn>

        <ol>
          {this.links.map(function (item) { return (<li>{item.id} {item.url}</li>); })}
        </ol>
      </div>);
    };
    __decorate([
        vue_property_decorator_1.Watch('links')
    ], PageMock.prototype, "onLinksChanged", null);
    PageMock = __decorate([
        vue_class_component_1.default({
        // apollo: {
        //   links: {
        //     query: gql`{
        //       links {
        //         id,
        //         url
        //       }
        //     }`,
        //     prefetch: ({ route }) => ({ id: route.params.id }),
        //     variables() {
        //       return {
        //         id: this.$route.params.id
        //       }
        //     }
        //   }
        // }
        })
        /**
         * 声明业务组件 PageMock 并且继承（混入）MixinPageComponent 类
         */
    ], PageMock);
    return PageMock;
}(vue_class_component_1.mixins(MixinPageComponent_1.default)));
exports.default = PageMock;
var templateObject_1;
//# sourceMappingURL=Mock.jsx.map