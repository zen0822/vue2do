import db from './mock.db'
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

async function init(): Promise<void> {
  registerRoute(
    new RegExp('http://localhost/#/'),
    process.env.NODE_ENV === 'development'
      ? new NetworkFirst()
      : new StaleWhileRevalidate()
  )
  precacheAndRoute(self.__WB_MANIFEST)

  addEventListener('push', (event) => {
    const title = '@vue2do/mock: Get Started With Workbox'
    const options = {
      body: event?.data?.text()
    }
    event.waitUntil(registration.showNotification(title, options))
  })
}

function createRoute(): void {
  mockrc.api.forEach(async (item) => {
    try {
      await db.mock.put({
        data: item.data,
        api: item.path,
        name: item.name
      })
    } catch (error) {
      console.warn(error)
    }

    registerRoute(
      ({ url }) => {
        if (url.href.includes(item.path)) {
          return {
            name: item.name,
            data: item.data
          }
        }

        return false
      },
      ({ url, event, params }: any) => {
        return fetch(event.request)
          .then((response) => {
            return response.text()
          })
          .then((responseBody) => {
            return new Response(
              JSON.stringify({
                url,
                data: params.data,
                body: `${responseBody} <!-- Look Ma. Added Content. -->`
              }),
              {
                status: 200,
                headers: new Headers({
                  'Accept-Charset': 'utf-8',
                  'Content-Type': 'application/json',
                  'Cache-Control': 'max-age=3600'
                })
              }
            )
          })
      }
    )
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

self.addEventListener('fetch', (event) => {
  const responsePromise = router.handleRequest(event)
  if (responsePromise) {
    // Router found a route to handle the request
    event.respondWith(responsePromise)
  } else {
    // No route found to handle the request
  }
})

router.registerRoute(new Route(
  ({ url }) => {
    return (url.pathname === '/api/sw')
  },
  ({ url, event }: any) => {
    return fetch(event.request)
      .then((response) => {
        return response.text()
      })
      .then((responseBody) => {
        return new Response(
          JSON.stringify({
            url,
            body: `${responseBody} <!-- Look Ma. Added Content. -->`
          }),
          {
            status: 200,
            headers: new Headers({
              'Accept-Charset': 'utf-8',
              'Content-Type': 'application/json',
              'Cache-Control': 'max-age=3600'
            })
          }
        )
      })
  }
))
