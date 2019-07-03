import './Upload.scss'
import pug from './Upload.pug'
import mixin from '../../mixin'

export default {
  name: 'PageCompUpload',

  template: pug(),

  mixins: [mixin],

  data() {
    return {
      image: {},
      uploadItem: []
    }
  },

  methods: {
    cropRealtime({ data }) {
      // console.log(data)
    },
    uploadChange({ item }) {
      this.uploadItem = item

      if (item.length > 0) {
        this.image = item[0]
      }
    }
  }
}
