
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
var role ;							
var name ; 
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8000;        // set our port
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router
assert = require('assert');
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)

/*
	A simple get route
*/
router.get('/', function(req, res) {
    res.json({ message: 'This is a get route' });   
});

/*
	login route (post method)
*/
router.post('/login', function(req, res) {			//	Post route for getting username and password
	var data = req.body;                         
	MongoClient.connect(URL, function(err, db) {
  		if (err) throw err;
  		var dbo = db.db("bitelit");
   		dbo.collection('bitelit').find({name: data['username']}).toArray(function (err, docs) {		// checking username with db
  			if(docs.length != 0) {
	  			docs.forEach(function (doc) {
	        	role  = doc.role;
	        	name = doc.name;
	            res.json({ message: 'Welcome Mr.' + doc.name + '!!' });
        		});
	  		}
	  		else {
	  				res.json({ message: 'Wrong credentials!!'
	  			});	
	  		}	
  		});	
	})
});

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

/*
	show route for showing data according to roles (post method)
*/
router.post('/show', function(req, res) {
	MongoClient.connect(URL, function(err, db) {
  		if (err) throw err;
	var dbo = db.db("bitelit");
	var test = dbo.collection('bitelit');
	test.find().toArray(function (err, docs) {
        // assert.equal(err, null);
        // docs.forEach(function (doc) {

	    if (role == '')
	    {
	        console.log('Please Login Can\'t find your role');
	        res.json({ message: 'Please Login Can\'t find your role'
	                });
	    }
	    
	    if(role == 'admin')
	    {
	        console.log('Welcome admin You can see complete data');
	    	test.find().toArray(function (err, resp){
				console.log(resp);
	        res.json({ message: 'You are admin Mr.' + name,
	        		   data: resp 	
	    			});
			})
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

	    if(role == 'sales')
	    {
	        console.log('Welcome Sales admin You can see only sales data')
			test.find({role : 'sales'}).toArray(function (err, resp){
				console.log(resp);
	        res.json({ message: 'You are Sales admin Mr.' + name,
	        		   data: resp	
	    			});
			})
	    }

    // });
    db.close();
	});
});	
})

/*
	Logout route (post method)
*/
router.post('/logout', function(req, res){
	role = "";
	console.log('You are logged out and our role is empty:',role);
	res.json({ message: 'You are logged out',
			   role : role
			});
})


// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);