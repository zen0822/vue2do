var express = require('express'),
	path = require('path'),
	fs = require('fs'),
	request = require('request'),
	cheerio = require('cheerio'),
	bodyParser = require('body-parser'),
	globleConfig = require(path.join(process.cwd(), 'config').replace(/\\+/g, '/')),
	download = require(globleConfig.utilPath + '/download'),
	router = express.Router(),
	urlencodedParser = bodyParser.urlencoded({ extended: false }),
	userAgent = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/546.36 (KHTML, like Gecko) Chrome/52.0.2725.0 Safari/537.36';
var acquireData = function (data, cb) {
    var $ = cheerio.load(data),
    	girlList = $('.commentlist .text p img').toArray();
    for (var i=0, len = girlList.length; i < len; i++) {
        var imgsrc = girlList[i].attribs.src,
        	fileName = getFileName(imgsrc),
        	filePath = path.join(globleConfig.imgPath, 'girlPic/' + fileName);
        (function(fileName){
        	download.img({
	        	url: imgsrc,
	        	filePath: filePath,
	        	cb: function() {
	            	console.log(fileName + ' download success');
	            }
	        })
        })(fileName);
    }
    cb && cb();
}
var getFileName = function (url) {
	var filename = path.basename(url);
    return filename;
}
var changeUserAgent = function(){
	userAgent = userAgent + 1000 * Math.random();
	console.log('change useragent to' + userAgent);
}
var getGirlPic = function(opt){
	var res = opt.response;
	request.get({
		url: opt.url,
 		headers: opt.headers
	}, function (requestErr, requestRes, requestHtml) {
		if (!requestErr && requestRes.statusCode == 200) {
			acquireData(requestHtml, function () {
				res.json({
					data: {
						html: requestHtml
					},
					success: true,
					msg: '操作成功'
				});
			});			
		} else {
			changeUserAgent();
			res.json({
				data: {
					html: requestHtml
				},
				success: false,
				msg: '-操作失败'
			});
			// return getGirlPic({
			// 	url: opt.url,
		 // 		headers: {
		 // 			'User-Agent': userAgent
			// 	},
		 // 		response: res
			// });
		}
	}).on('response', function (response) {
		//
	}).on('error', function (err) {
		//console.log(err);
	}).on('end', function(){
		console.log()
		//buffer 防止丢包的情况，如果数据过多，会抓不全的。。。。。 
		// var data = Buffer.concat(body , size);
		// var html = data.toString();
		// var $=cheerio.load(html);
	});
}

router.get('/', function(req, res, next) {
	res.render('crawler/crawl', {
		title: 'Crawl'
	});
});

router.post('/crawlerGirlPic', urlencodedParser, function(req, res, next) {
	getGirlPic({
		url: req.body.url,
 		headers: {
 			'User-Agent': userAgent
		},
		response: res
	});
});

module.exports = router;