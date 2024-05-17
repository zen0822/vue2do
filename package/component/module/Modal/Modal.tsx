/**
 * modal 模态框组件
 *
 * @prop commit - 当是 full 类型的时候，
 *                不用确认直接提交的模态框，默认为否
 * @prop header - 弹窗头部标题
 * @prop message - 模态框信息
 * @prop size - 模态框宽度尺寸（S | M | L）
 *
 * @prop okCb - 确定的回调函数，布尔值为 false 则执行默认的回掉函数，否则如果是函数就执行，不是就不执行
 * @prop noCb - 同上的取消回调函数
 * @prop okBtn - 确定按钮名字
 * @prop noBtn - 取消按钮名字
 * @prop noBtnDisplay - 取消按钮是否显示
 *
 * @prop headerDisplay - 是否显示弹窗头部
 * @prop footerDisplay - 是否显示弹窗底部
 *
 * @prop height - 弹窗内容的高度 (Number | 'auto' | '100%')
 * @prop hideLayover - 隐藏遮罩层
 * @prop motion - 动画 (slide* | none)
 * @prop width - 弹窗内容的宽度 (Number | String)
 * @prop type - 弹窗类型（full | alert | confirm | simple | long）
 *
 * @slot - 弹窗的主体内容
 *
 * @event ok - 点击确定按钮
 * @event no - 点击取消按钮
 * @event show - 显示之后事件
 * @event hide - 隐藏之后事件
 */

import '../../scss/common/main.scss'
import './Modal.scss'
import './Modal.m.scss'
import './Modal.material.scss'
import './Modal.bootstrap.scss'
import './Modal.pure.scss'

import { VNode } from 'vue'

import {
  computed,
  defineComponent,
  ref,
  reactive,
  watch
} from '@vue/composition-api'

import {
  baseProps,
  compPrefix,
  deviceSize,
  themeClass as getThemeClass,
  uiClass as getUiClass,
  xclass
} from '../../lib/base'

import Pop from '../Pop'
import Btn from '../Btn'
import Icon from '../Icon'
import Scroller from '../Scroller'
import Row from '../Row'
import Col from '../Col'
import MotionFade from '../MotionFade'

const cPrefix = `${compPrefix}-modal`
const _xclass = (className: string | string[]): string => xclass(cPrefix, className)

export default defineComponent({
  name: 'Modal',

  // mixins: [baseMixin, apiMixin],

  props: {
    ...baseProps,
    commit: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'simple',
      validator: (val: 'simple' | 'alert' | 'confirm' | 'long' | 'full'): boolean => {
        return ['simple', 'alert', 'confirm', 'long', 'full'].includes(val)
      }
    },
    size: {
      type: String,
      default: 'S',
      validator: (val: 's' | 'm' | 'l'): boolean => {
        return ['s', 'm', 'l'].includes(val.toLowerCase())
      }
    },
    header: {
      type: String,
      default: ''
    },
    okCb: Function,
    noCb: Function,
    okBtn: {
      type: String,
      default: '确定'
    },
    noBtn: {
      type: String,
      default: '取消'
    },
    message: {
      type: String,
      default: ''
    },
    motion: {
      type: String,
      default: 'slide',
      validator: (val: 'none' | 'slide'): boolean => {
        return ['slide', 'none'].includes(val)
      }
    },
    headerDisplay: {
      type: Boolean,
      default: (): void => {
        return undefined
      }
    },
    headerNoBtnDisplay: {
      type: Boolean,
      default: false
    },
    hideLayover: {
      type: Boolean,
      default: false
    },
    noBtnDisplay: {
      type: Boolean,
      default: false
    },
    footerDisplay: {
      type: Boolean,
      default: (): void => {
        return undefined
      }
    },
    height: [Number, String],
    width: [Number, String]
  },

  setup(props, { slots, emit }) {
    const {
      headerDisplay,
      footerDisplay,
      theme,
      ui,
      type
    } = props

    const popRef = ref<any>(null)
    const scrollerRef = ref<any>(null)
    const fadeTransition = ref<any>(null)

    const pointStart = reactive({
      x: 0,
      y: 0
    })

    const stateUI = ref(ui)
    const stateTheme = ref(theme)
    const stateMessage = ref('')
    const stateHeader = ref('')
    const isMousedown = ref(false)
    const modalDisplay = ref(false)
    const hasScroller = ref(false) // scroller 是否有滚动条

    const showCb = ref<Function>() // 模态框显示之后的回调函数
    const hideCb = ref<Function>() // 模态框隐藏之后的回调函数
    const okCbFun = ref<Function>()
    const noCbFun = ref<Function>()

    const uiClass = getUiClass(stateUI)
    const themeClass = getThemeClass(stateTheme)
    const UIMaterial = computed(() => stateUI.value === 'material')
    const UIPure = computed(() => stateUI.value === 'pure')
    const isFull = computed(() => props.type === 'full') // 是否是 full modal

    watch(modalDisplay, (modalDisplay) => {
      if (modalDisplay) {
        fadeTransition.value?.enter()
        popRef.value?.show()
      }
    })

    // 判断是否在中大型设备并且是 full 模态框
    const isBiggerFull = computed(() => (
      (isFull.value &&
        (
          deviceSize.value === 'm' ||
          deviceSize.value === 'l' ||
          deviceSize.value === 'xl'
        )
      ) || !isFull.value
    ))

    // 模态框的头部显示状态
    const modalHeaderDisplay = computed(() => {
      if (UIPure.value) {
        return false
      }

      if (headerDisplay !== undefined) {
        return headerDisplay
      }

      switch (type) {
        case 'simple':
          return false
        case 'full':
          return true
        default:
          return !!stateHeader.value
      }
    })

    // 模态框的尾部显示状态
    const modalFooterDisplay = computed(() => {
      if (UIPure.value) {
        return false
      }

      if (footerDisplay !== undefined) {
        return footerDisplay
      }

      switch (type) {
        case 'alert':
        case 'confirm':
          return true
        case 'full':
          return isBiggerFull.value
        case 'simple':
          return false
        default:
          return true
      }
    })

    // 组件的 header 的 class 名字
    const headerClass = computed(() => ({
      [`${cPrefix}-no-header`]: !modalHeaderDisplay.value,
      [`${cPrefix}-no-header-title`]: !stateHeader.value
    }))

    // 组件的 footer 的 class 名字
    const footerClass = computed(() => ({
      [`${cPrefix}-footer`]: true,
      [`${cPrefix}-no-footer`]: !modalFooterDisplay.value
    }))

    // 模态框的内容的高度
    const modalHeight = computed(() => {
      if (props.height) {
        return props.height
      }

      switch (props.type) {
        case 'full':
          return isBiggerFull.value ? 300 : '100%'
        case 'simple':
          return 150
        default:
          return 120
      }
    })

    function popRefShowing(): void {
      UIMaterial.value && scrollerRef.value.initScroller()
      popRef.value?.computePosition()
    }

    function popRefShow(opt: any): void {
      showCb.value?.()

      return emit('show', {
        ...opt
      })
    }

    function popRefHide(opt: any): void {
      hideCb.value?.()

      return emit('show', {
        ...opt
      })
    }

    function scrollerRefYBarChange({
      _hasScroller
    }: any): void {
      hasScroller.value = _hasScroller
    }

    /**
     * 设置数据
     */
    function _setDataOpt(): void {
      const {
        message,
        header,
        okCb,
        noCb,
        ui,
        theme
      } = props

      stateMessage.value = message
      stateHeader.value = header

      okCbFun.value = okCb
      noCbFun.value = noCb

      stateUI.value = ui
      stateTheme.value = theme
    }

    /**
     * 显示pop
     *
     * @param {Number} - 当前页码
     * @return {Object}
     */
    function show(): void {
      modalDisplay.value = true
    }

    /**
     * 隐藏pop
     *
     * @return {Object}
     */
    function hide(): void {
      fadeTransition.value.leave()

      popRef.value.hide({
        cb: () => {
          modalDisplay.value = false
          isMousedown.value = false
        }
      })
    }

    /**
     * 鼠标mouseDown 弹窗头部触发的事件
     *
     * @return {Object}
     */
    function mouseDown(event: MouseEvent): void {
      isMousedown.value = true

      pointStart.x = event.clientX
      pointStart.y = event.clientY
    }

    /**
     * 鼠标mouseMove 弹窗头部触发的事件
     *
     * @return {Object, Boolean}
     */
    function mouseMove(event: MouseEvent): void {
      event.preventDefault()

      if (!isMousedown.value) {
        return
      }

      popRef.value.computePosition()

      pointStart.x = event.clientX
      pointStart.y = event.clientY
    }

    /**
     * 鼠标mouseUp 弹窗头部触发的事件
     *
     * @return {Object, Boolean}
     */
    function mouseUp(event: MouseEvent): void {
      event.preventDefault()

      if (!isMousedown.value) {
        return
      }

      isMousedown.value = false
    }

    /**
     * 弹窗点击确定触发的函数
     *
     * @return {Object}
     */
    function ok(): void {
      emit('ok')

      if (okCbFun.value) {
        if (typeof okCbFun.value === 'function') {
          okCbFun.value()
        }
      }

      hide()
    }

    /**
     * 弹窗点击取消触发的函数
     *
     * @return {Object}
     */
    function no(): void {
      emit('no')

      if (noCbFun.value) {
        if (typeof noCbFun.value === 'function') {
          noCbFun.value()
        }
      }

      hide()
    }

    /**
     * 点击 Full 的导航按钮
     */
    function clickFullNav(): void {
      if (props.commit) {
        no()
      } else {
        hide()
      }
    }

    /**
     * 获取 / 设置 弹窗的title名
     *
     * @return {Object, Boolean}
     */
    function title(text: string): void {
      if (text === '' || text) {
        stateHeader.value = text
      }
    }

    /**
     * alert, confirm 弹窗的文字信息
     *
     * @param {String} - 需要设置的值
     * @return {Object, String}
     */
    function info(text: string): void {
      if (text === '' || text) {
        stateMessage.value = text
      }
    }

    /**
     * 设置各个组件的配置数据
     *
     * @param opt - 选项
     *                       {Function} okCb - 点击的回调函数
     *                       {Function} noCb - 取消的回调函数
     *                       {Function} showCb - 显示之后的回调函数
     *                       {Function} hideCb - 隐藏之后的回调函数
     *                       {String} title - 模态框标题
     *                       {Function} message - 需要展示的信息
     */
    function set({
      okCb = undefined,
      noCb = undefined,
      showCbFun = undefined,
      hideCbFun = undefined,
      title = '',
      message = '',
      ui = stateUI.value,
      theme = stateTheme.value
    } = {}): any {
      okCbFun.value = okCb
      noCbFun.value = noCb
      showCb.value = showCbFun
      hideCb.value = hideCbFun
      stateHeader.value = title
      stateMessage.value = message

      stateUI.value = ui
      stateTheme.value = theme
    }

    /**
     * 点击模态框背景的句柄
     */
    function handlerClickBg(): void {
      return hide()
    }

    _setDataOpt()

    return {
      clickFullNav,
      fadeTransition,
      footerClass,
      handlerClickBg,
      hasScroller,
      headerClass,
      hide,
      info,
      mouseDown,
      mouseUp,
      mouseMove,
      modalDisplay,
      modalFooterDisplay,
      modalHeight,
      modalHeaderDisplay,
      no,
      popRef,
      popRefHide,
      popRefShow,
      popRefShowing,
      isBiggerFull,
      isFull,
      ok,
      scrollerRef,
      scrollerRefYBarChange,
      set,
      show,
      slots,
      stateHeader,
      stateMessage,
      stateTheme,
      stateUI,
      title,
      uiClass,
      themeClass,
      UIMaterial
    }
  },

  render(this: any): VNode {
    const {
      clickFullNav,
      commit,
      footerClass,
      handlerClickBg,
      hasScroller,
      headerClass,
      hideLayover,
      mouseDown,
      mouseUp,
      mouseMove,
      modalDisplay,
      modalFooterDisplay,
      modalHeight,
      motion,
      modalHeaderDisplay,
      no,
      noBtn,
      popRefHide,
      popRefShow,
      popRefShowing,
      pure,
      isBiggerFull,
      isFull,
      ok,
      okBtn,
      scrollerRefYBarChange,
      size,
      slots,
      stateHeader,
      stateMessage,
      stateTheme,
      stateUI,
      type,
      width,
      uiClass,
      themeClass,
      UIMaterial
    } = this

    const modalChildren = []
    const headerChildren = []
    const footerChildren = []

    const articleEle = slots.default ? slots.default() : (
      <div
        class={_xclass('alert-message')}
      >{stateMessage}</div>
    )

    if (isFull.value) {
      if (!isBiggerFull.value) {
        headerChildren.push(
          <Col
            class={[this.xclass('header-nav')]}
            xs={2}
            l={1}
            onClick={clickFullNav}
          >
            <Icon
              kind={commit ? 'close' : 'arrow-left'}
              size='S'
              theme='white'
            />
          </Col>
        )
      }

      headerChildren.push(
        <Col
          xs={commit ? 8 : 9}
          l={commit ? 10 : 11}
        >
          <span
            class={_xclass('header-title')}
          >{stateHeader}</span>
        </Col>
      )

      if (!this.isBiggerFull && this.commit) {
        headerChildren.push(
          <Col
            xs={2}
            l={1}
          >
            <span>{okBtn}</span>
          </Col>
        )
      }
    } else {
      headerChildren.push(
        <Col
          span={12}
        >
          <span
            class={_xclass('header-title')}
          >{stateHeader}</span>
        </Col>
      )
    }

    if (noBtn) {
      footerChildren.push(
        <Btn
          value={noBtn}
          type={UIMaterial ? 'text' : 'button'}
          ui={stateUI}
          theme='white'
          onClick={no}
        />
      )
    }

    if (okBtn) {
      footerChildren.push(
        <Btn
          value={okBtn}
          type={UIMaterial ? 'text' : 'button'}
          ui={stateUI}
          theme={stateTheme}
          onClick={ok}
        />
      )
    }

    if (modalHeaderDisplay) {
      modalChildren.push(
        <header
          class={[
            _xclass('header'),
            headerClass
          ]}
          onMouseDown={mouseDown}
          onMouseUp={mouseUp}
        >
          <Row
            justify='justify'
            ui={stateUI}
            theme={stateTheme}
          >
            {headerChildren}
          </Row>
        </header>
      )
    }

    if (UIMaterial) {
      modalChildren.push(
        <article class={[_xclass('article')]}>
          <Scroller
            class={[_xclass('scroller')]}
            height={modalHeight}
            width='100%'
            autoHide={true}
            ui={stateUI}
            theme={stateTheme}
            ref='scrollerRef'
            onYBarChange={scrollerRefYBarChange}
          >{articleEle}</Scroller>
        </article>
      )
    } else if (pure) {
      modalChildren.push(articleEle)
    } else {
      modalChildren.push(
        <article class={[_xclass('article')]}>
          {articleEle}
        </article>
      )
    }

    if (modalFooterDisplay) {
      modalChildren.push(
        <footer
          class={footerClass}
          vShow={isBiggerFull}
        >{footerChildren}</footer>
      )
    }

    return (
      <div
        class={[
          cPrefix,
          _xclass([uiClass]),
          _xclass([themeClass]),
          _xclass(`size-${size.toLowerCase()}`),
          _xclass(`type-${type}`),
          {
            [_xclass('no-header')]: !modalHeaderDisplay
          },
          {
            [_xclass('has-scroller')]: hasScroller
          }
        ]}
        vShow={modalDisplay}
        onMouseMove={mouseMove}
      >
        <MotionFade
          speed='fast'
          ref='fadeTransition'
        >
          <div
            class={_xclass('bg')}
            style={{
              'background-color': hideLayover ? 'transparent' : ''
            }}
            onClick={handlerClickBg}
          />
        </MotionFade>

        <Pop
          class={[_xclass('pop')]}
          onShowing={popRefShowing}
          onHide={popRefHide}
          onShow={popRefShow}
          ui={stateUI}
          theme={stateTheme}
          type={motion}
          ref='popRef'
        >
          <div
            class={[_xclass('content')]}
            style={{
              width
            }}
          >{modalChildren}</div>
        </Pop>
      </div>
    )
  }
})
