// make the factory call it FriendFactory and pass it a callback function telling us that we are going to use $http functionality
facebook.factory('users_factory', function($http) {
	var factory= {};
	var user = '';
	// var topics = [];

	factory.add_user = function(info, callback) {
		$http.post('/users/add_user', info).success(function(data) {
			callback(data);
		});
	};

	factory.login_user = function(info, callback){
		$http.post('/users/login_user', info).success(function(data){
			callback(data);
		})
	}

	factory.search_friends = function(callback){
		$http.post('/users/search_friends').success(function(data){
			callback(data);
		});
	};

	factory.get_profile = function(info, callback){
		$http.get('/profile/' + info).success(function(data){
			callback(data);
		});
	};

	factory.new_wall_message = function(info, callback){
		$http.put('/users/new_wall_message', info).success(function(data){
			callback(data);
		});
	};

	factory.new_wall_comment = function(info, callback){
		$http.put('/users/new_wall_comment', info).success(function(data){
			callback(data);
		});
	};

	factory.new_profile_picture = function(info){
		console.log(info);
		$http.post('/users/new_profile_picture', info).success(function(){
		});
	};

	factory.profile_pic = function(form, callback){
		fd = new FormData();
		_.each(form, function(value, key, form){
			fd.append(key, value);
		})

		$http.post('/users/add_photo', fd, {
			transformRequest: angular.identity,
			headers:{'Content-Type': undefined}
			}).success(function(data){
				callback(data);
		})
	}

	factory.get_news_feed = function(callback){
		$http.post('/users/get_news_feed').success(function(data){
			callback(data);
		});
	}

	factory.edit_profile_email = function(info, callback){
		$http.post('/users/edit_profile_email', info).success(function(data){
			callback(data);
		});
	};

	factory.edit_profile_username = function(info, callback){
		$http.post('/users/edit_profile_username', info).success(function(data){
			callback(data);
		});
	};

	factory.add_friend = function(info, callback){
		$http.post('/users/add_friend', info).success(function(data){
			callback(data);
		});
	};

	factory.add_new_photo = function(form, callback){
		console.log(form);
		fd = new FormData();
		_.each(form, function(value, key, form){
			fd.append(key, value);
		})

		$http.post('/users/add_new_photo', fd,{
			transformRequest: angular.identity,
			headers:{'Content-Type': undefined}
			}).success(function(data){
				callback(data);
		});
	};


	// factory.add_bucket = function(info, callback){
	// 	$http.post('/users/add_bucket', info).success(function(){
	// 		callback();
	// 	});
	// };

	// factory.update_buckets = function(data, callback){
	// 	$http.post('/buckets/show/' + data).success(function(output){
	// 		callback(output);
	// 	});
	// };

	

	return factory;
})

