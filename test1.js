var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('language.db');
var check;

var test ='were';

//db.serialize(function() {

var database = function checkemail(prm,cb) {
  db.each("SELECT verb FROM verbs",function (err, rows) {
    if (err || rows == undefined ){
        cb("bad", null)
    } else {
      if (prm===rows.verb) {
        cb(null,rows.verb)
      }
    }
 });
}

var Check = function(err, data) {
  if (err) throw err;
  console.log('hello: ' + data);
    console.log('Matching');
};

database(test,Check);

//});

db.close();
