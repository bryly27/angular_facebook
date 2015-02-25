// create the controller and we're telling it that we are going to use $scope and we are going to use a FriendFactory and that it belongs to the fullMeanDemo app
facebook.controller('users_controller', function($window, $scope, $rootScope, $location, $routeParams, users_factory, localStorageService) {

	$scope.logged_user = localStorageService.get('user');
	search_friends();
	get_profile();

	$scope.months = [];
	for(var i=1;i<13;i++){
		$scope.months.push(i);
	}

	$scope.days = [];
	for(var i=1;i<32;i++){
		$scope.days.push(i);
	};

	$scope.years = [];
	year_now = new Date().getFullYear();
	for(var i=1900;i<=year_now;i++){
		$scope.years.push(i);
	};

	$scope.add_user = function(data){
		data.birthday = data.year+'/'+data.month+'/'+data.day;
		console.log('controller password', data.password);
		users_factory.add_user(data, function(data){
			$scope.new_user = null;
			$scope.result = data;
		});
	};

	$scope.login_user = function(data){
		users_factory.login_user(data, function(data){
			if(data.result){
				$scope.get_user = null;
				$scope.result = data;
			}else{
				$location.path('/home');
				localStorageService.set('user', data);
			}
		});
	};

	function search_friends(){
		users_factory.search_friends(function(data){
			$scope.search_friends = data;
		});
	};

	function get_profile(){
		users_factory.get_profile($routeParams.id, function(data){
			$scope.profile = data;
			console.log(data);
		});
	};

	$scope.new_wall_message = function(data, data2){
		data.created_at = new Date();
		data.created_by_username = localStorageService.get('user')[0].username;
		data.created_by_fullname = localStorageService.get('user')[0].first_name + ' ' + localStorageService.get('user')[0].last_name;
		data.created_for = data2;
		users_factory.new_wall_message(data, function(data){
			$scope.new_message = null;
			get_profile();
		});
	};

	$scope.new_wall_comment = function(data, data2){
		data.created_at = new Date();
		data.created_by_username = localStorageService.get('user')[0].username;
		data.created_by_fullname = localStorageService.get('user')[0].first_name + ' ' + localStorageService.get('user')[0].last_name;
		data.comment_for = data2;
		users_factory.new_wall_comment(data, function(data){
			console.log('made it back');
			$scope.new_comment = null;
			get_profile();
		});
	};

	// $scope.add_bucket = function(data){
	// 	data.date = new Date();
	// 	data.created_by = $routeParams.id;
	// 	data.complete = false;
	// 	users_factory.add_bucket(data, function(){
	// 		update_buckets($routeParams.id);
	// 		$scope.new_bucket = {};
	// 	});
	// };

	// function update_buckets(data){
	// 	users_factory.update_buckets(data, function(output){
	// 		$scope.buckets = output;
	// 		console.log(output);
	// 	});
	// };
})

// facebook.controller('wall_controller', function($scope, $rootScope, $location, $routeParams, users_factory, localStorageService) {

// 	$scope.user = $routeParams.id;

// 	users_factory.get_info($routeParams.id, function(output){
// 		$scope.buckets = output;
// 		console.log(output);
// 	});

// 	$scope.update_complete = function(data){
// 		console.log(data);
// 		data.complete = true;
// 		users_factory.update_complete(data, function(output){
// 		});
// 	};

// 	$scope.update_incomplete = function(data){
// 		console.log(data);
// 		data.complete = false;
// 		users_factory.update_complete(data, function(output){
// 		});
// 	};

		
// })

