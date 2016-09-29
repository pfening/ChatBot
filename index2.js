var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var exphbs = require('express-handlebars');
var mongo = require('mongodb').MongoClient;
var util = require('util');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/loginapp');
var log = mongoose.connection;

mongo.connect('mongodb://localhost/story', function(err, db){
  if(err) throw err;

var routes = require('./routes/index');
var users = require('./routes/users');

var col = db.collection('qa');

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

app.use("views", express.static(__dirname + 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');


// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//Logic part
   io.on('connection', function(socket){
     socket.on('teaching', function(data){
       var ans = data.ans;
       var que = data.que;
       console.log(que);
       io.emit('teaching', que);
       que = que.replace(/[.?!,:;]/g, '');
       var arr = que.split(" ");
       io.emit('teaching', ans);
       console.log(ans);
       col.insert({sentence: que, tags: arr, answer: ans});
     });

     socket.on('chating', function(datai){
       var chatq = datai.chatq;
       io.emit('chating', chatq);
       chata = chatq.replace(/[.?!,:;]/g, '');
       var arr = chata.split(" ");

       col.find({tags: {$all: arr}},{answer: 1, _id: 0}).toArray(function(err, docs){
          if(err) throw err;
          if (typeof docs[0] !== 'undefined' && docs[0] !== null) {
            io.emit('chating', docs[0].answer);
          }else {
            io.emit('chating', "I'm not teached to answer this question!");
          }
        });
     });
   });

   // Connect Flash
   app.use(flash());

   // Global Vars
   app.use(function (req, res, next) {
     res.locals.success_msg = req.flash('success_msg');
     res.locals.error_msg = req.flash('error_msg');
     res.locals.error = req.flash('error');
     res.locals.user = req.user || null;
     next();
   });

app.use('/', routes);
app.use('/users', users);
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
