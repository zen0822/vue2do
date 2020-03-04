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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dexie_1 = __importDefault(require("dexie"));
var DBMock = /** @class */ (function (_super) {
    __extends(DBMock, _super);
    function DBMock() {
        var _this = _super.call(this, 'DBMock') || this;
        _this.version(1).stores({
            mock: 'name, api, data'
        });
        _this.mock = _this.table('mock');
        return _this;
    }
    return DBMock;
}(dexie_1.default));
exports.DBMock = DBMock;
var db = new DBMock();
exports.default = db;
//# sourceMappingURL=mock.db.js.map