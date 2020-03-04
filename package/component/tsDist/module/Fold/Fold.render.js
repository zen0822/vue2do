"use strict";
/**
 * fold.render.js
 */
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(h) {
    var _this = this;
    var foldChildren = [];
    if (this.foldChildren.length > 0) {
        this.foldChildren.forEach(function (item, index) {
            var _a;
            var contentIndex = index + 1;
            var foldTitle = [];
            var slotEle = item.content;
            if (slotEle) {
                foldTitle.push(h('icon', {
                    class: [_this.xclass('icon'), (_a = {},
                            _a[_this.xclass('icon-fold')] = _this.foldContentActive(contentIndex),
                            _a)],
                    props: {
                        kind: 'arrow-north',
                        size: 'xs',
                        ui: _this.ui,
                        theme: _this.theme
                    }
                }));
                if (slotEle[0].data.attrs) {
                    foldTitle.push(slotEle[0].data.attrs.title);
                }
                else {
                    foldTitle.push(item.title);
                }
            }
            else {
                foldTitle.push(item.title);
            }
            foldChildren.push(h('dt', {
                class: [_this.xclass('dt'), _this.foldContentActive(contentIndex)],
                on: {
                    click: function (event) {
                        if (slotEle) {
                            return _this.clickTitle(event, contentIndex);
                        }
                        return false;
                    }
                }
            }, foldTitle));
            slotEle && foldChildren.push(h('dd', {
                class: [_this.xclass('dd'), _this.foldContentActive(contentIndex)]
            }, [
                h('motion-fold', {
                    height: _this.transitionChildHeight,
                    ref: "transition" + contentIndex
                }, [
                    h('div', {
                        class: [_this.xclass('transition')],
                        css: false,
                        style: _this.foldData[index].style
                    }, slotEle)
                ])
            ]));
        });
    }
    return h('div', {
        class: [this.cPrefix, this.xclass(this.themeClass), this.xclass(this.uiClass)]
    }, [
        h('dl', {
            class: [this.xclass('dl')]
        }, foldChildren)
    ]);
}
exports.default = default_1;
//# sourceMappingURL=Fold.render.js.map