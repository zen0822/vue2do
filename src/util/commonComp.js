/**
 * 处理一些有关公用组件的工具函数
 */

const alive = () => {
  // 设计缺陷，没有解决动态项目的全局变量问题，后期优化（待选方案：存进 vuex）
  // return AB.router && !Object.is(AB.router, {}) && AB.router.app && !Object.is(AB.router.app, {})

  return true
}

export {
  alive
}
