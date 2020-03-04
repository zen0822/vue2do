"use strict";
/**
 * col.render.js
 */
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(h) {
    var _this = this;
    var classOpt = [this.cPrefix];
    var deviceType = ['xs', 's', 'm', 'l', 'xl', 'span'];
    if (this.pull > 0) {
        classOpt.push(this.cPrefix + "-pull-" + this.pull);
    }
    if (this.push > 0) {
        classOpt.push(this.cPrefix + "-push-" + this.push);
    }
    if (this.offset > 0) {
        classOpt.push(this.cPrefix + "-offset-" + this.offset);
    }
    if (!this.grid) {
        deviceType.forEach(function (item) {
            if (_this[item] > 0) {
                classOpt.push(_this.cPrefix + "-" + item + "-" + _this[item]);
            }
        });
    }
    else {
        deviceType.forEach(function (item) {
            if (_this[item] > 0) {
                classOpt.push(_this.cPrefix + "-" + item + "-" + _this[item]);
            }
            else if (_this.grid[item] > 0) {
                classOpt.push(_this.cPrefix + "-" + item + "-" + _this.grid[item]);
            }
        });
    }
    return h('div', {
        class: classOpt,
        style: this.compStyle
    }, this.$slots.default);
}
exports.default = default_1;
//# sourceMappingURL=Col.render.js.map