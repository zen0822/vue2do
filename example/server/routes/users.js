var express = require('express');
var router = express.Router();
var userModel = require('../models/user/userModel');

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.render('user/userIndex');
});

router.get('/addUser', function(req, res, next) {
	userModel.add(req, res, next);
});

router.get('/queryAll', function(req, res, next) {
	userModel.queryAll(req, res, next);
});

router.get('/query', function(req, res, next) {
	userModel.queryById(req, res, next);
});

router.get('/deleteUser', function(req, res, next) {
	userModel.delete(req, res, next);
});

router.post('/updateUser', function(req, res, next) {
	userModel.update(req, res, next);
});

module.exports = router;
