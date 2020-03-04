import {
  useState
} from '../../vuex/store'
import commonStore from '../../vuex/module/common/type.json'
import {
  ref
} from '@vue/composition-api'

const testOptTemp = []

for (let i = 0, len = 33; i < len; i++) {
  testOptTemp.push({
    text: 'test-' + i,
    name: 'name-' + i,
    size: 'size-' + i,
    en: 'en-' + i,
    value: i
  })
}

const testOpt = ref(testOptTemp)
const exData = useState(commonStore.ex.add)

export {
  exData,
  testOpt
}
