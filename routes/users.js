var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	var collection = global.db.get('users');
	
	collection.find({}, {}, function(e, docs) {
		res.render('userlist', {
			"userlist" : docs
		});
	});	
});

module.exports = router;
