"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./total.scss");
var total_tpl_1 = __importDefault(require("./total.tpl"));
exports.default = {
    template: total_tpl_1.default,
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
    methods: {
        optProcessor: function (option) {
            option.unshift({
                value: -1,
                text: 'optProcessor'
            });
            return option;
        },
        clickIcon: function () {
            // TODO
        },
        submit: function () {
            this.$refs.submit.openLoading();
            this.$refs.formArea.verify();
            console.log(this.$refs.formArea.queryOpt);
        },
        next: function () {
            this.$refs.shift.rotate();
        }
    },
    created: function () {
        for (var i = 0, len = 33; i < len; i++) {
            this.dropMenuOpt.push({
                text: 'test-' + i,
                name: 'name-' + i,
                size: 'size-' + i,
                en: 'en-' + i,
                value: i
            });
        }
    },
    mounted: function () {
        var _this = this;
        setTimeout(function () {
            _this.dropMenuOpt = _this.dropMenuOpt.concat([{
                    value: 4,
                    text: 'test4'
                }, {
                    value: 5,
                    text: 'test5'
                }, {
                    value: 6,
                    text: 'test6'
                }]);
            _this.initVal = ['2', '4'];
        }, 3000);
    }
};
//# sourceMappingURL=total.js.map