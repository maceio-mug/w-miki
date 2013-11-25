/* Auth Functions */
var db = require('./db.js').db;

function login(user, pass, callback) {
    db.collection( 'users')
        .find({name: user, pass: pass},
              {_id: false},
              function(err, cursor) {
                  cursor.count(function(err, count) {
	              if ( count != 0 )
	                  callback(true);
	              else
	                  callback(false);
                  });
              });
};

exports.login = login;
