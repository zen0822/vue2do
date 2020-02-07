/**
 * 配置的处理文件
 */

import Vue from 'vue'
import VueI18n from 'vue-i18n'

const set = {
  /**
   * 设置组件内置的语言
   *
   * @param {string} lang - 返回设置过后的 i18n 对象
   */
  lang(langConfig) {
    Vue.use(VueI18n)

    const lang = Object.keys(langConfig)[0]

    const i18n = new VueI18n({
      locale: lang,
      messages: langConfig
    })

    return i18n
  }
}

export {
  set
}
