/*
*	Uses mongoose to present an easy database interface for Restaurant World
*/

var models = require('./models/index.js');
var mong = require('mongoose');


mong.connect('mongodb://localhost/restaurants');

