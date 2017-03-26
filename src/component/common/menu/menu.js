/**
 * menu 组件
 *
 * @props initOpt - 菜单的数据
 * @props kind - 菜单的种类
 * @props trigger - 2，3 级菜单的触发模式
 * @props type - 布局类型
 *
 */

import './menu.scss'
import render from './menu.render.js'
import baseMixin from 'src/mixin/base'
import {
  foldComp,
  foldTitleComp,
  foldContentComp
} from 'src/component/base/fold/fold'
import iconComp from 'src/component/base/icon/icon'

const layoutType = ['grid', 'flex', 'flow']

export default {
  name: 'menu',

  mixins: [baseMixin],

  render,

  components: {
    'fold': foldComp,
    'fold-title': foldTitleComp,
    'fold-content': foldContentComp,
    icon: iconComp
  },

  props: {
    initOpt: Array,

    gap: {
      type: Number,
      default: 0
    },

    kind: {
      type: String,
      default: 'center'
    },

    wrap: {
      type: String,
      default: 'wrap'
    },

    type: {
      type: String,
      default: 'horizontal'
    }
  },

  data() {
    return {
      isStageActive: false
    }
  },

  computed: {
    // 组件类名的前缀
    cPrefix() {
      return `${this.compPrefix}-menu`
    }
  }
}
