'use strict';

var path = process.cwd();
var User = require('../models/users');


function ClickHandler() {
    
    this.getStocksFromDB = function(req, res) {
console.log('sdf');
        User.find({},function(err, data) {
            if (err) throw err;
            var stockArray = data[0].stocks.stockArray;
                    console.log('stockArray: ' + data);
            res.json(stockArray);
        })
    };

    this.delStockTab = function(req, res) {
        var stockCode = req.url.match(/\/delStockTab\/(.*)/)[1].toLowerCase();
        User.findOneAndUpdate({
            "stocks.id": "stocksInDatabase"
        }, {
            $pull: {
                "stocks.stockArray": stockCode
            }
        }, {new: true}, function(err, result){
            if (err) throw err;
            res.json(result.stocks.stockArray);
        })
    }
}

module.exports = ClickHandler;
