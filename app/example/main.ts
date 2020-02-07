/**
 * the lunch file of app
 */

import './client/main'

if (process.env.SW_ENV === 'development') {
  import('./client/sw/main')
}
