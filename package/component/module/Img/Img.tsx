/**
 * Img 组件
 *
 * @prop alt - 图片描述
 * @prop className - 图片样式
 * @prop contain - 图片全展示并且垂直水平居中
 * @prop width - 图片宽度
 * @prop height - 图片高度
 * @prop src - 图片地址
 * @prop theme - 主题
 * @prop title - 图片标题
 *
 * @event load - 图片加载完成
 * @event error - 图片加载失败
 */

import {
  ref,
  defineComponent
} from '@vue/composition-api'

import { VNode } from 'vue'
import {
  compPrefix,
  css4,
  props,
  xclass
} from '../../mixin/base'

css4 ? import('./Img.var.scss') : import('./Img.scss')

export default defineComponent({
  name: 'Img',

  props: {
    ...props,
    alt: {
      default: '',
      type: String
    },
    contain: {
      default: false,
      type: Boolean
    },
    height: {
      default: '',
      type: [String, Number]
    },
    src: {
      required: true,
      type: String
    },
    title: String,
    width: {
      default: '',
      type: [String, Number]
    }
  },

  setup({
    alt,
    contain,
    height,
    src,
    title,
    width
  }) {
    const imgState = ref(1) // 1：图片加载前，2：图片加载成功，3：图片加载失败
    const _xclass = (className = ''): string => xclass(`${compPrefix}-img`, className)

    const _width = ref(
      Number.isNaN(Number(width))
        ? width
        : (width && `${width}px`)
    )
    const _height = ref(
      Number.isNaN(Number(height))
        ? width
        : (height && `${height}px`)
    )

    const imageLoadSuccess = (event: any): void => {
      const image = event.currentTarget

      if (contain) {
        const widthHeightRate = image.width / image.height

        if (widthHeightRate > 1) {
          _width.value = '100%'
          _height.value = 'auto'
        }

        if (widthHeightRate < 1) {
          _width.value = 'auto'
          _height.value = '100%'
        }
      }

      imgState.value = 2
    }

    const imageLoadError = (): void => {
      imgState.value = 3
    }

    const imgProps = {
      class: _xclass('content'),
      alt,
      title
    }

    const imageBoxStyle = {
      width: _width,
      height: _height
    }
    
    return (): VNode => (
      <div
        style={imageBoxStyle}
        class={_xclass()}
        ref='me'
      >
        {imgState.value === 1 && (
          <div
            class={_xclass('skeleton')}
            style={{
              ...imageBoxStyle
            }}
          />
        )}

        <img
          {...imgProps}
          src={src}
          onLoad={(event: any): void => imageLoadSuccess(event)}
          onError={(): void => imageLoadError()}
          style={{
            display: imgState.value === 2 ? '' : 'none'
          }}
        />

        {imgState.value === 3 && (
          <img
            {...imgProps}
            src={''}
          />
        )}
      </div>
    )
  }
})
