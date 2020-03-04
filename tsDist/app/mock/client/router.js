"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = __importDefault(require("vue"));
var vue_router_1 = __importDefault(require("vue-router"));
var route_1 = __importDefault(require("./route/route"));
vue_1.default.use(vue_router_1.default);
var router = new vue_router_1.default({
    routes: route_1.default
});
function createRouter() {
    return router;
}
exports.createRouter = createRouter;
function useRouter() {
    return router;
}
exports.useRouter = useRouter;
//# sourceMappingURL=router.js.map