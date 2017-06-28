/**
 * modal api
 */

export default {
  methods: {
    /**
     * 点击 Full 的导航按钮
     */
    clickFullNav() {
      if (this.commit) {
        this.no()
      } else {
        this.hide()
      }
    },

    /**
     * 显示pop
     *
     * @param {Number} - 当前页码
     * @return {Object}
     */
    show() {
      this.modalDisplay = true
      this.$refs.pop.show()

      return this
    },

    /**
     * 隐藏pop
     *
     * @return {Object}
     */
    hide() {
      this.$refs.pop.hide({
        cb: () => {
          this.modalDisplay = false
          this.isMousedown = false
        }
      })

      return this
    },

    /**
     * 鼠标mouseDown 弹窗头部触发的事件
     *
     * @return {Object}
     */
    mouseDown(event) {
      this.isMousedown = true

      this.pointStart = {
        x: event.clientX,
        y: event.clientY
      }

      return this
    },

    /**
     * 鼠标mouseMove 弹窗头部触发的事件
     *
     * @return {Object, Boolean}
     */
    mouseMove(event) {
      event.preventDefault()

      if (!this.isMousedown) {
        return false
      }

      let $this = this.$el.querySelector('.' + this.xclass('pop'))
      let styleHub = getComputedStyle($this)
      let top = parseFloat(styleHub.top, 10)
      let left = parseFloat(styleHub.left, 10)

      this.$refs.pop.position({
        top: top + event.clientY - this.pointStart.y,
        left: left + event.clientX - this.pointStart.x
      })

      this.pointStart = {
        x: event.clientX,
        y: event.clientY
      }

      return this
    },

    /**
     * 鼠标mouseUp 弹窗头部触发的事件
     *
     * @return {Object, Boolean}
     */
    mouseUp(event) {
      event.preventDefault()

      if (!this.isMousedown) {
        return false
      }

      this.isMousedown = false

      return this
    },

    /**
     * 弹窗点击确定触发的函数
     *
     * @return {Object}
     */
    ok() {
      if (this.okCb) {
        this.okCb(this)

        return this.$emit('ok')
      }

      this.hide()
    },

    /**
     * 弹窗点击取消触发的函数
     *
     * @return {Object}
     */
    no() {
      if (this.noCb) {
        this.noCb(this)

        return this.$emit('no')
      }

      this.hide()
    },

    /**
     * 获取 / 设置 弹窗的title名
     *
     * @return {Object, Boolean}
     */
    title(text) {
      if (text === '' || text) {
        this.modalHeader = text
      }

      return this
    },

    /**
     * alert, confirm 弹窗的文字信息
     *
     * @param {String} - 需要设置的值
     * @return {Object, String}
     */
    info(text) {
      if (text === '' || text) {
        this.modalMessage = text
      }

      return this
    },

    /**
     * 设置各个组件的配置数据
     *
     * @param {Object} opt - 选项
     *                       {Function} okCb - 点击的回调函数
     *                       {Function} noCb - 取消的回调函数
     *                       {String} title - 模态框标题
     *                       {Function} message - 需要展示的信息
     */
    set({
      okCb,
      noCb,
      title = '',
      message = ''
    } = {}) {
      this.okCb = okCb
      this.noCb = noCb
      this.modalHeader = title
      this.modalMessage = message

      return this
    }
  }
}