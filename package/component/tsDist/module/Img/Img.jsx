"use strict";
/**
 * Img 组件
 *
 * @prop alt - 图片描述
 * @prop className - 图片样式
 * @prop contain - 图片全展示并且垂直水平居中
 * @prop width - 图片宽度
 * @prop height - 图片高度
 * @prop src - 图片地址
 * @prop theme - 主题
 * @prop title - 图片标题
 *
 * @event load - 图片加载完成
 * @event error - 图片加载失败
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var composition_api_1 = require("@vue/composition-api");
var base_1 = require("../../mixin/base");
base_1.css4 ? Promise.resolve().then(function () { return __importStar(require('./Img.var.scss')); }) : Promise.resolve().then(function () { return __importStar(require('./Img.scss')); });
exports.default = composition_api_1.defineComponent({
    name: 'Img',
    props: __assign(__assign({}, base_1.props), { alt: {
            default: '',
            type: String
        }, contain: {
            default: false,
            type: Boolean
        }, height: {
            default: '',
            type: [String, Number]
        }, src: {
            required: true,
            type: String
        }, width: {
            default: '',
            type: [String, Number]
        } }),
    setup: function (_a) {
        var contain = _a.contain, height = _a.height, width = _a.width;
        var imgState = composition_api_1.ref(1); // 1：图片加载前，2：图片加载成功，3：图片加载失败
        var _xclass = function (className) { return base_1.xclass(base_1.compPrefix + "-img", className); };
        var _width = composition_api_1.ref(Number.isNaN(Number(width))
            ? width
            : (width && width + "px"));
        var _height = composition_api_1.ref(Number.isNaN(Number(height))
            ? width
            : (height && height + "px"));
        var imageLoadSuccess = function (event) {
            var image = event.currentTarget;
            if (contain) {
                var widthHeightRate = image.width / image.height;
                if (widthHeightRate > 1) {
                    _width.value = '100%';
                    _height.value = 'auto';
                }
                if (widthHeightRate < 1) {
                    _width.value = 'auto';
                    _height.value = '100%';
                }
            }
            imgState.value = 2;
        };
        var imageLoadError = function () {
            imgState.value = 3;
        };
        return {
            _height: _height,
            _width: _width,
            imgState: imgState,
            imageLoadError: imageLoadError,
            imageLoadSuccess: imageLoadSuccess,
            xclass: _xclass
        };
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    render: function (h) {
        var _this = this;
        var _a = this, imgState = _a.imgState, _width = _a._width, _height = _a._height, xclass = _a.xclass, src = _a.src, alt = _a.alt, title = _a.title;
        var imgProps = {
            class: xclass('content'),
            alt: alt,
            title: title
        };
        var imageBoxStyle = {
            width: _width,
            height: _height
        };
        return (<div style={imageBoxStyle} class={xclass()} ref='me'>
        {imgState === 1 && (<div class={xclass('skeleton')} style={__assign({}, imageBoxStyle)}/>)}

        <img {...imgProps} src={src} onLoad={function (event) { return _this.imageLoadSuccess(event); }} onError={function () { return _this.imageLoadError(); }} style={{
            display: imgState === 2 ? '' : 'none'
        }}/>

        {imgState === 3 && (<img {...imgProps} src={''}/>)}
      </div>);
    }
});
//# sourceMappingURL=Img.jsx.map