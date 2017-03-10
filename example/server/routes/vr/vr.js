var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('vr/vr', { title: 'vr' });
});

module.exports = router;