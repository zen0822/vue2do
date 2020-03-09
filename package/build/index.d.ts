declare function dev(opt: any): any
declare function prod(opt: any): any
declare function getConfig(opt: any): {
  base: any
  dev: any
  prod: any
}

export {
  dev,
  prod,
  getConfig
}
