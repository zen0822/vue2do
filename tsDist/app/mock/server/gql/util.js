"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.APP_SECRET = 'GraphQL-is-aw3some';
function getUserId(context) {
    var Authorization = context.request.get('Authorization');
    if (Authorization) {
        var token = Authorization.replace('Bearer ', '');
        var userId = jsonwebtoken_1.default.verify(token, exports.APP_SECRET).userId;
        return userId;
    }
    throw new Error('Not authenticated');
}
exports.getUserId = getUserId;
exports.default = {
    APP_SECRET: exports.APP_SECRET,
    getUserId: getUserId
};
//# sourceMappingURL=util.js.map