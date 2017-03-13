/**
 * 配置的处理文件
 */

import Vue from 'vue'
import VueI18n from 'vue-i18n'

const set = {
  lang(lang) {
    Vue.use(VueI18n)
    Vue.config.lang = lang.name
    Vue.locale(lang.name, lang)
  }
}

export {
  set
}
