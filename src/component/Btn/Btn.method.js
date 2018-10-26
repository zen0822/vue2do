/**
 * btn method
 *
 * @method closeLoading - 关闭按钮等待功能
 * @method openLoading - 开启按钮等待功能
 */

export default {
  methods: {
    /**
     * 开启按钮等待功能
     */
    openLoading() {
      if (!this.createdLoading) {
        this.createdLoading = true
        this._banBtn()
      }

      this.$nextTick(() => {
        this.$refs.loading.show()
      })
    },

    /**
     * 关闭按钮等待功能
     */
    closeLoading(state) {
      this._allowBtn()
      this.$refs.loading.hide()
    }
  }
}
