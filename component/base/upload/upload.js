/**
 * upload 组件
 * 目前只支持上传图片
 *
 * @props theme - 主题
 * @props type - 上传类型 (img | doc)
 * @props url - 上传地址
 * @props regex - 用正则过滤上传的文件类型, 不传就默认用本组件的过滤原则
 * @props max - 最大上传数量
 * @props min - 至少上传数量
 * @props space - 文件大小（M）
 * @props size - 图片尺寸（像素）：宽 * 高（300*200）
 * @props instruction - 上传说明文字
 * @props uploadItems - 已上传图片的地址数组
 * @props queryName - 上传图片参数名
 * @props store - 父组件暂存在组件的数据，充当和父亲组件通信时传递的数据
 * @props success - 上传文件成功的钩子函数
 * @props queryOpt - 申请上传文件时的数据
 *
 * @events change - 已上传文件的数量变化
 */

import Vue from 'vue'

const tip = require('components/base/pop/tip')
const loading = require('components/base/loading/loading')
const { upload: uploadEvent } = require('components/config/event.json');

const template = require("./upload.tpl");
require("./upload.scss");

const TYPE_IMG = 'img';
const TYPE_DOC = 'doc';

const Upload = {
  template,

  props: {
    type: {
      type: String,
      default: TYPE_IMG
    },

    queryName: String,

    space: Number,

    uploadItems: {
      type: Array,
      default: () => []
    },

    regex: Object,

    url: String,

    size: String,

    max: {
      type: Number,
      default: 1
    },

    min: Number,

    instruction: String,

    store: Object,

    success: Function,
    errorMessage:{
      type:String
    },
    queryOpt: {
      type: Object,
      default() {
        return {}
      }
    }
  },

  data() {
    return {
      value: [],
      uploadAccept: 'image/*',
      loadingUpload: true,
      fileTypeTip: '',
      dangerTip: '',
      width: null,
      height: null,
      iptval:''
    }
  },

  computed: {
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
      return this.uploadItems.length < this.max
    }
  },

  watch: {
    'uploadItems'(val) {
      console.log('----------------'+val);
      this.value = []

      val.forEach((item, index) => {
        this.value.push(item.id)
      })

      this.$dispatch(uploadEvent.change, {
        uploadItems: val,
        store: this.store,
        value: this.value,
        dispatcher: this
      })
    }
  },

  methods: {
    _init() {
      this._initRegex()
    },

    /**
     * 初始化文件类型的正则
     *
     * @return {Object} - this - 组件
     */
    _initRegex() {
      if (this.regex) {
        return true
      }

      switch (this.type) {
        case TYPE_IMG:
          this.regex = /(.jpg|.png|.gif)$/i
          this.fileTypeTip = '仅支持jpg, png, gif 格式图片!'
          break;
        case TYPE_IMG:
          this.regex = /(.pdf|.doc|.txt)$/i
          this.fileTypeTip = '仅支持doc, pdf, txt 格式文档!'
          break;
        default:
          break;
      }
    },

    /**
     * 验证已上传的文件是否达到要求
     *
     * @return {Boolean}
     */
    verify() {
      this.dangerTip = this.errorMessage || `至少上传 ${this.min} 张图片`

      return this.uploadItems.length >= this.min
    },

    /**
     * 检查图片尺寸
     *
     * @return {Object} - this - 组件
     */
    checkPhotoSize(url, cb) {
      if (!this.size) {
        return false
      }

      var maxWidth = this.size.split('*')[0]
      var maxHeight = this.size.split('*')[1]

      var img = new Image()
      img.src = url
      img.style.visibility = 'hidden'

      const imgComplete = () => {
        $(this.$els.imgPreview).html(img)

        if (img.offsetHeight > maxHeight || img.offsetWidth > maxWidth) {
          tip(`图片尺寸应小于${this.size}`)
          this.$els.imgPreview.innerHTML = ''

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
          tip("图片下载失败")
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
    delUploaded(index) {
      this.iptval = '';
      this.uploadItems.splice(index, 1)

      return this
    },

    /**
     * 触发上传文件
     */
    upload(evt) {
      var file = evt.target.files[0];
      if (!file) {
        return false
      }

      if (!this.regex.test(file.name)) {
        tip(this.fileTypeTip);

        return false;
      }

      if (this.space && this.isImg && file.size > 1024 * 1024 * this.space) {
        tip(`上传图片应小于${this.space}M`);

        return false;
      }

      var formData = new FormData();
      formData.append("data", file);

      Object.keys(this.queryOpt).forEach((item) => {
        formData.append(item, this.queryOpt[item]);
      })

      this.$refs.loading.show()
      this.loadingUpload = false;


      $.ajax({
        type: "POST",
        url: this.url,
        dataType: "json",
        crossDomain: true,
        processData: false,
        contentType: false,
        data: formData,
        headers:{token:window.localStorage.getItem('appBackToken')},
        success: (rtn) => {
          if (rtn.code !== 0) {
            return false;
          }

          var data = rtn.data

          if (!Array.isArray(data)) {
            data = [data]
          }

          data.forEach((item, index) => {
            this.$refs.loading.hide()
            this.loadingUpload = true;

            this.checkPhotoSize(item.picPath, () => {
              this.uploadItems.push({
                url: item.picPath,
                id: item.picId,
                width: this.width,
                height: this.height
              });
            })
          })
          this.iptval="";
          this.$nextTick(() => {
            this.success && this.success.call(null, rtn, this)
          })
        }
      })
    }
  },

  ready() {
    this._init()
  }
}
module.exports = Vue.component('upload', Upload);