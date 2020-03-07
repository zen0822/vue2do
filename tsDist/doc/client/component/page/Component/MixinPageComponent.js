"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = __importDefault(require("vue"));
var type_json_1 = __importDefault(require("../../../vuex/module/common/type.json"));
var vue_class_component_1 = __importDefault(require("vue-class-component"));
var vuex_class_1 = require("vuex-class");
var util_1 = require("@vue2do/component/util");
vuex_class_1.namespace('../../../vuex/store');
var testOpt = [];
for (var i = 0; i < 33; i++) {
    testOpt.push({
        text: 'test-' + i,
        name: 'name-' + i,
        size: 'size-' + i,
        en: 'en-' + i,
        value: i
    });
}
var MixinPageComponent = /** @class */ (function (_super) {
    __extends(MixinPageComponent, _super);
    function MixinPageComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MixinPageComponent.prototype, "varPrefix", {
        get: function () {
            return 'VUE2DO';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MixinPageComponent.prototype, "testOpt", {
        get: function () {
            return testOpt;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MixinPageComponent.prototype, "appContent", {
        get: function () {
            return this.getterAppContent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MixinPageComponent.prototype, "compStage", {
        get: function () {
            return this.getterCompStage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MixinPageComponent.prototype, "typeUI", {
        get: function () {
            return this.getterTypeUI;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MixinPageComponent.prototype, "typeTheme", {
        get: function () {
            return this.getterTypeTheme;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MixinPageComponent.prototype, "deviceSize", {
        get: function () {
            return this.getterDeviceSize;
        },
        enumerable: true,
        configurable: true
    });
    MixinPageComponent.prototype.anchorLink = function (name) {
        return this.$route.path + '#' + name;
    };
    MixinPageComponent.prototype.goAnchor = function (evt) {
        var anchor = evt.currentTarget;
        if (this.compStage) {
            this.compStage.scrollTop = anchor.offsetTop;
        }
    };
    MixinPageComponent.prototype.mounted = function () {
        var _this = this;
        var updateDeviceSize = function () {
            var deviceSizeEle = document.querySelector('.z-css-device-size');
            var deviceType = '';
            if (deviceSizeEle) {
                deviceType = getComputedStyle(deviceSizeEle, ':after').getPropertyValue('content');
                _this.$store.dispatch(type_json_1.default.deviceSize, deviceType);
            }
        };
        window.addEventListener('resize', util_1.debounce(updateDeviceSize, 100));
        updateDeviceSize();
    };
    __decorate([
        vuex_class_1.Getter(type_json_1.default.appContent.get)
    ], MixinPageComponent.prototype, "getterAppContent", void 0);
    __decorate([
        vuex_class_1.Getter(type_json_1.default.compStage.get)
    ], MixinPageComponent.prototype, "getterCompStage", void 0);
    __decorate([
        vuex_class_1.Getter(type_json_1.default.typeUI.get)
    ], MixinPageComponent.prototype, "getterTypeUI", void 0);
    __decorate([
        vuex_class_1.Getter(type_json_1.default.typeTheme.get)
    ], MixinPageComponent.prototype, "getterTypeTheme", void 0);
    __decorate([
        vuex_class_1.Getter(type_json_1.default.deviceSize)
    ], MixinPageComponent.prototype, "getterDeviceSize", void 0);
    MixinPageComponent = __decorate([
        vue_class_component_1.default
    ], MixinPageComponent);
    return MixinPageComponent;
}(vue_1.default));
exports.default = MixinPageComponent;
//# sourceMappingURL=MixinPageComponent.js.map