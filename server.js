/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

// leaving this commented out and here in the event we want an ORM and a DB
// var mongoose = require('mongoose');
// var config = require('./config/environment');

// Connect to database
// mongoose.connect(config.mongo.uri, config.mongo.options);

// Populate DB with sample data
// if(config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();

// view engine setup if needed and body parser for api
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('view cache', false);

// make api docs the default page
app.use('/', express.static(path.join(__dirname, 'api/docs')));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

var server = require('http').createServer(app);

// routes for resources loaded here
require('./routes')(app);

var config = {
    port: normalizePort(process.env.PORT || '3000')
}

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}


// Start server
server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
