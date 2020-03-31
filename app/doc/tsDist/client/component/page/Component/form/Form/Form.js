"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Form_pug_1 = __importDefault(require("./Form.pug"));
var mixin_1 = __importDefault(require("../../mixin"));
exports.default = {
    name: 'PageCompForm',
    template: Form_pug_1.default(),
    mixins: [mixin_1.default],
    methods: {
        submit: function () {
            var _this = this;
            this.$refs.submit.openLoading();
            if (this.$refs.formArea.verify()) {
                console.log(this.$refs.formArea.queryOpt);
            }
            else {
                console.warn('verify error!');
            }
            setTimeout(function () {
                _this.$refs.submit.closeLoading();
            }, 5000);
        }
    }
};
//# sourceMappingURL=Form.js.map