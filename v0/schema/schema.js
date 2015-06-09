var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/gitter');

var libSchema = Schema({
	name: String,
	description: String
})
var Lib = mongoose.model('Lib', libSchema);

var reviewSchema = Schema({
	lib: { type: Schema.ObjectId, ref:"Lib" },
	stars: Number,
	content: String
})
var Review = mongoose.model('Review', reviewSchema);

var userSchema = Schema({
	email: String,
	password: String
})
var User = mongoose.model('User', userSchema);

module.exports = {
	Lib: Lib,
	Review: Review,
	User: User
};