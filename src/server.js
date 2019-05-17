var express = require('express'),
    app = express(),
    port = process.env.PORT || 3101, // port no
    bodyParser = require('body-parser');
var cors = require('cors');
var exec = require('child_process').exec;
var fs = require('fs');
var http = require('http');
var https = require('https');


var routes=require('./route');

app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));

app.use(cors());
routes.loadRoutes(app);
var httpServer = http.createServer(app);


httpServer.listen(3002);



var mongoDbConfig = require('./config/mongoDatabase.config');
var mongoose = require('mongoose');

mongoose.connect(mongoDbConfig.url, {});

mongoose.connection.on('error', function () {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

mongoose.connection.once('open', function () {
    console.log("Successfully connected to the database");
})

app.get('/test', function (req, res) {
    res.send("Success!");
})

console.log('Lencott Buyer Service started on: ' + port);
