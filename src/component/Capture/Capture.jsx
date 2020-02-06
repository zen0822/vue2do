/**
 * Capture （拍照）组件
 * ios 11+
 * Android 5+
 * IE Edge+
 *
 * @prop height - 宽度
 * @prop width - 宽度
 *
 * @event change - 照片变化
 */
import './Capture.scss'
import alert from '../Modal/alert'
import Btn from '../Btn/Btn'
import Row from '../Row/Row'
import Col from '../Col/Col'
import baseMixin from '../../mixin/base'

export default {
  name: 'Capture',

  mixins: [baseMixin],

  components: {
    Btn,
    Row,
    Col
  },

  props: {
    height: {
      type: [Number],
      default: 300
    },
    width: {
      type: [Number],
      default: 300
    }
  },

  data() {
    return {
      cameraDisplay: false,
      dangerHint: '',
      photoDisplay: false,
      photoWidth: 0,
      photoHeight: 0,
      streaming: false,
      stateDisplay: false,
      support: false,
      photoData: ''
    }
  },

  computed: {
    cPrefix() { // 组件类名的前缀
      return `${this.compPrefix}-capture`
    }
  },

  watch: {
    photoData(val) {
      this.$emit('change', {
        emitter: this,
        data: val
      })
    }
  },

  methods: {
    _initComp() {
      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(() => {
          this.support = true
        })
        .catch((error) => {
          this.support = false

          console.warn(error)
        })
    },
    async _initCamera() {
      await this.$nextTick()

      const { video } = this.$refs

      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(function (stream) {
          video.srcObject = stream
          video.play()
        })
        .catch((error) => {
          console.warn('An error occurred: ' + error)

          this.hide()
        })

      video.addEventListener('canplay', () => {
        if (!this.streaming) {
          this.photoHeight = video.videoHeight / (video.videoWidth / this.width)

          // Firefox 读取不到高度所以先预设下高度
          if (isNaN(this.photoHeight)) {
            this.photoHeight = this.width / (4 / 3)
          }

          this.streaming = true
        }
      }, false)

      this.clear()
    },

    /**
     * 获得照片
     */
    get() {
      return this.photoData
    },

    /**
     * 启动照相
     */
    start() {
      if (!this.support) {
        return alert(`vue2do 错误: 当前设备不支持拍照功能。`)
      }

      this.cameraDisplay = true
      this.photoDisplay = true
      this.stateDisplay = true

      this._initCamera()
    },

    /**
     * 清空照片
     */
    clear() {
      const { canvas } = this.$refs
      const context = canvas.getContext('2d')

      context.fillStyle = '#AAA'
      context.fillRect(0, 0, canvas.width, canvas.height)

      this.photoData = canvas.toDataURL('image/png')

      return this.photoData
    },

    /**
     * 拍照
     */
    take() {
      const { video, canvas } = this.$refs
      const context = canvas.getContext('2d')

      if (this.width && this.photoHeight) {
        canvas.width = this.width
        canvas.height = this.photoHeight
        context.drawImage(video, 0, 0, this.width, this.photoHeight)

        this.photoData = canvas.toDataURL('image/png')
      } else {
        this.clear()
      }

      this.hide()

      return this.photoData
    },

    /**
     * 隐藏照相
     */
    hide() {
      this.stateDisplay = false
    }
  },

  render() {
    return (
      <div
        class={this.cPrefix}
        style={{ display: this.stateDisplay ? '' : 'none' }}
      >
        {this.dangerHint && (
          <div class={this.xclass('danger-hint')}>{this.dangerHint}</div>
        )}

        <canvas
          key='canvas'
          class={this.xclass('canvas')}
          height={this.photoHeight}
          width={this.width}
          ref='canvas'
        />

        <video
          key='video'
          class={this.xclass('camera')}
          height={this.height}
          width={this.width}
          ref='video'
        />

        <Row key='operation' class={this.xclass('operation')}>
          <Col>
            <div onClick={() => this.hide()}>
              <Btn
                type='text'
                value='取消'
                theme='white'
              />
            </div>
          </Col>
          <Col>
            <div onClick={() => this.take()}>
              <Btn
                type='text'
                value='拍照'
              />
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
