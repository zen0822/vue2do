var request = require('request'),
	fs = require('fs');

module.exports = {
    img: function(opt){
	    request.head(opt.url, function(err, res, body) {
		    // console.log('content-type:', res.headers['content-type']);  //这里返回图片的类型
		    // console.log('content-length:', res.headers['content-length']);  //图片大小
		    if (err) {
		        console.log('err: '+ err);
		        return false;
		    }
		    request(opt.url)
		    	.pipe(fs.createWriteStream(opt.filePath))
		    	.on('close', opt.cb);
	    });
	}
}