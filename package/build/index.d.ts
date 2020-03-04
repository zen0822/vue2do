declare function dev(): any
declare function prod(): any
declare function getConfig(opt: object): {
  base: any
  dev: any
  prod: any
}

export {
  dev,
  prod,
  getConfig
}
