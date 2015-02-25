// we are requiring a controller file that will do stuff when a route is triggered
var users = require('./../server/controllers/users.js');
module.exports = function(app) {


	app.post('/users/add_user', function(req, res) {
		users.add_user(req, res);
	});

	app.post('/users/login_user', function(req, res){
		users.login_user(req, res);
	})

	app.post('/users/search_friends', function(req, res){
		users.search_friends(req, res);
	});

	app.get('/profile/:id', function(req, res){
		users.get_profile(req, res);
	});

	app.put('/users/new_wall_message', function(req, res){
		users.new_wall_message(req, res);
	})

	app.put('/users/new_wall_comment', function(req, res){
		users.new_wall_comment(req, res);
	})

	// app.post('/users/add_bucket', function(req, res){
	// 	users.add_bucket(req, res);
	// });

	// app.post('/buckets/show/:id', function(req, res){
	// 	users.get_buckets(req, res);
	// });

	// app.post('/buckets/info/:id', function(req, res){
	// 	users.get_info(req, res);
	// });

	// app.post('/buckets/update_complete', function(req, res){
	// 	users.update_complete(req, res);
	// });

	

	

	


	

}