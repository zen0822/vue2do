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

      return this.$nextTick(() => {
        this.$refs.fadeTransition.enter()
        this.$refs.pop.show()

        return this
      })
    },

    /**
     * 隐藏pop
     *
     * @return {Object}
     */
    hide() {
      this.$refs.fadeTransition.leave()

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

      this.$refs.pop.computePosition()

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
      this.$emit('ok')

      if (this.okCbFun) {
        if (typeof this.okCbFun === 'function') {
          this.okCbFun(this)
        }

        return this
      }

      return this.hide()
    },

    /**
     * 弹窗点击取消触发的函数
     *
     * @return {Object}
     */
    no() {
      this.$emit('no')

      if (this.noCbFun) {
        if (typeof this.noCbFun === 'function') {
          this.noCbFun(this)
        }

        return this
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
        this.stateHeader = text
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
        this.stateMessage = text
      }

      return this
    },

    /**
     * 设置各个组件的配置数据
     *
     * @param {Object} opt - 选项
     *                       {Function} okCb - 点击的回调函数
     *                       {Function} noCb - 取消的回调函数
     *                       {Function} showCb - 显示之后的回调函数
     *                       {Function} hideCb - 隐藏之后的回调函数
     *                       {String} title - 模态框标题
     *                       {Function} message - 需要展示的信息
     */
    set({
      okCb,
      noCb,
      showCb,
      hideCb,
      title = '',
      message = '',
      ui = this.ui,
      theme = this.theme
    } = {}) {
      this.okCbFun = okCb
      this.noCbFun = noCb
      this.showCb = showCb
      this.hideCb = hideCb
      this.stateHeader = title
      this.stateMessage = message

      this.stateUI = ui
      this.stateTheme = theme

      return this
    }
  }
}
