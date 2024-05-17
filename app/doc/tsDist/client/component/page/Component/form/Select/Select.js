"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./Select.scss");
var Select_pug_1 = __importDefault(require("./Select.pug"));
var mixin_1 = __importDefault(require("../../mixin"));
exports.default = {
    name: 'PageCompSelect',
    template: Select_pug_1.default(),
    mixins: [mixin_1.default],
    data: function () {
        return {
            testName: 'test',
            dropMenuOpt: [],
            classifyOpt: {
                recent: [{
                        value: 1,
                        text: 'test1'
                    }],
                hot: [{
                        value: 1,
                        text: 'test1'
                    }, {
                        value: 2,
                        text: 'test2'
                    }, {
                        value: 3,
                        text: 'test3'
                    }]
            },
            initVal: []
        };
    },
    computed: {
        selectOpt: function () {
            this.testOpt.unshift({
                value: -1,
                text: '请选择'
            });
            return this.testOpt;
        }
    },
    created: function () {
        var _this = this;
        var testOpt = [];
        for (var i = 0, len = 13; i < len; i++) {
            testOpt.push({
                text: 'test-' + i,
                name: 'name-' + i,
                size: 'size-' + i,
                en: 'en-' + i,
                value: i
            });
        }
        this.dropMenuOpt = testOpt;
        setTimeout(function () {
            var _a;
            (_a = _this.dropMenuOpt).push.apply(_a, testOpt);
        }, 10000);
    }
};
//# sourceMappingURL=Select.js.map