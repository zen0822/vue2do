"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./Modal.scss");
var Modal_pug_1 = __importDefault(require("./Modal.pug"));
var mixin_1 = __importDefault(require("../../mixin"));
var alert_1 = __importDefault(require("@vue2do/component/module/Modal/alert"));
var confirm_1 = __importDefault(require("@vue2do/component/module/Modal/confirm"));
exports.default = {
    name: 'PageCompModal',
    template: Modal_pug_1.default(),
    mixins: [mixin_1.default],
    data: function () {
        return {
            testName: 'test'
        };
    },
    methods: {
        simple: function () {
            this.$refs.simple.show();
        },
        alert: function () {
            alert_1.default({
                message: '这是一个警告弹窗',
                theme: this.typeTheme,
                ui: this.typeUI
            });
        },
        confirm: function () {
            confirm_1.default({
                message: '这是一个确认弹窗',
                title: '测试确认弹出',
                theme: 'danger',
                ui: 'bootstrap'
            });
        },
        showFullPop: function () {
            this.$refs.fullPop.show();
        },
        hideFullPop: function () {
            this.$refs.fullPop.hide();
        },
        showPureModal: function () {
            this.$refs.pureModal.show();
        },
        hidePureModal: function () {
            this.$refs.pureModal.hide();
        }
    }
};
//# sourceMappingURL=Modal.js.map