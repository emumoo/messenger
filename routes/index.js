var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.user) {
    var message_data = global.db.get('messages');
    var username = req.user[0].username;

    message_data.find({},{},function(e,docs){
      res.render('index', {
        "messages" : docs,
        "username" : username
        });
    });
  }
  else {
    res.redirect('login');
  }
});

/* POST message */
router.post('/', function(req, res) {

    // Set our collection
    var collection = global.db.get('messages');

    // Submit to the DB
    collection.insert({
        "message" : req.body.message,
        "user_id" : req.user[0]._id,
        "datetime" : Date.now()
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
    });
});

module.exports = router;
