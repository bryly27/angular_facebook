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
	});

	app.put('/users/new_wall_comment', function(req, res){
		users.new_wall_comment(req, res);
	});

	app.post('/users/new_profile_picture', function(req, res){
		console.log(req);
		users.new_profile_picture(req, res);
	});

	app.post('/users/add_photo', function(req, res){
		users.add_photo(req, res);
	});

	app.post('/users/get_news_feed', function(req, res){
		users.get_news_feed(req, res);
	});

	app.post('/users/edit_profile_email', function(req, res){
		users.edit_profile_email(req, res);
	});

	app.post('/users/edit_profile_username', function(req, res){
		users.edit_profile_username(req, res);
	})

	// app.post('/pictures/create', function(req, res){ 
	// 	users.create_picture(req, res); 
	// });

	// app.post('/users/add_bucket', function(req, res){
	// 	users.add_bucket(req, res);
	// });

	

	

	

	


	

}