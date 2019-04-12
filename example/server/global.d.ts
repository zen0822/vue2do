declare module "worker-loader!*" {
  class WebpackWorker extends Worker {
    constructor();
  }

  export default WebpackWorker;
}
declare module 'file-loader?name=sw.js!*' {
  const value: string;
  export = value;
}
declare const workbox: any
declare module 'workbox-window'
declare module 'workbox-build'