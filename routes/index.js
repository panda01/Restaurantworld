
/*
 * GET home page.
 */

db = require('./dbcontrol.js');
 
exports.index = function(req, res){
	res.render('index', { title: 'Restaurant World' });
};