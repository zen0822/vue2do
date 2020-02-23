const path = require('path')
const compose = require('docker-compose')

compose.upAll({
  cwd: path.join(__dirname, '../../../'), log: true
}).then(
  () => { console.log('done') },
  err => { console.log('something went wrong:', err.message) }
)