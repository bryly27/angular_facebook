// create the controller and we're telling it that we are going to use $scope and we are going to use a FriendFactory and that it belongs to the fullMeanDemo app
facebook.controller('users_controller', function($window, $route, $scope, $rootScope, $location, $routeParams, users_factory, localStorageService) {

	$scope.logged_user = localStorageService.get('user');
	get_profile();
	get_news_feed();

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

	if(!localStorageService.get('user')){
		$location.path('/main');
	}

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
				localStorageService.set('user', data[0]);
			};
		});
	};

	$scope.search_friends = function(){
		users_factory.search_friends(function(data){
			console.log(data);
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
		data.created_by_username = localStorageService.get('user').username;
		data.created_by_fullname = localStorageService.get('user').first_name + ' ' + localStorageService.get('user').last_name;
		data.created_by_profile_pic = localStorageService.get('user').profile_pic;
		data.created_for = data2._id;
		data.created_for_fullname = data2.first_name + ' ' + data2.last_name;
		data.created_for_username = data2.username
		users_factory.new_wall_message(data, function(data){
			$scope.new_message = null;
			get_profile();
		});
	};

	$scope.new_wall_comment = function(data, data2){
		data.created_at = new Date();
		data.created_by_username = localStorageService.get('user').username;
		data.created_by_fullname = localStorageService.get('user').first_name + ' ' + localStorageService.get('user').last_name;
		data.created_by_profile_pic = localStorageService.get('user').profile_pic;
		data.comment_for = data2;
		users_factory.new_wall_comment(data, function(data){
			console.log('made it back');
			$scope.new_comment = null;
			get_profile();
		});
	};

	$scope.edit_profile_photo = function(data){
		data.id = localStorageService.get('user')._id;
		console.log(data);
		users_factory.profile_pic(data, function(data){
    	localStorageService.set('user', data);
    	$route.reload();
    });
	};

	function get_news_feed(){
		users_factory.get_news_feed(function(data){
			$scope.news_feeds = data;
		});
	};

	$scope.edit_profile_email = function(data){
		data.id = localStorageService.get('user')._id;
		users_factory.edit_profile_email(data, function(data){
			localStorageService.set('user', data);
			$route.reload();
		});
	};

	$scope.edit_profile_username = function(data){
		data.id = localStorageService.get('user')._id;
		users_factory.edit_profile_username(data, function(data){
			localStorageService.set('user', data);
			$route.reload();
		})
	}

	$scope.add_friend = function(data){
		data.fullname = data.first_name + ' ' + data.last_name;
		data.my_id = localStorageService.get('user')._id;
		users_factory.add_friend(data, function(data){
			localStorageService.set('user', data);
			$route.reload();
		})
	}

	$scope.logoff = function(){
		localStorageService.set('user') = null; 
		$route.reload();
	}

})



