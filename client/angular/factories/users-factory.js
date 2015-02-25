// make the factory call it FriendFactory and pass it a callback function telling us that we are going to use $http functionality
facebook.factory('users_factory', function($http) {
	var factory= {};
	var user = '';
	// var topics = [];

	factory.add_user = function(info, callback) {
		console.log('factory password', info.password)
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

	// factory.get_info = function(data, callback){
	// 	$http.post('/buckets/info/' + data).success(function(output){
	// 		callback(output);
	// 	});
	// };

	// factory.update_complete = function(data, callback){
	// 	console.log('factory', data);
	// 	$http.post('/buckets/update_complete', data).success(function(){
	// 		callback();
	// 	});
	// };

	return factory;
})

