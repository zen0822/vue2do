/**
 * btn 组件
 *
 * @prop disabled - 禁止点击
 * @prop block - 按钮的宽度是父元素的宽度, width: 100%
 * @prop link - 链接地址（type = text 的时候才生效链接）
 * @prop radius - 按钮边角得半径尺寸（none | S | M | L）
 * @prop size - 按钮大小（S | M | L）
 * @prop submit - 提交按钮
 * @prop type - 按钮类型 (button | text | float | outline)
 * @prop value - 按钮名字
 * @prop transparent - 当 outline 按钮时背景为透明
 *
 * @prop fontSize - 按钮字体大小
 * @prop fontColor - 按钮字体颜色
 * @prop color - 按钮颜色
 * @prop height - 按钮高度
 * @prop width - 按钮宽度
 *
 * @event click - 点击btn事件
 * @event keyEnter - focus 时敲击 Enter 键
 * @event focus
 * @event blur
 */

import '../../scss/common/main.scss'
import './Btn.scss'
import './Btn.material.scss'
import './Btn.bootstrap.scss'
import './Btn.pure.scss'

import {
  computed,
  defineComponent,
  ref,
  reactive,
  onUpdated,
  watchEffect
} from '@vue/composition-api'
import {
  offset as propOffset
} from '../../util/dom/prop'

import {
  compPrefix,
  baseProps,
  themeClass,
  uiClass,
  xclass
} from '../../lib/base'

// import formMixin from '../../mixin/form'

import Loading from '../Loading'
import MotionRip from '../MotionRip'
import { VNode } from 'vue'

const BTN_TYPE_BUTTON = 'button'
const SIZE_S = 'S'

export default defineComponent({
  name: 'Btn',

  // mixins: [baseMixin, formMixin, methodMixin],

  props: {
    ...baseProps,
    block: {
      type: Boolean,
      default: false
    },
    color: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    fontSize: {
      type: Number
    },
    fontColor: {
      type: String
    },
    height: {
      type: String
    },
    link: String,
    radius: {
      type: String,
      default: 's',
      validator: (val: 'none' | 's' | 'm' | 'l'): boolean => {
        const size = val.toLowerCase()

        return ['none', 's', 'm', 'l'].includes(size)
      }
    },
    size: {
      type: String,
      default: SIZE_S,
      validator: (val: 's' | 'm' | 'l'): boolean => {
        const size = val.toLowerCase()

        return ['s', 'm', 'l'].includes(size)
      }
    },
    submit: {
      type: Boolean,
      require: false
    },
    transparent: {
      default: false,
      type: Boolean
    },
    type: {
      type: String,
      default: BTN_TYPE_BUTTON,
      validator: (val: 'button' | 'float' | 'text' | 'outline'): boolean => {
        return ['button', 'float', 'text', 'outline'].includes(val)
      }
    },
    value: {
      type: String,
      require: true
    },
    width: {
      type: String
    }
  },

  setup(props, context) {
    const {
      block,
      color,
      disabled,
      fontSize,
      fontColor,
      height,
      link,
      radius,
      size,
      theme,
      transparent,
      type,
      ui,
      value,
      width
    } = props

    const _xclass = (className: string | string[]): string => xclass(`${compPrefix}-btn`, className)
    const cPrefix = `${compPrefix}-btn`
    const UIMaterial = ui === 'material'

    const transitionRef = ref<{ enter: any }>(null)
    const loadingRef = ref<any>(null)
    const stateDisabled = ref(disabled) // 按钮的禁用状态
    const allowFocus = ref(true) // 允许执行 focus 事件
    const btnValueDisplay = ref(false) // 按钮值显示状态
    const createdLoading = ref(false) // 是否已经创建了按钮的 loading 组件
    const focusing = ref(false) // 正在 focus 中
    const motion = ref(false) // 启动按钮的沦漪效果
    const mousePoi = reactive({ // 点击按钮的鼠标位置
      top: 0,
      left: 0,
      x: 0,
      y: 0
    })

    const isFloatBtn = computed(() => type === 'float')
    const btnClass = computed(() => {
      const className = [
        themeClass(theme).value,
        uiClass(ui).value,
        `size-${size.toLowerCase()}`,
        `radius-${radius.toLowerCase()}`,
        `type-${type}`
      ]

      if (transparent) {
        className.push('transparent')
      }

      return `${_xclass(className)}`
    })

    watchEffect(() => {
      stateDisabled.value = props.disabled
    })

    /**
     * click event
     */
    function _click(event: MouseEvent): void {
      if (stateDisabled.value) {
        return
      }

      return context.emit('click', {
        event
      })
    }

    function _handlerMouseup(event: MouseEvent): void | boolean {
      if (stateDisabled.value) {
        return false
      }

      allowFocus.value = true

      if (event.button === 0) {
        return _click(event)
      }
    }

    /**
     * TODO: 当 IE <= 11 时，html 设置了 margin pageX 没把 margin 值算进去
     */
    function _handlerMousedown(event: MouseEvent): void {
      // if (inTouch.value) {
      //   return
      // }

      if (stateDisabled.value) {
        return
      }

      const el = event.currentTarget

      if (!el) {
        return
      }

      allowFocus.value = false

      if (UIMaterial) {
        const elOffset = propOffset(el as HTMLElement)

        mousePoi.x = event.pageX - elOffset?.left
        mousePoi.y = event.pageY - elOffset?.top

        transitionRef?.value?.enter({
          mousePoi
        })
      }
    }

    function _handlerFocus(event: FocusEvent): void {
      if (stateDisabled.value) {
        return
      }

      focusing.value = true

      context.emit('focus', {
        event
      })

      if (allowFocus.value) {
        motion.value = true
      }
    }

    function _handlerBlur(event: FocusEvent): void {
      if (stateDisabled.value) {
        return
      }

      focusing.value = false

      context.emit('blur', {
        event
      })

      motion.value = false
    }

    /**
     * keyup 句柄
     */
    function _handlerKeyup(event: KeyboardEvent): void {
      if (stateDisabled.value) {
        return
      }

      if (event.keyCode === 13) {
        _click(event as any)

        return context.emit('keyEnter', {
          event
        })
      }
    }

    /**
     * 将按钮变为只读操作
     */
    function _banBtn(): void {
      stateDisabled.value = true
    }

    /**
     * 取消按钮只读状态
     */
    function _allowBtn(): void {
      stateDisabled.value = false
    }

    /**
     * 开启按钮等待功能
     */
    function openLoading(): void {
      if (!createdLoading.value) {
        createdLoading.value = true

        _banBtn()
      }

      onUpdated(() => {
        loadingRef.value.show()
      })
    }

    /**
     * 关闭按钮等待功能
     */
    function closeLoading(): void {
      _allowBtn()
      loadingRef.value.hide()
    }

    Object.assign(context, {
      openLoading: openLoading,
      closeLoading: closeLoading
    })

    return function (this: any): VNode {
      const btnEleChildren: JSX.Element[] = []

      if (stateDisabled.value) {
        btnEleChildren.push(
          <div class={[_xclass('read-only-shadow')]} />
        )
      }

      if (btnValueDisplay.value) {
        btnEleChildren.push(
          <div class={[_xclass('value-show')]}>
            {context.slots.default?.()}
          </div>
        )
      } else if (type === 'text') {
        const ele = context.slots.default?.() ?? value

        btnEleChildren.push(link
          ? (
            <a
              href={link}
              class={[_xclass('ele-border')]}
            >
              {ele}
            </a>
          ) : (
            <div class={[_xclass('ele-border')]}>
              {ele}
            </div >
          )
        )
      } else {
        const buttonChildren: Array<VNode | string | VNode[] | undefined> = []

        if (createdLoading.value) {
          buttonChildren.push(
            <Loading
              class={[_xclass('loading')]}
              bgDisplay={false}
              ui={ui}
              theme={theme}
              ref={loadingRef}
            />
          )
        }

        buttonChildren.push(context.slots.default?.() ?? value)

        btnEleChildren.push(
          <div class={_xclass('ele-border')}>
            {buttonChildren}
          </div>
        )
      }

      if (UIMaterial) {
        btnEleChildren.push(
          <MotionRip
            class={_xclass('rip')}
            assign={!isFloatBtn.value}
            speed={300}
            radius={'L'}
            ref={transitionRef}
          />,
          <div
            class={[_xclass('overlay')]}
            vShow={motion.value}
          />
        )
      }

      return (
        <div
          class={[
            cPrefix,
            btnClass.value,
            { [_xclass('disabled')]: stateDisabled.value },
            { [_xclass('block')]: block },
            { [_xclass('rip')]: !stateDisabled.value && motion.value },
            { [_xclass('focus')]: !stateDisabled.value && focusing.value }
          ]}
          style={{
            'width': width
          }}
          onMousedown={_handlerMousedown}
          onMouseup={_handlerMouseup}
          onKeyup={_handlerKeyup}
          onFocus={_handlerFocus}
          onBlur={_handlerBlur}
          tabindex={stateDisabled.value ? undefined : 0}
        >
          <div
            class={_xclass('ele')}
            style={{
              'background-color': color,
              'color': fontColor,
              'font-size': fontSize ? `${fontSize}px` : '',
              'height': height
            }}
          >
            {btnEleChildren}
          </div>
        </div >
      )
    }
  }
})
