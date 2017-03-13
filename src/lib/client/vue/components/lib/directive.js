const Vue = require('vue');

const objectUtil = require('src/common/utils/object');

require('src/common/scss/common/plugin.scss');
require('src/common/lib/jquery.timepicker/index.css');
require('src/common/lib/jquery.timepicker/index.js');

require('src/common/lib/bootstrap.datetimepicker/index.css');
require('src/common/lib/bootstrap.datetimepicker/index.js');

Vue.directive('slot', {
  bind() {
    //TODO: this don`t work
    var host = this.vm;
    var root = host.$root;
    //vue 1.8.0+ $options._content is error
    var raw = host.$options._content;

    for (var i = 0; i < raw.children.length; i++) {
      var node = raw.children[i].cloneNode(true);
      this.el.appendChild(node);
      root.$compile(node, host, this._scope);
    }
  }
});

Vue.directive('focus', {
  priority: 1000,

  bind() {
    var self = this;
    this.bound = true;

    this.focus = function () {
      if (self.bound === true) {
        self.el.focus();
      }
    };

    this.blur = function () {
      if (self.bound === true) {
        self.el.blur();
      }
    };
  },

  update(value) {
    if (value) {
      Vue.nextTick(this.focus);
    } else {
      Vue.nextTick(this.blur);
    }
  },

  unbind() {
    this.bound = false;
  },
});

/**
 * bubble tip 指令
 *
 * @params { Object } opt
 *                    - { Boolean } bubble - 是否是自定义的bubble, true - 是自定义的bubble, false - 则是只显示字符串的 bubble
 *                    - { Number } parent - vm 指向的是第几个 $parent
 *                    - { String } text - bubble 的内容
 */
Vue.directive('bubble', {
  update(opt = {}) {
    var el = this.el;
    this.$el = $(this.el);
    var bubbleTip = {};

    var bubbleText = opt.text;

    if (!bubbleText && bubbleText !== 0) {
      return false;
    }

    if (opt.bubble) {
      var vmParent = this.vm;

      for (let i = 0, len = opt.parent; i < len; i++){
        vmParent = vmParent['$parent'];
      }

      bubbleTip = vmParent.$refs[opt.bubble];
    } else {
      bubbleTip = COMMON.router.app.$refs.commonComponent.$refs.bubbleTip;
    }

    this.$el.mouseover((event) => {
      if (bubbleText) {
        bubbleTip.info(bubbleText).show(event.target);
        return false;
      }
      bubbleTip.show(el);

      event.stopPropagation();
    });

    this.$el.mouseout((event) => {
      bubbleTip.hide();

      event.stopPropagation();
    });
  }
});
/**
 * timepicker 指令
 */
Vue.directive('timepicker', {
  update(opt = {}) {
    var el = this.el;
    var $el = $(el);
    var config = opt.config || {
      'timeFormat': 'H:i',
      'step': 1
    };
    if (objectUtil.isEmpty(opt)) {
      $el.timepicker(config);
    } else {
      $el.find('input').timepicker(config);
    }
  }
});

/**
 * bootstraps datetimepicker 指令
 */
Vue.directive('datetimepicker', {
  bind() {
    $.fn.datetimepicker.dates['zh'] = {
      days:       ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六","星期日"],
      daysShort:  ["日", "一", "二", "三", "四", "五", "六","日"],
      daysMin:    ["日", "一", "二", "三", "四", "五", "六","日"],
      months:     ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月","十二月"],
      monthsShort:  ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
      meridiem:    ["上午", "下午"],
      today:       "今天"
    };
  },
  update(opt = {}) {
    var el = this.el;
    var $el = $(el);

    var config = Object.assign({
      format: "yyyy-mm-dd hh:ii",
      autoclose: true,
      language: "zh"
    }, opt.config);
    if (opt.self) {
      $el.find('input').datetimepicker(config);
    } else {
      $el.datetimepicker(config);
    }
  }
});
