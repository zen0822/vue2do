/**
 * Crop 组件
 * 裁剪图片
 *
 * @prop clip - 显示裁剪框
 * @prop drag - 拖动图片
 * @prop dragClip - 拖动截图框
 * @prop fixClip - 手势改变截图框大小
 * @prop fixClipScale - 固定截图框长宽的比例
 * @prop height - 高度
 * @prop clipHeight - 裁图框高度
 * @prop clipWidth - 裁图框宽度
 *
 * @event change - 截图发生变化
 */

import { VueCropper } from 'vue-cropper'
import Loading from '../Loading/Loading'

import baseMixin from '../../mixin/base'

export default {
  name: 'Crop',

  mixins: [baseMixin],

  props: {
    clip: {
      type: Boolean,
      default: true
    },
    clipHeight: {
      type: Number,
      default: 100
    },
    clipWidth: {
      type: Number,
      default: 100
    },
    height: {
      type: Number,
      default: 200
    },
    img: null,
    drag: {
      type: Boolean,
      default: false
    },
    dragClip: {
      type: Boolean,
      default: false
    },
    fixClip: {
      type: Boolean,
      default: false
    },
    fixClipScale: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      dangerHint: ''
    }
  },

  computed: {
    cPrefix() { // 组件类名的前缀
      return `${this.compPrefix}-crop`
    }
  },

  methods: {
    getBlob() {
      return new Promise((resolve, reject) => {
        try {
          this.$refs.crop.getCropBlob(data => {
            resolve(data)
          })
        } catch (error) {
          reject(error)
        }
      })
    },
    getData() {
      return new Promise((resolve, reject) => {
        try {
          this.$refs.crop.getCropData(data => {
            resolve(data)
          })
        } catch (error) {
          reject(error)
        }
      })
    },
    change(data) {
      return this.$emit('change', {
        emitter: this,
        data: data
      })
    }
  },

  render() {
    return (
      <div
        class={this.cPrefix}
        style={{ height: `${this.height}px` }}
      >
        <VueCropper
          autoCropHeight={this.clipHeight}
          autoCropWidth={this.clipWidth}
          autoCrop={this.clip}
          canMove={this.drag}
          canMoveBox={this.dragClip}
          fixedBox={this.fixClip}
          fixed={this.fixClipScale}
          img={this.img}
          ref='crop'
          vOn:realTime={(data) => this.change(data)}
        />
      </div>
    )
  }
}
