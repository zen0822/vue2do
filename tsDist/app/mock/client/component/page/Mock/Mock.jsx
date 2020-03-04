"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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
Object.defineProperty(exports, "__esModule", { value: true });
require("./Mock.scss");
var composition_api_1 = require("@vue/composition-api");
var graphql_tag_1 = __importDefault(require("graphql-tag"));
var app_1 = require("../../../app");
var router = app_1.useRouter();
exports.default = composition_api_1.defineComponent({
    name: 'PageMock',
    // apollo: {
    //   links: {
    //     query: gql`{
    //       links {
    //         id,
    //         url
    //       }
    //     }`,
    //     prefetch: ({ route }: { route: any }): any => ({ id: route.params.id }),
    //     variables(): any {
    //       return {
    //         id: 1
    //       }
    //     }
    //   }
    // },
    setup: function (_props, _a) {
        var _this = this;
        var root = _a.root;
        var links = composition_api_1.ref([]);
        var articleId = composition_api_1.ref(root.$route.params.id);
        var fetchSWMock = function () {
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
        var queryLinks = function () { return __awaiter(_this, void 0, void 0, function () {
            var data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, root.$apollo.query({
                                query: graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["{\n            links {\n              id,\n              url\n            }\n          }"], ["{\n            links {\n              id,\n              url\n            }\n          }"])))
                            })];
                    case 1:
                        data = (_a.sent()).data;
                        links.value = data.links;
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.warn(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        /**
         * 添加 link
         */
        var addLink = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                root.$apollo.mutate({
                    mutation: graphql_tag_1.default(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n            mutation ($msg: String!, $description: String!) {\n              postLink(\n                url: $msg,\n                description: $description\n              ) {\n                id,\n                url\n              }\n            }\n          "], ["\n            mutation ($msg: String!, $description: String!) {\n              postLink(\n                url: $msg,\n                description: $description\n              ) {\n                id,\n                url\n              }\n            }\n          "]))),
                    variables: {
                        msg: 'zen0822.github.io',
                        description: 'vue2do doc'
                    }
                });
                return [2 /*return*/];
            });
        }); };
        composition_api_1.onMounted(function () {
            console.log('onMounted');
        });
        composition_api_1.watch(links, function (links, prevLinks) { console.log('Watch links', links, prevLinks); });
        return {
            addLink: addLink,
            articleId: articleId,
            links: links,
            fetchSWMock: fetchSWMock,
            queryLinks: queryLinks
        };
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    render: function (h) {
        var _a = this, links = _a.links, addLink = _a.addLink, queryLinks = _a.queryLinks;
        return (<div class='p-mock-p'>
        <div onClick={function () { return router.push('/404'); }}>跳转到 404</div>

        <z-btn class='z-css-m-r' onClick={function () { return addLink(); }}>增加 link</z-btn>

        <z-btn theme='success' onClick={function () { return queryLinks(); }}>获取 link</z-btn>

        <ol>
          {links.map(function (item) { return (<li>{item.id} {item.url}</li>); })}
        </ol>
      </div>);
    }
});
var templateObject_1, templateObject_2;
//# sourceMappingURL=Mock.jsx.map