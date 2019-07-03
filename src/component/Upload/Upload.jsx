/**
 * upload 组件
 * 目前只支持上传图片
 *
 * @prop hidden - 隐藏
 * @prop hint - 上传说明文字
 * @prop item - 已上传文件的信息 (src, title, alt)
 * @prop max - 最大上传数量
 * @prop min - 至少上传数量
 * @prop param - 上传图片参数名
 * @prop regex - 用正则过滤上传的文件类型, 不传就默认用本组件的过滤原则
 * @prop space - 文件大小（M）
 * @prop size - 图片尺寸（像素）：宽 * 高（300*200）
 * @prop theme - 主题
 * @prop type - 上传类型 (img | doc)
 *
 * @event change - 已上传文件的数量变化
 */

import './Upload.scss'

import tip from '../Message/tip'
import toast from '../Message/toast'
import Loading from '../Loading/Loading'
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
      stateItem: [],
      loadingUpload: true,
      fileTypeHint: '',
      dangerTip: '',
      width: null,
      height: null,
      inputVal: '',
      typeRegex: ''
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
      this.stateItem = [...val]

      this.$emit('change', {
        item: this.stateItem,
        store: this.store,
        emitter: this
      })
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

    _rebuildInput() {
      this.$refs.input.value = ''
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

        let currentIndex = this.stateItem.push({
          src: '',
          file,
          index,
          title: file.name
        }) - 1

        // this.checkImgSize(item.picPath, () => {
        //   this.item.push({
        //     url: item.picPath,
        //     id: item.picId,
        //     width: this.width,
        //     height: this.height
        //   })
        // })

        const reader = new FileReader()

        reader.onload = (event) => {
          this.stateItem[currentIndex].src = event.target.result
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
      this.dangerTip = this.errorMessage || `至少上传 ${this.min} 张图片`

      return this.item.length >= this.min
    },

    /**
     * 检查图片尺寸
     *
     * @return {Object} - this - 组件
     */
    checkImgSize(url, cb) {
      if (!this.size) {
        return false
      }

      var maxWidth = this.size.split('*')[0]
      var maxHeight = this.size.split('*')[1]

      var img = new Image()
      img.src = url
      img.style.visibility = 'hidden'

      const imgComplete = () => {
        $(this.$refs.imgPreview).html(img)

        if (img.offsetHeight > maxHeight || img.offsetWidth > maxWidth) {
          tip(`图片尺寸应小于${this.size}`)
          this.$refs.imgPreview.innerHTML = ''

          return false
        }
        this.width = img.offsetWidth
        this.height = img.offsetHeight

        cb && cb()
      }

      // 判断图片是否已经下载过
      if (!img.complete) {
        img.onload = () => {
          imgComplete()
        }

        img.onerror = () => {
          tip('图片下载失败')
        }
      } else {
        imgComplete()
      }

      return this
    },

    /**
     * 删除上传的文件
     *
     * @return {Object} - this - 组件
     */
    delete(index) {
      this.inputVal = ''
      this.item.splice(index, 1)

      return this
    }
  },

  render() {
    const pickEle = this.selectFileDisplay ? (
      <div class={this.xclass('img-pick')}>
        <Loading ref='loading' />

        {this.loadingUpload && (
          <div>
            <Icon
              class={this.xclass('img-pick-plus')}
              kind='plus'
            />
            <input
              class={this.xclass('img-pick-input')}
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
        {this.isImg && (
          <div class={this.xclass('img')}>
            <Row justify='start' class={this.xclass('showcase')}>
              {this.stateItem.map((item, index) => (
                <Col class={this.xclass('img-showcase-ele')}>
                  <Icon
                    class={this.xclass('img-showcase-delete')}
                    kind='circle-close'
                    onClick={() => this.delete(index)}
                  />
                  <div class={this.xclass('img-showcase-content')}>
                    <img src={item.src} title={item.name} />
                  </div>
                </Col>
              ))}
              <Col>
                {pickEle}
              </Col>
            </Row>

            <div class={this.xclass('img-hint')}>{this.hint}</div>
            <div
              ref='imgPreview'
              class={this.xclass('img-preview')}></div>
          </div>
        )}
      </div>
    )
  }
}
