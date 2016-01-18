var users = global.db.get('users');

users.find({}, {}, function(e, docs) {
  records = docs;
});

module.exports.findById = function(id, cb) {
  process.nextTick(function() {
    var record = records.filter(function(elt) {
      return elt._id == id;
    });
    
    if (record) {
      cb(null, record);
    } else {
      cb(new Error('User ' + id + ' does not exist'));
    }
  });
}

module.exports.findByUsername = function(username, cb) {
  process.nextTick(function() {
    var user = null;
    records.forEach( function(record) {
      if (record.username === username) {
        user = record;
      }
    });
    return cb(null, user);
  });
}
