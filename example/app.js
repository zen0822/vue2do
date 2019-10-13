/**
 * the lunch file of app
 */

import './client/main'

if (process.env.SW_ENV === 'development') {
  console.log('zen')
  import('./client/sw/main.ts')
}
