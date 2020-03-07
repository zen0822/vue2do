"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./Component.scss");
var Component_pug_1 = __importDefault(require("./Component.pug"));
var menuOpt_json_1 = __importDefault(require("./menuOpt.json"));
var mixin_1 = __importDefault(require("./mixin"));
var type_json_1 = __importDefault(require("../../../vuex/module/common/type.json"));
var alert_1 = __importDefault(require("@vue2do/component/module/Modal/alert"));
exports.default = {
    name: 'PageComponent',
    template: Component_pug_1.default(),
    mixins: [mixin_1.default],
    beforeRouteEnter: function (to, from, next) {
        next(function (vm) {
            vm.$nextTick(function () {
                vm.goAnchor(to.hash.replace('#', ''));
            });
        });
    },
    data: function () {
        return {
            menuOpt: menuOpt_json_1.default,
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
        componentStyle: function () {
            if (!this.appContent || this.deviceSize === 'xs') {
                return {
                    height: ''
                };
            }
            return {
                height: this.appContent.offsetHeight + 'px'
            };
        }
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
            alert_1.default("\u63D0\u4EA4\u7684\u6570\u636E\uFF1A" + this.$refs.formArea.queryOpt);
        },
        next: function () {
            this.$refs.shift.rotate();
        },
        goAnchor: function (hash) {
            if (!hash) {
                return false;
            }
            var anchor = document.getElementById(hash);
            anchor && (this.compStage.scrollTop = anchor.offsetTop);
        },
        afterEnter: function () {
            return this.goAnchor(this.$route.hash.replace('#', ''));
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
    beforeMount: function () {
        var localStorageTheme = window.localStorage.getItem(this.varPrefix + "_THEME");
        var localStorageUI = window.localStorage.getItem(this.varPrefix + "_UI");
        if (localStorageTheme) {
            this.$store.dispatch(type_json_1.default.typeTheme.add, localStorageTheme);
        }
        else {
            this.$store.dispatch(type_json_1.default.typeTheme.add, 'primary');
            window.localStorage.setItem(this.varPrefix + "_THEME", 'primary');
        }
        if (localStorageUI) {
            this.$store.dispatch(type_json_1.default.typeUI.add, localStorageUI);
        }
        else {
            this.$store.dispatch(type_json_1.default.typeUI.add, 'material');
            window.localStorage.setItem(this.varPrefix + "_UI", 'material');
        }
    },
    mounted: function () {
        var _this = this;
        this.$refs.theme.$on('change', function (_a) {
            var value = _a.value;
            _this.$store.dispatch(type_json_1.default.typeTheme.add, value);
            window.localStorage.setItem(_this.varPrefix + "_THEME", value);
        });
        this.$refs.ui.$on('change', function (_a) {
            var value = _a.value;
            _this.$store.dispatch(type_json_1.default.typeUI.add, value);
            window.localStorage.setItem(_this.varPrefix + "_UI", value);
        });
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
        this.$nextTick(function () {
            _this.$store.dispatch(type_json_1.default.compStage.add, _this.$refs.compStage);
        });
    }
};
//# sourceMappingURL=Component.js.map