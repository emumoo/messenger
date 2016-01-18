var express = require('express');
var router = express.Router();

router.get('/user_data', function(req, res) {
  if (req.user === undefined) {
    // The user is not logged in
    res.json({});
  } 
  
  else {
    res.json({
    username: req.user
    });
  }
});

module.exports = router;