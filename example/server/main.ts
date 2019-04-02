/**
 * the main file that the server of app
 */
import { Workbox } from 'workbox-window'
class ServerMain {
  init() {
    // this.output().then().catch()

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', async () => {
        const wb = new Workbox('/sw.js')

        wb.register().then(async (registration: any) => {
          console.log('SW registered: ', registration)
          try {
            await registration.pushManager.subscribe({
              userVisibleOnly: true
            })
          } catch (error) {
            console.warn(error)
          }
        }).catch((registrationError: any) => {
          console.log('SW registration failed: ', registrationError)
        })

        // navigator.serviceWorker.register('/sw.js')

        try {
          await Notification.requestPermission()
        } catch (error) {
          console.warn(error)
        }
      })
    }
  }

  async output() {
    // try {
    //   await import('file-loader?name=sw.js!ex/server/sw/sw')
    // } catch (error) { console.log(error) }
  }
}

const serverMain = new ServerMain()

// serverMain.init()

export default ServerMain
