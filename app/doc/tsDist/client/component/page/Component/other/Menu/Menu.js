"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./Menu.scss");
var Menu_pug_1 = __importDefault(require("./Menu.pug"));
var mixin_1 = __importDefault(require("../../mixin"));
exports.default = {
    name: 'PageCompMenu',
    template: Menu_pug_1.default(),
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
    }
};
//# sourceMappingURL=Menu.js.map