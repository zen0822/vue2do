// CRUD SQL语句
var sqlMap = {
	crawler: {
		insert:'insert into crawler(id, webSiteName, webSiteUrl) values(0,?,?)',
		update:'update crawler set webSiteName=?, webSiteUrl=? where id=?',
		delete: 'delete from crawler where id=?',
		queryById: 'select * from crawler where id=?',
		queryAll: 'select * from crawler'
	},
};

module.exports = sqlMap;