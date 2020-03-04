"use strict";
/**
 * icon.render.js
 */
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(h) {
    var iconChildren = [];
    if (this.isAli) {
        iconChildren.push(h('svg', {
            class: [this.xclass(this.kind), this.typeClass]
        }, [
            h('use', {
                attrs: {
                    'xlink:href': "#" + this.nameClass
                }
            })
        ]));
    }
    else {
        iconChildren.push(h('i', {
            class: [this.typeClass, this.nameClass, this.sizeClass]
        }));
    }
    return h('div', {
        class: [this.cPrefix, this.sizeClass, this.xclass(this.themeClass)],
        style: {
            color: this.color,
            'font-size': this.fontSize + "px"
        }
    }, [
        h('div', {
            class: this.xclass('stage')
        }, iconChildren)
    ]);
}
exports.default = default_1;
//# sourceMappingURL=Icon.render.js.map