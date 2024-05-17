"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./Upload.scss");
var Upload_pug_1 = __importDefault(require("./Upload.pug"));
var mixin_1 = __importDefault(require("../../mixin"));
exports.default = {
    name: 'PageCompUpload',
    template: Upload_pug_1.default(),
    mixins: [mixin_1.default],
    data: function () {
        return {
            uploadItem: []
        };
    },
    methods: {
        uploadChange: function (_a) {
            var item = _a.item;
            this.uploadItem = item;
        }
    }
};
//# sourceMappingURL=Upload.js.map