// 实现与MySQL交互
var mysql = require('mysql'),
	path = require('path'),
	globleConfig = require(path.join(process.cwd(), 'config').replace(/\\+/g, '/')),
	$util = require('../../util/util'),
	$sql = require('./sqlMap'),
	$sqlCrawler = $sql.crawler;

// 使用连接池，提升性能
var pool = mysql.createPool($util.extend({}, globleConfig.mysql.crawler));

var jsonWrite = function (res, ret) {
	if (typeof ret === 'undefined') {
		res.json({
			code: '1',
			msg: '操作失败'
		});
	} else {
		res.json(ret);
	}
};

module.exports = {
	add: function (opt, cb) {
		pool.getConnection(function (err, connection) {
			connection.query(
				$sqlCrawler.insert, [
					opt.webSiteName,
					opt.webSiteUrl
				], function (err, result) {
					connection.release();
					return cb && cb(result);
				}
			);
		});
	},
	delete: function (req, res, next) {
		// delete by Id
		pool.getConnection(function (err, connection) {
			var id = +req.query.id;
			connection.query(
				$sqlCrawler.delete, id, function (err, result) {
					if (result.affectedRows > 0) {
						result = {
							code: 200,
							msg: '删除成功'
						};
					} else {
						result = void 0;
					}
					jsonWrite(res, result);
					connection.release();
				}
			);
		});
	},
	update: function (req, res, next) {
		// update by id
		// 为了简单，要求同时传name和age两个参数
		var param = req.body;
		if (param.name == null || param.age == null || param.id == null) {
			jsonWrite(res, undefined);
			return;
		}

		pool.getConnection(function (err, connection) {
			connection.query($sqlCrawler.update, [param.name, param.age, +param.id], function (err, result) {
				// 使用页面进行跳转提示
				if (result.affectedRows > 0) {
					res.render('/views/user/suc', {
						result: result
					}); // 第二个参数可以直接在jade中使用
				} else {
					res.render('/views/user/fail', {
						result: result
					});
				}

				connection.release();
			});
		});

	}
};