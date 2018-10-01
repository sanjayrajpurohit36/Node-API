
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

/*	UNCOMMENT THIS CODE TO CHECK accounts route otherwise show will do all the functionalities.
	show route for showing data according to roles (post method)


router.post('/accounts', function(req, res) {
	MongoClient.connect(URL, function(err, db) {
  		if (err) throw err;
	var dbo = db.db("bitelit");
	var test = dbo.collection('bitelit');
	test.find({role: role}).toArray(function (err, docs) {
        // assert.equal(err, null);
        // docs.forEach(function (doc) {

	    if (role == '')
	    {
	        console.log('Please Login Can\'t find your role');
	        res.json({ message: 'Please Login Can\'t find your role'
	                });
	    }

	    if(role == 'accounts')
	    {
	        console.log('Welcome Accounts admin You can see only accounts data');
			test.find({role : 'accounts'}).toArray(function (err, resp){
				console.log(resp);
	        res.json({ message: 'You are Accounts admin Mr.' + name,
	        		   data: resp	 
	    			});
			})
	    }
    // });
    db.close();
	});
});	
})

*/
// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);