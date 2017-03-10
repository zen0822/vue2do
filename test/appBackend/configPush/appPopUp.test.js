const Vue = require('vue')
const addAppPopUpComp = require('appComp/page/configPush/app-pop-up/add-app-pop-up/add-app-pop-up')

require('appSrc/router')
require('appSrc/common')
const app = require('appSrc/app/app')

describe('应用内弹窗，相关测试', () => {

  const Ctor = Vue.extend(addAppPopUpComp)
  // 实例化的时候可以传入 propsData
  const vm = new Ctor({
    /* isEdit: false */
  }).$mount()

  // 检查原始组件选项
  it('有一个 ready 钩子', () => {
    expect(addAppPopUpComp.ready).to.be.a('function')
  })

  // 原始组件选项中的函数的结果
  it('原始组件选项中的函数的结果正确', () => {
    expect(addAppPopUpComp.data).to.be.a('function')

    const defaultData = addAppPopUpComp.data()

    expect(defaultData.cityOptionUrl).to.be.equal('http://devel.api.evclub.com/admin/common/getAllCities')
  })

  // 创建一个实例并检查渲染输出
  it('渲染出正确的 data（‘this.linkInputReadOnly 和 this.testMessage’）', () => {
    expect(vm.linkInputReadOnly).to.be.equal(false)
    expect(vm.testMessage).to.be.equal('编译完成！')
  })

  it('成功修改数据', (done) => {
    expect(vm.editUrl).to.be.match(/innerPopup/)

    vm.$refs.formArea.verified = true
    vm.$refs.formArea.setAction(vm.editUrl).setQueryOpt({

      id: 99,
      clientName: "zen",
      adName: "车王2",
      clientManager: "吴彦祖",
      platform: 2,
      pushChannel: 2,
      pushCity: [220500, 220400],
      adType: 2,
      link: "www.baidu.com",
      startTime: "2016-12-20 13:25",
      endTime: "2016-12-29 18:50",
      img: 27

    }).testSubmit().then((rtn) => {

      expect(rtn.code).to.equal(0)
      done()

    }).catch(() => {

      console.log("fail")

    })

    vm.$nextTick(() => {
      /**
       * dom 发生变化时候做断言
       */
    })
  })
})