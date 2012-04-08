
/*
 * GET home page.
 */

db = require('./dbcontrol.js');
 
exports.index = function(req, res){
	res.render('index', { title: 'Restaurant World', user: false });
};

exports.register = function(req, res){
	var eml = req.body.email
	db.registerUser( req.body );
};

exports.login = function(req, res){
	
}