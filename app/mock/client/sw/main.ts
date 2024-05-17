/**
 * the main file that the server of app
 */

async function init(): Promise<any> {
  if ('serviceWorker' in navigator) {
    const { Workbox } = await import('workbox-window')
    const wb = new Workbox('/sw.js')

    window.addEventListener('load', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      wb.register().then((_registration: any) => {
        // registration.pushManager.subscribe({
        //   userVisibleOnly: true
        // }).catch((error: any) => { console.warn(error) })
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

init()
