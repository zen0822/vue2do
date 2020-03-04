"use strict";
/**
 * pop.render.js
 */
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(h) {
    return h('div', {
        class: [
            this.cPrefix,
            this.xclass([
                this.themeClass,
                'type-' + this.messageType,
                'align-' + this.stateAlign
            ])
        ],
        directives: [{
                name: 'show',
                value: this.messageDisplay
            }]
    }, [
        h('pop', {
            class: [this.xclass('pop')],
            props: {
                direction: this.direction,
                position: this.position,
                ui: this.ui,
                theme: this.theme
            },
            ref: 'pop'
        }, this.$slots.default ? this.$slots.default : this.stateMessage)
    ]);
}
exports.default = default_1;
//# sourceMappingURL=Message.render.js.map