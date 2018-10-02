module.exports = function(app, db) {
	var token = "";
	var role ;
	var name ;
	var bcrypt = require('bcrypt');
	var jwt = require('jsonwebtoken');
	/*
	Test route to make sure everything is working (accessed at GET http://localhost:8080/api)	
	A simple get route
	*/
	app.get('/', function(req, res) {
		res.json({ message: 'This is a get route' });   
	});

	/* Login route (post method) */
	app.post('/login', function(req, res) {			//	Post route for getting username and password
		var data = req.body;                         
		var dbo = db.db("bitelit");
	   	dbo.collection('bitelit').findOne({name: data['username']}).then(function(user) {
		   	console.log(data['password'], user.role);
		   	if(user && bcrypt.compareSync(data['password'], user.password)) {
				role  = user.role;
				name = user.name;
				token = Math.random().toString(36).substring(7);
				res.json({ message: 'Welcome Mr.' + user.name + '!!', token: token });				
			}
			else {
				res.json({ message: 'Wrong credentials!!'});	
			}	
	   	});		// checking username with db
	});	

	/* Show route for showing data according to roles (post method) */
	app.post('/show', function(req, res) {
		if(req.headers.token != token) {
			res.json({message: 'Invalid token'});
		}
		else {
			var dbo = db.db("bitelit");
			var test = dbo.collection('bitelit');
			test.find().toArray(function (err, docs) {

	        	if (role == '')
	        	{
	        		console.log('Please Login Can\'t find your role');
	        		res.json({ message: 'Please Login Can\'t find your role' });
	        	}

	        	if(role == 'admin')
	        	{
	        		console.log('Welcome admin You can see complete data');
	        		test.find().toArray(function (err, resp) {
        			console.log(resp);
        			res.json({ 
        						message: 'You are admin Mr.' + name,
        						data: resp 	
        					});
	        		})
	        	}

	        	if(role == 'accounts')
	        	{
	        		console.log('Welcome Accounts admin You can see only accounts data');
	        		test.find({role : 'accounts'}).toArray(function (err, resp) {
	        		console.log(resp);
	    			res.json({ 
	    						message: 'You are Accounts admin Mr.' + name,
	    						data: resp	 
	    					});
	        		})
	        	}

	        	if(role == 'sales')
	        	{
	        		console.log('Welcome Sales admin You can see only sales data')
	        		test.find({role : 'sales'}).toArray(function (err, resp) {
	    			console.log(resp);
	    			res.json({ 
	    						message: 'You are Sales admin Mr.' + name,
		 		   				data: resp	
	    					});
	        		})
	        	}
			});
		}
	})


	/* Logout route (post method) */
	app.post('/logout', function(req, res){
		role = "";
		token = "";
		console.log('You are logged out and our role and token is empty:',role);
		res.json({ message: 'You are logged out',
			role : role,
			token: token
		});
	})
}