importScripts('https://zen0822.github.io/lib/workbox/workbox-sw.js')

workbox.setConfig({
  modulePathPrefix: 'https://zen0822.github.io/lib/workbox',
  debug: process.env.NODE_ENV === 'development'
})

const {
  core: workboxCore,
  routing: workboxRouting,
  strategies: workboxStrategies,
  precaching: workboxPrecaching
} = workbox

const self2 = self as any
const {
  addEventListener,
  registration
} = self2

class ServiceWorkerMain {
  constructor() {
    workboxCore.setCacheNameDetails({
      precache: 'precache',
      prefix: 'vue2do-doc',
      suffix: 'v1'
    })
    workboxCore.skipWaiting()
    workboxCore.clientsClaim()
  }

  init() {
    workboxRouting.registerRoute(
      new RegExp('http://localhost:5168/#/'),
      new workboxStrategies.StaleWhileRevalidate()
    )

    workboxPrecaching.precacheAndRoute(self2.__precacheManifest)

    addEventListener('push', (event: any) => {
      const title = 'Get Started With Workbox'
      const options = {
        body: event.data.text()
      }
      event.waitUntil(registration.showNotification(title, options))
    })
  }
}

const serviceWorkerMain = new ServiceWorkerMain()

serviceWorkerMain.init()

export default ServiceWorkerMain
