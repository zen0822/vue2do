"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var test_utils_1 = require("@vue/test-utils");
var App_1 = __importDefault(require("../App"));
var chai_1 = require("chai");
describe('/app/mock/App', function () {
    it('renders <LayoutHeader /> when passed', function () {
        var wrapper = test_utils_1.shallowMount(App_1.default);
        chai_1.expect(!!wrapper.vm.$refs.headerRef).to.be.equal(true);
    });
});
//# sourceMappingURL=App.test.js.map