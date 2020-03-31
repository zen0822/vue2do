"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./Blog.scss");
var Blog_pug_1 = __importDefault(require("./Blog.pug"));
var mixin_1 = __importDefault(require("../Component/mixin"));
var blog_2019031101_html_1 = __importDefault(require("../../../asset/blog/blog-2019031101.html"));
exports.default = {
    name: 'PageBlog',
    template: Blog_pug_1.default(),
    mixins: [mixin_1.default],
    data: function () {
        return {
            articleId: this.$route.params.id,
            article2019031101: blog_2019031101_html_1.default
        };
    }
};
//# sourceMappingURL=Blog.js.map