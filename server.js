var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = process.cwd();
var User = require('./app/models/users');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

mongoose.connect("mongodb://admin:admin2020@ds015720.mlab.com:15720/heroku_8mmg8q9c");
// mongoose.connection.on('open', function(){
// 	mongoose.connection.db.dropDatabase(function(err){
// 		console.log(err);
// 	});
// });

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));
app.use(express.static(process.cwd() + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

routes(app);

var port = process.env.PORT || 7464;
server.listen(port, function() {
    console.log('listening to port: ' + port);
});

io.on('connection', function(client) {
    console.log('Client connected...');

    client.on('addStockTabMsgToServer', function (data) {
        console.log("addStockTabMsgToServer:   " + JSON.stringify(data));
        client.broadcast.emit('addStockTabMsgToClient', data);
    });
    
    client.on('stockTabRemovalMsgToServer', function (data) {
        console.log("stockTabRemovalMsgToServer:   " + JSON.stringify(data));
        client.broadcast.emit('stockTabRemovalMsgToClient', data);
    });
    
});

app.post('/addStock/*', function(req, res) {

    var inputStockCode = req.url.match(/\/addStock\/(.*)/)[1].toLowerCase();
    
    // var newUser = new User();
    // newUser.stocks.id = 'stocksInDatabase';
    // newUser.stocks.stockArray = [];
    // newUser.save(function (err) {
    //     if (err) {
    //         throw err;
    //     }
    //
    //     console.log(newUser);
    // });
    
    
    User.find({
        'stocks.id': 'stocksInDatabase'
    }, function(err, data) {
        if (err) throw err;
        if (data[0].stocks.stockArray.indexOf(inputStockCode) == -1) {
            User.findOneAndUpdate({
                'stocks.id': 'stocksInDatabase'
            }, {
                $push: {
                    'stocks.stockArray': inputStockCode
                }
            }, {new: true}, function(err, data) {
                if (err) throw err;
                var json = {
                    inputStockCode: inputStockCode,
                    stockInDB: data.stocks.stockArray
                };
                res.json(json);
            });
        }
    });

});