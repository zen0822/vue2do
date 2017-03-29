import Vue from 'vue'
import focusDirective from './focus'
import bubbleDirective from './bubble'
import clickParentDirective from './clickParent'
import deviceSizeDirective from './deviceSize'

/**
 * 获取焦点指令
 */
Vue.directive('focus', focusDirective)

/**
 * bubble tip 指令
 *
 * @params { Object } opt
 *                    - { Boolean } bubble - 是否是自定义的bubble, true - 是自定义的bubble, false - 则是只显示字符串的 bubble
 *                    - { Number } parent - vm 指向的是第几个 $parent
 *                    - { String } text - bubble 的内容
 */
Vue.directive('bubble', bubbleDirective)

/**
 * 绑定元素的父元素的 click 事件
 */
Vue.directive('clickParent', clickParentDirective)

/**
 * 获取客户端的设备大小（xs, s, m, l, xl)
 */
Vue.directive('deviceSize', deviceSizeDirective)
