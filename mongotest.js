var mongo = require('mongodb').MongoClient;

mongo.connect('mongodb://localhost/story', function(err, db){
  if(err) throw err;

var col = db.collection('qa');


       col.find({tags: 'hello'},{answer: 1, _id: 0}).forEach(function(res){
         console.log(res.answer);
       });


});
