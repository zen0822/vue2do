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
var vue_class_component_1 = __importDefault(require("vue-class-component"));
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
    Object.defineProperty(MixinPageComponent.prototype, "testOpt", {
        get: function () {
            return testOpt;
        },
        enumerable: true,
        configurable: true
    });
    MixinPageComponent = __decorate([
        vue_class_component_1.default
    ], MixinPageComponent);
    return MixinPageComponent;
}(vue_1.default));
exports.default = MixinPageComponent;
//# sourceMappingURL=MixinPageComponent.js.map