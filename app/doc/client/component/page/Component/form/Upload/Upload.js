import './Upload.scss'
import pug from './Upload.pug'
import mixin from '../../mixin'

export default {
  name: 'PageCompUpload',

  template: pug(),

  mixins: [mixin],

  data() {
    return {
      uploadItem: []
    }
  },

  methods: {
    uploadChange({ item }) {
      this.uploadItem = item
    }
  }
}
