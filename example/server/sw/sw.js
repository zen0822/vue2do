importScripts('https://zen0822.github.io/lib/workbox/workbox-sw.js')

workbox.setConfig({
  modulePathPrefix: 'https://zen0822.github.io/lib/workbox',
  debug: process.env.NODE_ENV === 'development'
})

workbox.core.setCacheNameDetails({
  prefix: 'vue2do-doc',
  suffix: 'v1'
})

workbox.core.skipWaiting()
workbox.core.clientsClaim()

workbox.routing.registerRoute(
  new RegExp('http://localhost:5168/#/'),
  new workbox.strategies.StaleWhileRevalidate()
)

self.addEventListener('push', (event) => {
  const title = 'Get Started With Workbox'
  const options = {
    body: event.data.text()
  }
  event.waitUntil(self.registration.showNotification(title, options))
})

workbox.precaching.precacheAndRoute(self.__precacheManifest)
