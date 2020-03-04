"use strict";
/**
 * input.render.js
 */
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(h) {
    var _a, _b, _c, _d;
    var _this = this;
    var children = [];
    var editBoxChild = [];
    var wrapChildren = [];
    editBoxChild.push(h('motion-fade', {
        props: {
            speed: 'fast'
        },
        ref: 'palceholder'
    }, [
        h('div', {
            class: [
                this.xclass('edit-box-placeholder')
            ],
            style: {
                display: this.placeholderStartedDisplay ? '' : 'none'
            }
        }, this.placeholder)
    ]));
    if (this.UIMaterial) {
        editBoxChild.push(h('div', {
            class: [
                this.xclass('edit-box-label'),
                (_a = {},
                    _a[this.xclass('edit-box-label-float')] = this.labelDisplay && this.labelFloatDisplay,
                    _a)
            ],
            directives: [{
                    name: 'show',
                    value: !!this.label
                }],
            on: {
                click: function () {
                    _this.$refs.input.focus();
                }
            }
        }, "" + this.label + (this.required ? ' *' : '')));
    }
    editBoxChild.push(h("" + (this.isTextarea || this.multiline ? 'textarea' : 'input'), {
        attrs: {
            readonly: this.readOnly,
            rows: this.isText ? 1 : this.row
        },
        class: [
            this.xclass('edit-box-input')
        ],
        domProps: {
            value: this.stateValue
        },
        directives: [{
                name: 'focus',
                value: this.focusing
            }],
        on: {
            focus: this._handlerFocus,
            blur: this._handlerBlur,
            keyup: this._handlerKeyup,
            input: this._handlerInput
        },
        ref: 'input'
    }));
    if (this.multiline) {
        editBoxChild.push(h('pre', {
            class: this.xclass('edit-box-pre')
        }, [h('span', {
                ref: 'pre'
            }, this.stateValue), h('br')]));
    }
    if (this.UIMaterial) {
        wrapChildren.push(h('div', {
            class: [
                this.xclass(['wrap-border-motion', 'wrap-border-motion-edit']),
                (_b = {},
                    _b[this.xclass('wrap-border-motion-active')] = this.editBorderActive,
                    _b)
            ]
        }), h('div', {
            class: [
                this.xclass(['wrap-border-motion', 'wrap-border-motion-error']),
                (_c = {},
                    _c[this.xclass('wrap-border-motion-active')] = this.errorTextDisplay,
                    _c)
            ]
        }));
    }
    wrapChildren.push(h('div', {
        class: [this.xclass('wrap-border')]
    }, [
        h('row', {
            props: {
                justify: 'justify',
                ui: this.ui,
                theme: this.theme
            }
        }, [
            h('column', {
                props: {
                    span: this.$slots.header ? this.headerSpan : 0,
                    ui: this.ui,
                    theme: this.theme
                }
            }, [
                h('div', {
                    class: this.xclass('edit-box-header')
                }, this.$slots.header)
            ]),
            h('column', {
                props: {
                    span: this.inputBoxCol,
                    ui: this.ui,
                    theme: this.theme
                }
            }, [
                h('div', {
                    class: [
                        this.xclass('edit-box'),
                        (_d = {},
                            _d[this.xclass('edit-box-multiline')] = this.multiline,
                            _d)
                    ]
                }, editBoxChild)
            ]),
            h('column', {
                props: {
                    span: this.$slots.footer ? this.footerSpan : 0,
                    ui: this.ui,
                    theme: this.theme
                }
            }, [
                h('div', {
                    class: this.xclass('edit-box-footer')
                }, this.$slots.footer)
            ])
        ])
    ]));
    children.push(h('div', {
        class: this.wrapClass
    }, wrapChildren));
    if (this.completion) {
        children.push(h('div', {
            class: [this.xclass('completion')],
            directives: [{
                    name: 'show',
                    value: this.completion
                }]
        }, this.$slots.completion));
    }
    if (!this.number && this.max && this.textLengthTip) {
        children.push(h('div', {
            class: [this.xclass('limit-txt')]
        }, [
            h('span', this.inputTextLength + " / " + this.max)
        ]));
    }
    children.push(h('div', {
        class: [this.xclass('tip')]
    }, [
        h('motion-fade', {
            props: {
                speed: 'fast'
            },
            ref: 'helperTip'
        }, [
            h('div', {
                class: [this.xclass('tip-helper')]
            }, this.helperText)
        ]),
        h('motion-fade', {
            props: {
                speed: 'fast'
            },
            ref: 'verifiedHint'
        }, [
            h('div', {
                class: [this.xclass('tip-error')]
            }, this.verifiedHint)
        ])
    ]));
    return h('div', {
        class: this.stageClass,
        directives: [{
                name: 'show',
                value: !this.hidden
            }]
    }, children);
}
exports.default = default_1;
//# sourceMappingURL=Input.render.js.map