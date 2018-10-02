module.exports = function(app, db) {
	var bcrypt = require('bcrypt');
	var jwt = require('jsonwebtoken');
	var config = require('./config');
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
				var token = jwt.sign({ user: user }, config.secret, {
      				expiresIn: 86400 // expires in 24 hours
      			});
				res.status(200).json({ message: 'Welcome Mr.' + user.name + '!!', token: token });				
			}	
			else {
				res.status(404).json({ message: 'Wrong credentials!!'});	
			}	
	   	});		// checking username with db
	});	

	/* Show route for showing data according to roles (post method) */
	app.post('/show', function(req, res) {
		jwt.verify(req.headers.token, config.secret, function(err, decoded) {
			if(err) res.json({message: 'Invalid token'});
			else {
				var user = decoded.user;
				var dbo = db.db("bitelit");
				var test = dbo.collection('bitelit');
				test.find().toArray(function (err, docs) {

					if (user.role == '')
					{
						console.log('Please Login Can\'t find your role');
						res.status(401).json({ message: 'Please Login Can\'t find your role' });
					}

					if(user.role == 'admin')
					{
						console.log('Welcome admin You can see complete data');
						test.find().toArray(function (err, resp) {
							console.log(resp);
							res.status(200).json({ 
								message: 'You are admin Mr.' + user.name,
								data: resp 	
							});
						})
					}

					if(user.role == 'accounts')
					{
						console.log('Welcome Accounts admin You can see only accounts data');
						test.find({role : 'accounts'}).toArray(function (err, resp) {
							console.log(resp);
							res.status(200).json({ 
								message: 'You are Accounts admin Mr.' + user.name,
								data: resp	 
							});
						})
					}

					if(role == 'sales')
					{
						console.log('Welcome Sales admin You can see only sales data')
						test.find({role : 'sales'}).toArray(function (err, resp) {
							console.log(resp);
							res.status(200).json({ 
								message: 'You are Sales admin Mr.' + name,
								data: resp	
							});
						})
					}
				})
			}
		});
	});


	/* Logout route (post method) */
	app.post('/logout', function(req, res){
		console.log('You are logged out.');
		res.status(200).json({ message: 'You are logged out'});
	})
}