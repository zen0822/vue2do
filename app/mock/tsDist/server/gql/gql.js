"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var schema_gql_1 = __importDefault(require("./schema.gql"));
var Subscription_1 = __importDefault(require("./resolver/Subscription"));
var Mutation_1 = __importDefault(require("./resolver/Mutation"));
var prisma_1 = require("../prisma");
var ServerMain = /** @class */ (function () {
    function ServerMain() {
        this.resolvers = {};
        this.links = [{
                id: 'link-0',
                url: 'www.howtographql.com',
                description: 'Fullstack tutorial for GraphQL'
            }];
        this.idCount = this.links.length;
        this.init();
    }
    ServerMain.prototype.init = function () {
        var _this = this;
        this.resolvers = {
            Query: {
                info: function () { return "This is the API of a Hackernews Clone"; },
                link: function (_parent, args) {
                    return _this.links.find(function (item) {
                        return item.id === args.id;
                    });
                },
                links: function () { return _this.links; },
                feed: function (_root, args, context) { return __awaiter(_this, void 0, void 0, function () {
                    var where, links;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                where = args.filter ? {
                                    OR: [
                                        { 'description_contains': args.filter },
                                        { 'url_contains': args.filter }
                                    ]
                                } : {};
                                return [4 /*yield*/, context.prisma.links({
                                        where: where,
                                        skip: args.skip,
                                        first: args.first
                                    })];
                            case 1:
                                links = _a.sent();
                                return [2 /*return*/, links];
                        }
                    });
                }); }
            },
            Mutation: __assign(__assign({}, Mutation_1.default), { postLink: function (_parent, args) {
                    var link = {
                        id: "link-" + _this.idCount++,
                        description: args.description,
                        url: args.url
                    };
                    _this.links.push(link);
                    return link;
                }, updateLink: function (_parent, args) {
                    var links = _this.links;
                    var linkIndex = links.findIndex(function (item) { return args.id === item.id; });
                    links[linkIndex] = __assign(__assign({}, links[linkIndex]), args);
                    return links[linkIndex];
                } }),
            User: {
                links: function (parent, _args, context) {
                    return context.prisma.user({ id: parent.id }).links();
                }
            },
            Link: {
                id: function (parent) { return parent.id; },
                description: function (parent) { return parent.description; },
                desc: function (parent) { return "new: " + parent.description; },
                url: function (parent) { return parent.url; },
                postedBy: function (parent, _args, context) {
                    return context.prisma.link({ id: parent.id }).postedBy();
                }
            },
            Subscription: Subscription_1.default
        };
    };
    ServerMain.prototype.gql = function () {
        return {
            typeDefs: schema_gql_1.default,
            resolvers: this.resolvers,
            context: function (request) {
                return __assign(__assign({}, request), { prisma: prisma_1.prisma });
            }
        };
    };
    return ServerMain;
}());
var serverMain = new ServerMain();
function default_1() {
    return serverMain.gql();
}
exports.default = default_1;
//# sourceMappingURL=gql.js.map