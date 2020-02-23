import Vue from 'vue'
import Component from 'vue-class-component'

const testOpt: Array<object> = []

for (let i = 0; i < 33; i++) {
  testOpt.push({
    text: 'test-' + i,
    name: 'name-' + i,
    size: 'size-' + i,
    en: 'en-' + i,
    value: i
  })
}

@Component
export default class MixinPageComponent extends Vue {
  get testOpt(): Array<any> {
    return testOpt
  }
}
