/**
 * omit 省略组件
 *
 * @prop line - 多行省略规定的行数，默认是 1 行
 */

import './Omit.scss'

import render from './Omit.render.js'
import baseMixin from '../../mixin/base'

export default {
  name: 'Omit',

  mixins: [baseMixin],

  render,

  props: {
    line: {
      type: Number,
      default: 1
    }
  },

  data() {
    this.fontWidthHub = {} // 存储字体的宽度

    return {
      content: '',
      lineText: [] // 存储原文本处理后每行存储的文本
    }
  },

  computed: {
    cPrefix() { // 组件类名的前缀
      return `${this.compPrefix}-omit`
    }
  },

  methods: {
    textWidth(text) {
      if (text === ' ') {
        return 4
      }

      if (this.fontWidthHub[text] !== undefined) {
        return this.fontWidthHub[text]
      }

      const span = this.$refs.font
      let width = 0

      if (typeof span.textContent !== 'undefined') {
        span.textContent = text
      } else {
        span.innerText = text
      }

      width = span.offsetWidth

      if (this.isDoubleByte(text)) {
        this.fontWidthHub = {
          ...this.fontWidthHub,
          doubleByte: width
        }
      } else {
        this.fontWidthHub = {
          ...this.fontWidthHub,
          [text]: width
        }
      }

      return width
    },

    // 匹配汉字
    isDoubleByte(text) {
      const regex = /[^\u4e00-\u9fa5]/

      if (regex.test(text)) {
        return true
      }

      return false
    },

    splite(content) {
      this.content = content

      const contentArray = content.split('')
      const contentArrayLength = contentArray.length

      let index = 0
      const lineFont = []

      for (let i = 0, lineLength = this.line; i < lineLength; i++) {
        if (contentArray[index] === undefined) {
          break
        }

        let lineWidth = 0 // 这一行的宽度
        let j = index
        let char = ''
        let lastFontWidthOver = false // 最后一行的文字宽度是否小于容器宽度

        for (; j < contentArrayLength; j++) {
          const fontWidth = this.textWidth(contentArray[j])

          if (contentArray[j] === undefined || (fontWidth + lineWidth) >= this.boxWidth) {
            // 最后一行并且文字总宽度大于容器宽度时
            lastFontWidthOver = i === lineLength - 1 && (fontWidth + lineWidth) >= this.boxWidth

            break
          }

          lineWidth = lineWidth + fontWidth
          char = char + contentArray[j]
        }

        lineFont.push((lastFontWidthOver && i === lineLength - 1) ? (char + '....') : char)

        index = j
      }

      this.lineText = lineFont
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.boxWidth = this.$el.offsetWidth - 1
      this.splite(this.$slots.default[0].text)
    })
  },

  beforeUpdate() {
    if (this.$slots.default[0].text !== this.content) {
      this.$nextTick(() => {
        this.boxWidth = this.$el.offsetWidth - 1
        this.splite(this.$slots.default[0].text)
      })
    }
  }
}
