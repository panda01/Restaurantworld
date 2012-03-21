/*
*	The RestaurantWorld Models 
*
*	@version: 0.0.1
*	@author: Khalah Jones - Golden <khasan222@gmail.com>
*/
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	
//a standard description for all objects
var Desc = {
		img: String, 		//a picture is worth athousand words
		tease: String, 		//short 
		full: String};
		
//like replacing fries or salad
var Supplement = new Schema({
		menuitemid: Schema.ObjectId,
		price: Number});
/*
*	
*/
var Choice = new Schema({
		name: String,
		price: Number,
		descrption: Desc});
/*
*	Options like size, well done and such are implemented here
*/
var Option = new Schema({
		name: String,
		description: Desc,
		options:[Choice]});

/*
*	To contain all the info necessary for menuitems
*
*	To add:
*		getters to not return all properties unless they're set, like halal, kosher, etc.
*/
var Menuitem = new Schema({
	name: {type: String, unique: true },
	description: Desc,
	price: Number,
	info: {
		heat: { type: Number, min:0, max:10 },
		calories: Number,
		vegan: Boolean,
		vegetarian: Boolean,
		pescatarian: Boolean,
		kosher: Boolean,
		halal: Boolean,
		allergies:{
			glutenfree: Boolean,
			nuts: Boolean,
			dairy: Boolean,
			soy: Boolean,
			additional: String
		}
	},
	//supplements: { type:, mixed, default:[]],		//this is like fries or salad just add to options?
	complements: [Menuitem],						//bbq sauce and other things
	options: [Option]
});
var Group = new Schema({
	name: {type:String, unique: true},
	description: Desc,
	complements: [Menuitem],
	items:[Menuitem]
});
/*
*	Menu Schema for containing all menus neceassry info
*/
var Menu = exports.menu = new Schema({
	name: String,
	description: Desc,
	groups:[Group]
});
/*
*	Restaurant Info 
*/
var Restaurant = new Schema({
	name: String,
	description: Desc,
	location: {
		street: String,
		city: String,
		state: String,
		longitude: Number,
		latitude: Number,
		phone: { type: Number, 
			max: 9999999999}, 
		url: String
	},
	environment: {
		cuisine: {primary: String,
			secondary: String},
		smoking: Boolean
	},
	delivery: {
		//somehow here we're going to integrate a map overlay thingy
	},
	owner: Schema.ObjectId,
	menus: [Menu]
});
/*
*	User Model
*/
var userSchm = new Schema({
	name:{
		first: String,
		last: String
	},
	email: {
		type: String, 
		required: true, 
		index: {unique: true, 
			parse: true}
	},
	alive: Boolean,
	password: { type: String, 
		required: true, 
		get: function(pwd){
			return pwd;
		}}
});
//Statics
userSchm.statics.login = function login(eml, pwd, cb){
	this.where('email', eml)
		.where('password', pwd)
		.run(cb);
}
userSchm.statics.register = function register(eml, pwd, cb){
	this.count( {email: eml}, function(err, count)
	{
		console.log('Register: ' + err );
		console.log( count );
	});
}

var User = mongoose.model('User', userSchm);