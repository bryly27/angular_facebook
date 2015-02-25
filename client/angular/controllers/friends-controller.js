// create the controller and we're telling it that we are going to use $scope and we are going to use a FriendFactory and that it belongs to the fullMeanDemo app
facebook.controller('search_friends', function($window, $scope, $rootScope, $location, $routeParams, users_factory, localStorageService) {
	// update_users();
	// update_buckets($routeParams.id);
	$scope.logged_user = localStorageService.get('user');
	console.log($scope.logged_user);
	console.log('hello');




})



