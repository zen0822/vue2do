"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./Input.scss");
var Input_pug_1 = __importDefault(require("./Input.pug"));
var mixin_1 = __importDefault(require("../../mixin"));
exports.default = {
    name: 'PageCompInput',
    template: Input_pug_1.default(),
    mixins: [mixin_1.default],
    data: function () {
        return {
            testName: 'test'
        };
    },
    methods: {
        clickVerifyInput: function () {
            var verified = this.$refs.verifyInput.validate();
            return verified;
        }
    }
};
//# sourceMappingURL=Input.js.map