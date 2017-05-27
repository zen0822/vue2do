/**
 * table-col 组件
 *
 * @prop align - 文字对齐类型
 * @prop omit - 文字不还换，启用省略模式
 * @prop th - 是否是 th
 * @prop minWidth - 最小宽度
 * @prop width - 宽度
 * @prop maxWidth - 最大宽度
 *
 */

import baseMixin from '../../../mixin/base'
import { findGrandpa } from '../../../util/util'

const COL_PADDING_BORDER_LENGTH = 22

const tableColComp = {
  name: 'table-col',
  mixins: [baseMixin],
  props: {
    align: {
      type: String,
      default: 'left'
    },
    omit: {
      type: Boolean,
      default: false
    },
    th: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: String,
      default: ''
    },
    minWidth: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      colWidth: '',
      table: 0
    }
  },
  computed: {
    cPrefix() {
      return `${this.compPrefix}-table-col`
    },
    tableWidth() {
      return this.table.tableWidth
    },
    colBodyStyle() {
      return {
        width: this.widthTypeStyle(this.width),
        'max-width': this.widthTypeStyle(this.maxWidth),
        'min-width': this.widthTypeStyle(this.minWidth)
      }
    }
  },
  render(h) {
    return h(
      this.th ? 'th' : 'td',
      {
        class: [
          this.cPrefix,
          this.prefixClass('text-' + this.align)
        ]
      },
      [
        h('div', {
          class: [{
            [`${this.prefixClass('text-omit')}`]: this.omit
          }],
          style: this.colBodyStyle
        }, this.$slots.default)
      ]
    )
  },
  methods: {
    widthTypeStyle(width) {
      if (!this.colWidth || width === '') {
        return ''
      }

      // 最终的宽度
      let w = ''
      let colBodyWidth = 0
      let colContentWidth = 0
      let widthNum = parseFloat(width)

      colBodyWidth = width.indexOf('%') ? `${this.tableWidth * widthNum * 0.01 - COL_PADDING_BORDER_LENGTH}` : widthNum
      colContentWidth = this.$el.offsetWidth - COL_PADDING_BORDER_LENGTH

      // TODO: 当父元素 td 的宽度大于内容宽度时，宽度要设置成 auto
      w = colContentWidth > colBodyWidth ? colContentWidth : colBodyWidth

      return colBodyWidth + 'px'
    }
  },
  beforeMount() {
    this.table = findGrandpa(this.$parent, 'table')
  },
  mounted() {
    this.$nextTick(() => {
      this.colWidth = this.$el.offsetWidth
    })
  }
}

export default tableColComp
