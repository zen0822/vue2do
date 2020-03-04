"use strict";
/**
 * nav.render.js
 */
Object.defineProperty(exports, "__esModule", { value: true });
function foldContent(h, foldList) {
    var _this = this;
    if (!Array.isArray(foldList) || foldList.length === 0) {
        return false;
    }
    var foldChildren = [];
    foldList.forEach(function (item, index) {
        var subNav = item.sub;
        var flodNum = index + 1;
        var contentChildren = [];
        if (Array.isArray(subNav) && subNav.length > 0) {
            contentChildren = foldContent.call(_this, h, subNav);
            foldChildren.push(h('fold-title', {
                props: {
                    ui: _this.ui,
                    theme: _this.theme
                },
                slot: 'title-' + flodNum
            }, item.name));
            foldChildren.push(h('fold-content', {
                props: {
                    ui: _this.ui,
                    theme: _this.theme
                },
                slot: 'content-' + flodNum
            }, [contentChildren]));
        }
        else {
            foldChildren.push(h('fold-title', {
                props: {
                    ui: _this.ui,
                    theme: _this.theme
                },
                slot: 'title-' + flodNum
            }, [
                h('router-link', {
                    props: {
                        to: item.route
                    },
                    nativeOn: {
                        click: function () {
                            if (_this.isSmallDevice) {
                                _this.hide();
                            }
                        }
                    }
                }, item.name)
            ]));
        }
    });
    return h('fold', {
        class: [this.xclass('sub-fold')],
        props: {
            only: this.isSmallDevice ? true : this.only,
            spreadAll: this.isSmallDevice ? false : this.spreadAll,
            ui: this.ui,
            theme: this.theme
        },
        ref: 'fold'
    }, foldChildren);
}
function default_1(h) {
    var _a, _b, _c;
    var navStage = [];
    var contentEle = h('div', {
        class: [this.xclass('motion-content')],
        ref: 'motionContent'
    }, [
        h('div', {
            class: [
                this.xclass('close-nav')
            ],
            on: {
                click: this.hide
            }
        }, [
            h('icon', {
                props: {
                    kind: 'close',
                    size: 'xs',
                    ui: this.ui,
                    theme: this.theme
                }
            })
        ]),
        this.$slots.start,
        foldContent.call(this, h, this.initOpt),
        this.$slots.end
    ]);
    if (this.isVerticalType) {
        navStage.push(h('motion-fold', {
            ref: 'motion'
        }, [
            h('div', {
                class: [
                    this.xclass('stage'),
                    this.xclass("animate-" + this.navAnimate)
                ]
            }, [contentEle])
        ]));
    }
    else {
        navStage.push(h('motion-slide', {
            props: {
                direction: 'east',
                global: true,
                offset: 0
            },
            ref: 'motion'
        }, [
            h('div', {
                class: [
                    this.xclass('stage'),
                    this.xclass("animate-" + this.navAnimate)
                ]
            }, [
                contentEle,
                h('div', {
                    class: [this.xclass('motion-empty')],
                    on: {
                        click: this.hide
                    }
                })
            ])
        ]));
    }
    return h('div', {
        class: [
            this.cPrefix,
            this.xclass(this.themeClass),
            (_a = {},
                _a[this.xclass('device-s')] = this.isSmallDevice,
                _a)
        ]
    }, [
        h('div', {
            class: [
                this.xclass('trigger'),
                (_b = {},
                    _b[this.xclass('active')] = this.isActive,
                    _b)
            ],
            directives: [{
                    name: 'show',
                    value: this.trigger === 'show'
                }],
            on: {
                click: this.toggle
            }
        }, [
            h('row', [
                h('column', {
                    props: {
                        span: 6
                    }
                }, this.title),
                h('column', {
                    class: [this.xclass('arrow')],
                    props: {
                        span: 6
                    }
                }, [
                    h('icon', {
                        class: [this.xclass('arrow-fold'), (_c = {},
                                _c[this.xclass('arrow-spread')] = this.isActive,
                                _c)],
                        props: {
                            kind: 'arrow-south',
                            size: 's',
                            ui: this.ui,
                            theme: this.theme
                        }
                    })
                ])
            ])
        ]),
        navStage
    ]);
}
exports.default = default_1;
//# sourceMappingURL=Nav.render.js.map