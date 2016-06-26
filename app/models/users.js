'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	stocks: {
		id: String,
		stockArray: Array
	}
});

module.exports = mongoose.model('User', User);
