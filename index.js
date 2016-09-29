var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('language.db');
var check;

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var mongo = require('mongodb').MongoClient;
var util = require('util');

app.use("/public", express.static(__dirname + '/public'));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

    function database(prm,cb) {
      db.each("SELECT * FROM story",function (err, rows) {
        if (err || rows == undefined ){
            cb("bad", null)
        } else {
          if (prm===rows.a || prm===rows.b) {
            cb(null,rows.answer)
          }
        }
      });
     };

   var Check = function(err, data) {
     if (err) throw err;
     console.log('Answer: ' + data);
     io.emit('chat message', data);
   };

   io.on('connection', function(socket){
     socket.on('chat message', function(msg){
       io.emit('chat message', msg);
       msg = msg.replace(/[.?!,:;]/g, '');
       var arr = msg.split(" ");

       database(arr[0],Check);

       io.emit('worlds', arr);
       //io.emit('chat message', "Echo: "+msg);
     });

     socket.on('answer', function(data){
         var ans = data.ans;
         var sbj = data.sbj;
         var act = data.act;
         console.log(ans);
         console.log(sbj);
         console.log(act);

       io.emit('chat message', sbj+" "+act+" "+ans);
       console.log( sbj+" "+act+" "+ans);
     });
     });

//db.close();


http.listen(3000, function(){
  console.log('listening on *:3000');
});
