var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('language.db');
var check;
db.serialize(function() {

//var stmt = db.prepare('INSERT INTO crdata(name,cr,cg) VALUES (?,?,?)');
//stmt.run("alfa","beta","gamma");
//stmt.finalize();
//db.run("INSERT into crdata(name,cr,cg) VALUES ('alfa','beta','gamma')");

  db.each("SELECT verb FROM verbs", function(err, row) {
      //console.log(row.name + " : " + row.cr + " : " + row.cg);
      console.log(row.verb);
  });
});

db.close();
