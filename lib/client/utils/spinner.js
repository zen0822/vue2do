const nprogress = require('nprogress');

module.exports = {
	start: ()=> {
		nprogress.set(0.5)
  	nprogress.start()
	},
	end: ()=> {
		nprogress.done()
	}
}