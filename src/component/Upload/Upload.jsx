/**
 * upload 组件
 * 目前只支持上传图片
 *
 * @prop crop - crop 组件
 * @prop hidden - 隐藏
 * @prop hint - 上传说明文字
 * @prop item - 已上传文件的信息 (src, title, alt)
 * @prop max - 最大上传数量
 * @prop min - 至少上传数量
 * @prop param - 上传图片参数名
 * @prop preview - 开启预览功能
 * @prop regex - 用正则过滤上传的文件类型, 不传就默认用本组件的过滤原则
 * @prop space - 文件大小（M）
 * @prop size - 图片尺寸（像素）：宽 * 高（300*200）
 * @prop theme - 主题
 * @prop type - 上传类型 (img | doc)
 * @prop ui - UI 规范
 *
 * @event change - 已上传文件的数量变化
 *
 * @slot crop - 开启图片裁剪
 */

import './Upload.scss'

import tip from '../Message/tip'
import toast from '../Message/toast'
import Loading from '../Loading/Loading'
import Btn from '../Btn/Btn'
import Icon from '../Icon/Icon'
import Row from '../Row/Row'
import Col from '../Col/Col'

import baseMixin from '../../mixin/base'
import formMixin from '../../mixin/form'

const TYPE_IMG = 'img'
const TYPE_DOC = 'doc'

export default {
  name: 'Upload',

  mixins: [baseMixin, formMixin],

  props: {
    crop: Object,
    errorMessage: {
      type: String
    },
    hint: String,
    item: {
      type: Array,
      default: () => []
    },
    max: {
      type: Number,
      default: 1
    },
    min: Number,
    param: String,
    preview: {
      type: Boolean,
      default: false
    },
    regex: Object,
    size: String,
    space: Number,
    type: {
      type: String,
      default: TYPE_IMG
    }
  },

  data() {
    return {
      cropEnable: false,
      cropDisplay: false,
      dangerHint: '',
      fileTypeHint: '',
      loading: true,
      previewSrc: '',
      stateItem: [],
      typeRegex: '', // 文件类型正则
      value: []
    }
  },

  computed: {
    cPrefix() { // 组件类名的前缀
      return `${this.compPrefix}-upload`
    },
    isImg() {
      return this.type === TYPE_IMG
    },
    isDoc() {
      return this.type === TYPE_DOC
    },
    uploadAccept() {
      switch (this.type) {
        case TYPE_IMG:
          return 'image/gif,image/jpeg,image/jpg,image/png'
        case TYPE_DOC:
          return 'application/pdf, application/msword'
        default:
          return ''
      }
    },
    selectFileDisplay() {
      return this.item.length < this.max
    }
  },

  watch: {
    'item'(val) {
      this.stateItem = val
    },
    'stateItem'(val) {
      this.value = val.map((item) => item.src)
    }
  },

  methods: {
    _initComp() {
      this._initRegex()
    },

    /**
     * 初始化文件类型的正则
     *
     * @return {Object} - this - 组件
     */
    _initRegex() {
      if (this.regex) {
        this.typeRegex = this.regex

        return true
      }

      switch (this.type) {
        case TYPE_IMG:
          this.typeRegex = /(.jpe?g|.png|.gif)$/i
          this.fileTypeHint = '仅支持jpg, png, gif 格式图片!'

          break
        case TYPE_DOC:
          this.typeRegex = /(.pdf|.doc|.txt)$/i
          this.fileTypeHint = '仅支持doc, pdf, txt 格式文档!'

          break
        default:
          break
      }
    },

    _initCrop() {

    },

    _rebuildInput() {
      if (!this.$refs.input) {
        return false
      }

      this.$refs.input.value = ''
    },

    /**
     * 检查图片尺寸
     *
     * @return {Object} - this - 组件
     */
    _checkImgSize(height, width) {
      return new Promise((resolve, reject) => {
        if (!this.size) {
          return reject(new Error('No set props size!'))
        }

        var maxWidth = this.size.split('*')[0]
        var maxHeight = this.size.split('*')[1]

        if (height > maxHeight || width > maxWidth) {
          tip(`图片尺寸应小于${this.size}`)

          return reject(new Error('Oversize!'))
        }

        resolve('Passed!')
      })
    },

    _changeHandler(event) {
      const files = Array.of(...event.target.files)

      files.forEach((item, index) => {
        const file = item

        if (!this.typeRegex.test(file.name)) {
          this._rebuildInput()

          return tip(this.fileTypeHint)
        }

        if (this.space && this.isImg && file.size > 1024 * 1024 * this.space) {
          this._rebuildInput()

          return tip(`上传图片应小于 ${this.space} M`)
        }

        const eleImage = new Image()
        const reader = new FileReader()
        let currentIndex = this.stateItem.push({
          src: '',
          file,
          index,
          title: file.name,
          imgEle: eleImage
        }) - 1

        eleImage.onload = (() => {
          const item = this.stateItem[currentIndex]
          const self = this

          return function () {
            self.stateItem.splice(currentIndex, 1, {
              ...item,
              height: this.height,
              width: this.width
            })

            // self._checkImgSize(this.height, this.width)
            self.$emit('change', {
              item: self.stateItem,
              emitter: self
            })
          }
        })()

        reader.onload = (event) => {
          const src = event.target.result
          const item = this.stateItem[currentIndex]

          item.src = src
          item.imgEle.src = src

          this.cropDisplay = true
        }

        reader.readAsDataURL(file)
      })
    },

    /**
     * 验证已上传的文件是否达到要求
     *
     * @return {Boolean}
     */
    verify() {
      this.dangerHint = this.errorMessage || `至少上传 ${this.min} 张图片`

      return this.item.length >= this.min
    },

    /**
     * 删除上传的文件
     *
     * @return {Object} - this - 组件
     */
    delete(index) {
      this.stateItem.splice(index, 1)
      this._rebuildInput()

      return this.$emit('change', {
        item: this.stateItem,
        emitter: this
      })
    },

    /**
     * 预览文件
     */
    previewFile(index) {
      this.previewSrc = this.stateItem[index].src
    },

    /**
     * 完成裁剪
     */
    async finishCrop() {
      const itemLength = this.stateItem.length
      const item = this.stateItem[itemLength - 1]
      const imgData = await this.crop.getData()

      this.stateItem.splice(itemLength - 1, 1, {
        ...item,
        src: imgData
      })

      this.cropDisplay = false
    },

    /**
     * 隐藏裁剪
     */
    hideCrop() {
      this.cropDisplay = false
    }
  },

  mounted() {
    this.cropEnable = !!this.$slots.crop
  },

  update() {
    this.cropEnable = !!this.$slots.crop
  },

  render() {
    const pickEle = this.selectFileDisplay ? (
      <div class={this.xclass('pick')}>
        <Loading ref='loading' />

        {this.loading && (
          <div>
            <Icon
              class={this.xclass('pick-plus')}
              kind='plus'
            />
            <input
              class={this.xclass('pick-input')}
              type='file'
              ref='input'
              accept={this.uploadAccept}
              onChange={(event) => this._changeHandler(event)}
            />
          </div>
        )}
      </div>
    ) : null

    return (
      <div
        class={this.cPrefix}
        style={{
          visibility: this.hidden ? 'hidden' : 'visible'
        }}
      >
        <Row justify='start' class={this.xclass('showcase')}>
          {this.stateItem.map((item, index) => (
            <Col class={this.xclass('showcase-ele')}>
              <div onClick={() => this.delete(index)}>
                <Icon
                  class={this.xclass('showcase-delete')}
                  kind='circle-close-o'
                />
              </div>
              <div
                class={this.xclass('showcase-content')}
                onClick={() => this.previewFile(index)}
              >
                {this.isImg && (
                  <img
                    src={item.src}
                    title={item.name}
                    style={{
                      width: item.width >= item.height ? '100%' : 'auto',
                      height: item.width >= item.height ? 'auto' : '100%'
                    }}
                  />
                )}
              </div>
            </Col>
          ))}

          {this.max !== this.stateItem.length && (
            <Col>
              {pickEle}
            </Col>
          )}
        </Row>

        <div class={this.xclass('hint')}>{this.hint}</div>

        {this.preview && this.previewSrc && (
          <div
            ref='imgPreview'
            class={this.xclass('preview')}
          >
            <div class={this.xclass('preview-layover')} />
            <div
              class={this.xclass('preview-close')}
              onClick={() => (this.previewSrc = '')}
            >
              <Icon
                color='#fff'
                kind='circle-close-o'
                fontSize={40}
              />
            </div>
            <img src={this.previewSrc} />
          </div>
        )}

        {this.cropEnable && this.cropDisplay && (
          <div class={this.xclass('crop')}>
            <div>{this.$slots.crop}</div>

            <Row class={this.xclass('crop-operation')}>
              <Col>
                <div onClick={() => this.hideCrop()}>
                  <Btn
                    type='text'
                    value='取消'
                    theme='grey'
                  />
                </div>
              </Col>
              <Col>
                <div onClick={() => this.finishCrop()}>
                  <Btn
                    type='text'
                    value='确定'
                  />
                </div>
              </Col>
            </Row>
          </div>
        )}
      </div>
    )
  }
}
