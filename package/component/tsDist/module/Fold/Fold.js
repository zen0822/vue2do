"use strict";
/**
 * fold 组件
 *
 * @prop initOpt - 折叠版的初始化数据
 * @prop initIndex - 当前展开的折叠板
 * @prop spreadAll - 展开全部
 * @prop only - 开启一次只能展开一个面板功能
 * @prop type - 布局类型
 *
 * @event ready - 组件加载完成的事件
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = __importDefault(require("vue"));
require("./Fold.scss");
var Fold_render_js_1 = __importDefault(require("./Fold.render.js"));
var base_1 = __importDefault(require("../../mixin/base"));
var Icon_1 = __importDefault(require("../Icon/Icon"));
var MotionFold_1 = __importDefault(require("../MotionFold/MotionFold"));
var Fold = {
    name: 'Fold',
    mixins: [base_1.default],
    render: Fold_render_js_1.default,
    components: {
        icon: Icon_1.default,
        'motion-fold': MotionFold_1.default
    },
    props: {
        initIndex: Number,
        initOpt: {
            type: Array,
            default: function () { return []; }
        },
        spreadAll: {
            type: Boolean,
            default: false
        },
        only: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: 'horizontal'
        }
    },
    data: function () {
        return {
            foldChildren: [],
            currentIndex: 1,
            preIndex: 1,
            foldData: [],
            transitionChildHeight: 0 // 过渡动画的元素高度
        };
    },
    computed: {
        cPrefix: function () {
            return this.compPrefix + "-fold";
        }
    },
    watch: {
        initIndex: function (val) {
            this.currentIndex = val;
        },
        spreadAll: function () {
            this._initFold();
        },
        only: function () {
            this._initFold();
        }
    },
    methods: {
        _initFold: function () {
            var _this = this;
            var foldChildren = [];
            var foldData = [];
            this.$slotKey.forEach(function (item) {
                if (item === 'default') {
                    return false;
                }
                var contentIndex = Number(item.split('-')[1]) - 1;
                if (foldChildren[contentIndex] === undefined) {
                    foldChildren[contentIndex] = {};
                }
                if (/content-/.test(item)) {
                    foldChildren[contentIndex].content = _this.$slots[item];
                }
                else if (/title-/.test(item)) {
                    foldChildren[contentIndex].title = _this.$slots[item];
                }
            });
            foldChildren.forEach(function (item, index) {
                if (_this.only) {
                    if (_this.initIndex) {
                        foldData[index] = {
                            folding: index !== _this.initIndex - 1
                        };
                    }
                    else {
                        foldData[index] = {
                            folding: true
                        };
                    }
                }
                else {
                    if (_this.spreadAll) {
                        foldData[index] = {
                            folding: false
                        };
                    }
                    else if (_this.initIndex) {
                        foldData[index] = {
                            folding: index !== _this.initIndex - 1
                        };
                    }
                    else {
                        foldData[index] = {
                            folding: true
                        };
                    }
                }
                _this.$nextTick(function () { return _this.switch(index + 1, foldData[index].folding); });
            });
            this.foldChildren = foldChildren;
            this.foldData = foldData;
            this.$nextTick(function () { return _this.$emit('ready', {
                emitter: _this
            }); });
        },
        clickTitle: function (evt, currentIndex) {
            evt.stopPropagation();
            var currentData = this.foldData[currentIndex - 1];
            var folding = currentData.folding;
            if (this.currentIndex !== currentIndex) {
                this.preIndex = this.currentIndex;
                this.currentIndex = currentIndex;
            }
            if (!currentData) {
                return false;
            }
            if (this.only) {
                this.switch(this.preIndex);
                vue_1.default.set(this.foldData, this.preIndex - 1, Object.assign(this.foldData[this.preIndex - 1], {
                    folding: true
                }));
            }
            this.switch(this.currentIndex, !folding);
            vue_1.default.set(this.foldData, currentIndex - 1, Object.assign(currentData, {
                folding: !folding
            }));
        },
        /**
         *
         * @param {Number} currentIndex - 折叠的序号
         * @param {Boolean} fold - true 为折叠 false 为展开
         */
        switch: function (currentIndex, fold) {
            if (fold === void 0) { fold = true; }
            var $transition = this.$refs["transition" + currentIndex];
            if (!$transition) {
                return false;
            }
            $transition.$el.style.height = '';
            $transition.$el.style.width = '';
            var transitionHeight = this.elementProp($transition.$el).offsetHeight;
            $transition.setHeight(transitionHeight);
            if (fold) {
                return $transition.leave();
            }
            else {
                return $transition.enter();
            }
        },
        foldTitleIcon: function (contentIndex) {
            return this.foldData[contentIndex - 1].folding ? 'fold' : 'spread';
        },
        foldContentActive: function (contentIndex) {
            return this.foldData[contentIndex - 1].folding ? this.cPrefix + "-folding" : '';
        }
    },
    created: function () {
        this._initFold();
    }
};
exports.default = Fold;
//# sourceMappingURL=Fold.js.map