/**
 * the main file that the server of app
 */

class ServerMain {
  constructor() {
    this.init()
  }

  private async init() {
    if ('serviceWorker' in navigator) {
      const { Workbox } = await import('workbox-window')
      const wb = new Workbox('/sw.js')

      window.addEventListener('load', async () => {
        wb.register().then((registration: any) => {
          registration.pushManager.subscribe({
            userVisibleOnly: true
          }).catch((error: any) => { console.warn(error) })
        }).catch((registrationError: any) => {
          console.warn('SW of mock registration failed: ', registrationError)
        })

        try {
          await Notification.requestPermission()
        } catch (error) {
          console.warn(error)
        }
      })
    }
  }
}

export const serverMain = new ServerMain()
