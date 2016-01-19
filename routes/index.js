var express = require('express');
var router = express.Router();

var user_dict = {};
var user_data = global.db.get('users');

user_data.find().each(function(user) {
  var user_id = user._id.toString();
  user_dict[user_id] = user.username;
});


/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.user) {
    var message_data = global.db.get('messages');
    var username = req.user[0].username;

    console.log(user_dict);
    
    message_data.find({},{},function(e,docs){
      res.render('index', {
        "messages" : docs,
        "user_dict" : user_dict,
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
