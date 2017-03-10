const Vue = require('vue');
const template = require("./img-upload.tpl");
require("./img-upload.scss");
const tip = require('components/base/pop/tip')
const ImgUpload = {
  template,
  props: {
    imagesArr: {
      type: Array,
      default: () => []
    },
    reg: {
      type: Object,
      default: ()=>/\.(png|jpg)$/
    },
    size: {
      type: Number,
      default: 5
    },
    uploadUrl: {
      type: String,
      default: ''
    },
    maxNums: {
      type: Number,
      default: 5
    }

  },
  methods: {
    upload(e) {
      let file = e.target.files[0];
      if(!this.reg.test(file.name)) {
        tip("仅支持jpg,png格式图片");
        return false;
      }
      if(file.size > 1024 * 1024 * this.size) {
        tip(`上传图片应小于${this.size}M`);
        return false;
      }
      if(this.imagesArr.length > this.maxNums) {
        tip(`上传图片应小于${this.maxNums}张`);
        return false;
      }
      let form_data = new FormData();
      form_data.append("img",file);
      $.ajax({
        type: "POST",
        url: this.uploadUrl,
        dataType: "json",
        crossDomain: true,
        processData: false,
        contentType: false,
        data: form_data,
        success:(msg)=>{
          let images = msg.data[0].fileUrl;
          this.imagesArr.push(images);
          e.target.value = "";
          return this.$dispatch('imagesArr', this.imagesArr);
        }
      })
    }
  },
}
module.exports = Vue.component('img-upload', ImgUpload);