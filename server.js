
// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var Bear     = require('./app/models/bear');
var mongoose = require('mongoose');
var URL = 'mongodb://localhost:27017/bitelit';
mongoose.connect(URL);	//connect mongoose with this url
var morgan = require('morgan');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan(':url :response-time ms'));				// Using morgan to check request time
var port = process.env.PORT || 8000;        // set our port
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router
// assert = require('assert');

MongoClient.connect(URL, function(err, db) {
	if (err) throw err;
	require('./app/routes/index')(router, db);
})	

app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);