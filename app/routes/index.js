'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');

// var ClickHandler = require(path + '/server.js');

module.exports = function (app) {

	var clickHandler = new ClickHandler();

	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		})
		.post(clickHandler.getStocksFromDB);

	app.route('/delStockTab/*')
		.post(clickHandler.delStockTab)
};
