import './Blog.scss'
import pug from './Blog.pug'
import mixin from '../Component/mixin'
import article2019031101 from '../../../asset/blog/blog-2019031101.html'

export default {
  name: 'PageBlog',

  template: pug(),

  mixins: [mixin],

  data() {
    return {
      articleId: this.$route.params.id,
      article2019031101
    }
  }
}
