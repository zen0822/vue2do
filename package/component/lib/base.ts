/**
 * base 混入
 *
 * @prop id - 用户定义的唯一标识符
 * @prop name - 用户定义的实例名字
 * @prop theme - 主题 (primary | success | warning | danger | orange | blue | light | dark)
 * @prop ui - ui 规范 (material | bootstrap | metro |apple)
 */

import compConfig from '../config/index.json'
import commonStore from '../vuex/module/common/type.json'
import store from '../vuex/store'

import {
  computed,
  Ref,
  isRef
} from '@vue/composition-api'

const props = {
  id: [String, Number],
  name: {
    type: String,
    default: ''
  },
  theme: {
    type: String,
    default: compConfig.defaultTheme,
    validator(val: string): boolean {
      return [
        'primary', 'grey', 'warning', 'success',
        'danger', 'blue', 'orange', 'light', 'dark', 'white', 'black'
      ].includes(val)
    }
  },
  ui: {
    type: String,
    default: compConfig.defaultUI,
    validator(val: string): boolean {
      return ['material', 'bootstrap', 'metro', 'apple', 'pure'].includes(val)
    }
  }
}

// computed
const uiClass = (ui: string | Ref<string>): Ref<string> => {
  const uiStr = isRef(ui) ? ui.value : ui

  return computed(() => uiStr ? `ui-${uiStr}` : '')
}
const themeClass = (theme: string | Ref<string>): Ref<string> => {
  const themeStr = isRef(theme) ? theme.value : theme

  return computed(() => themeStr ? `theme-${themeStr}` : '')
}
const compClass = (uiClass: Ref<string>, themeClass: Ref<string>): Ref<readonly string[]> => (
  computed(() => [uiClass.value, themeClass.value])
)
const compPrefix = compConfig.prefix
// const deviceSize = (store: any): Ref<any> => store.getters[commonStore.deviceSize]
const deviceSize = computed<string>(() => store.getters[commonStore.deviceSize])
const css4 = window.CSS && window.CSS.supports && window.CSS.supports('--a', '0')

// methods
const xclass = (cPrefix: string, className?: string | string[]): string => {
  if (Array.isArray(className)) {
    const classArr = className.map((item) => {
      return `${cPrefix}-${item}`
    })

    return classArr.join(' ')
  } else if (className === '' || className === undefined) {
    return cPrefix
  } else {
    return `${cPrefix}-${className}`
  }
}

export {
  compClass,
  compPrefix,
  css4,
  deviceSize,
  props as baseProps,
  xclass,
  uiClass,
  themeClass
}
