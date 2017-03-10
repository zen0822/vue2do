var express = require('express'),
	router = express.Router(),
	crawlerModel = require('../../models/crawler/crawlerModel');

router.get('/', function(req, res, next) {
	res.render('crawler/crawlerIndex');
});

router.get('/add', function(req, res, next) {	
	var param = req.query || req.params;
	crawlerModel.add(param, function(result){
		res.json(result);
	});	
});

module.exports = router;