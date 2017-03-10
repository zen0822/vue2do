const Vue = require('vue');
require('./upload-img.scss');
const template = require("./upload-img.tpl");

const UploadImg = {
  template,
  props: {
    maxNums: {
      type: Number,
      default: 3
    },
    fileFilter: {
      type: Array,
      default: () => []
    },
    url: {
      type: String,
      default: '//192.168.1.41/file/api/upload/img'
    },
  },
  methods: {
    filter(files) {
      let arrFiles = [];
      for(let i = 0, file; file = files[i]; i++) {
        if(file.type.indexOf("image") == 0) {
          // if (file.size >= 1024*1024*5) {
          //  bootbox.alert('您这张"'+ file.name +'"图片大小过大，应小于5M');
          // } else
          if(this.countNums > this.maxNums) {
            bootbox.alert('最多可以添加9张图片');
            break;
          } else {
            this.countNums++;
            arrFiles.push(file);
          }
        } else {
          alert('文件"' + file.name + '"不是图片。');
        }
      }
      return arrFiles;
    },
    funGetFiles(e) {
      let _self = e.target;
      let files = _self.files;
      this.fileFilter = this.fileFilter.concat(this.filter(files));
      this.funDealFiles();
      return this;
    },
    funDealFiles() {
      for(var i = 0, file; file = this.fileFilter[i]; i++) {
        file.index = i;
      }
//    this.onSelect(this.fileFilter);
      return this;
    },
    funDeleteFile(fileDelete) {
      var arrFile = [];
      for(var i = 0, file; file = this.fileFilter[i]; i++) {
        if(file != fileDelete) {
          arrFile.push(file);
        } else {
          this.onDelete(fileDelete);
        }
      }
      this.fileFilter = arrFile;
      return this;
    },
    _init(e) {
        this.funGetFiles(e);
    },
    onSelect(files) {

    }
  }
}
module.exports = Vue.component('upload-img', UploadImg);