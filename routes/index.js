var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/', function(req, res){
	res.render('index');
});

//router.get('/', ensureAuthenticated, function(req, res){
//	res.render('index');
//});

router.get('/teaching', function(req, res){
  res.render('teaching');
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		res.redirect('/');
	}
}

module.exports = router;
