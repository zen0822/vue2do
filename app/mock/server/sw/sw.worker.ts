import dbMock from './mock.db'
import mockrc from '../../mock.config'

import {
  clientsClaim,
  setCacheNameDetails,
  skipWaiting
} from 'workbox-core'
import {
  precacheAndRoute
} from 'workbox-precaching'
import {
  registerRoute,
  Router,
  Route
} from 'workbox-routing'
import {
  NetworkFirst,
  StaleWhileRevalidate
} from 'workbox-strategies'

declare const self: ServiceWorkerGlobalScope

const {
  addEventListener,
  registration
} = self

const router = new Router()

function init(): void {
  registerRoute(
    new RegExp('http://localhost/#/'),
    process.env.NODE_ENV === 'development'
      ? new NetworkFirst()
      : new StaleWhileRevalidate()
  )

  try {
    self.__WB_MANIFEST && precacheAndRoute(self.__WB_MANIFEST)
  } catch (error) {
    console.warn(error)
  }

  addEventListener('push', (event) => {
    const title = '@vue2do/mock: Get Started With Workboxed'
    const options = {
      body: event?.data?.text()
    }
    event.waitUntil(registration.showNotification(title, options))
  })

  self.addEventListener('fetch', (event) => {
    const responsePromise = router.handleRequest(event)

    if (responsePromise) {
      // Router found a route to handle the request
      event.respondWith(responsePromise)
    } else {
      // No route found to handle the request
    }
  })
}

function createRoute(): void {
  mockrc.api.forEach(async (apiItem) => {
    const mockData = await dbMock.table(apiItem.key).toCollection().toArray()

    router.registerRoute(new Route(
      ({ url }) => {
        if (url.href.includes(apiItem.url)) {
          return {
            url: apiItem.url,
            data: mockData
          }
        }

        return false
      },
      ({ url, params }: any) => {
        return Promise.resolve(new Response(
          JSON.stringify({
            url,
            data: params.data,
            body: `!-- Look Ma. Added Content. -->`
          }),
          {
            status: 200,
            headers: new Headers({
              'Accept-Charset': 'utf-8',
              'Content-Type': 'application/json',
              'Cache-Control': 'max-age=3600'
            })
          }
        ))
      }
    ))
  })
}

setCacheNameDetails({
  precache: 'precache',
  prefix: 'app-mock',
  suffix: 'v1'
})
skipWaiting()
clientsClaim()

init()

createRoute()
