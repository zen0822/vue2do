import Vue from 'vue'
import testCompConfig from './Test'

describe('form 组件的相关测试', () => {
  const Ctor = Vue.extend(testCompConfig)
  const vm = new Ctor().$mount()

  it('能获取到表单控件提交到服务端的形参值，并且等于测试数据的值', () => {
    const queryOpt = vm.$refs.form.query()
    expect(queryOpt.name).to.be.equal('zen')
    expect(queryOpt.sex).to.be.equal('男')
  })

  it('成功修改数据', (done) => {
    // 异步回调的测试例子
    // expect(vm.editUrl).to.be.match(/innerPopup/)

    // vm.$refs.formArea.verified = true
    // vm.$refs.formArea.setAction(vm.editUrl).setQueryOpt({
    //   id: 99,
    //   clientName: 'zen',
    //   adName: '车王2',
    //   clientManager: '吴彦祖',
    //   platform: 2,
    //   pushChannel: 2,
    //   pushCity: [220500, 220400],
    //   adType: 2,
    //   link: 'www.baidu.com',
    //   startTime: '2016-12-20 13:25',
    //   endTime: '2016-12-29 18:50',
    //   img: 27
    // }).testSubmit().then((rtn) => {
    //   expect(rtn.code).to.equal(0)
    //   done()
    // }).catch(() => {
    //   console.log('fail')
    // })

    vm.$nextTick(() => {
      /**
       * dom 发生变化时候做断言
       */
      done()
    })
  })
})
