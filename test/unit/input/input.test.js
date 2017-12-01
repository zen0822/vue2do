import Vue from 'vue'
import compConfig from '../../../src/component/Input/Input'

describe('input 组件的相关测试', () => {
  const Ctor = Vue.extend(compConfig)
  const vm = new Ctor({
    propsData: {
      initVal: '输入组件的测试数据',
      type: 'area'
    }
  }).$mount()

  it('有一个 mounted 钩子', () => {
    expect(compConfig.mounted).to.be.a('function')
  })

  it('正确的渲染初始化的数据', () => {
    expect(vm.$refs.input.value).to.be.equal(vm.value)
  })

  it('原始组件选项中的函数的结果正确', () => {
    expect(compConfig.data).to.be.a('function')
    const defaultData = compConfig.data()

    expect(defaultData.verified).to.be.equal(true)
  })

  it('渲染出正确的 type', () => {
    expect(vm.type).to.be.equal('area')
  })
})
