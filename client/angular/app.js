// Where you create the angular app and sp?ecify its options
var facebook = angular.module('facebook', ['ngRoute', 'LocalStorageModule']);

facebook.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'partials/main.html',
		})
		.when('/home',{
			templateUrl: 'partials/home.html',
		})
		.when('/profile/:id',{
			templateUrl: 'partials/wall.html',
		})
		.when('/search',{
			templateUrl: 'partials/find_friends.html',
		})

		// .when('/profile/:id',{
		// 	templateUrl: 'partials/profile.html',
		// })
		// .when('/user/:id',{
		// 	templateUrl: 'partials/user.html',
		// })
		// .otherwise({
		// 	redirectTo: '/'
		// })
})
